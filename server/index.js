const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const {
    checkUser,
    addUser,
    removeUser,
    getUserById,
    getUsersInRoom,
    getOtherUserInRoom,
    getUserByName
} = require('./users.js')

const { getActiveRooms } = require('./rooms.js');

const PORT = process.env.PORT || 3000;
const router = require('./router');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const cors = require('cors')

require('dotenv').config()

io.on('connection', (socket) => {
    console.log('New Connection');

    socket.on('getRoomData', ({ room }, callback) => {
        io.to(socket.id).emit('roomData', { room: room, users: getUsersInRoom(room)})

    });

    socket.on('checkUser', ({ name, room }, callback) => {
        const { error } = checkUser({ name, room });
        if (error) return callback(error);
        return callback();
    });

    socket.on('join', ({ name, room, colors }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room, colors });
        if (error) return callback(error);

        socket.emit('message', { user: { name: 'admin' },
            text: `Hi ${user.name} Welcome to your new room! You can invite your friends to watch with you by sending them the link to this page.`
        });

        socket.broadcast.to(user.room).emit('message', { user: { name: 'admin' }, text: `${user.name} has joined`})

        if (getUsersInRoom(user.room).length > 1) {
            const otherUser = getOtherUserInRoom(room, user);
            if (otherUser) socket.to(otherUser.id).emit('getSync', { id: user.id });
        }

        socket.join(user.room);
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)})
        callback({ id: socket.id });
    })

    socket.on('disconnect', () => {
        console.log("Disconnected")
        const user = removeUser(socket.id);
        if (user) {
            socket.broadcast.to(user.room).emit('message', { user: { name: 'admin' }, text: `${user.name} has left`});
            socket.broadcast.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    });

    socket.on('changeUsername', ({ oldName, newName }) => {
        const user = getUserByName(oldName);
        user.name = newName;
        if (user) {
            io.to(user.room).emit('message', { user: { name: 'admin' }, text: `${oldName} changed their name to ${newName}` });
            io.to(user.room).emit('roomData', { user: { room: user.room, users: getUsersInRoom(user.room)}});
        }
    });

    socket.on('checkRoomExits', ({ room }, callback) => {
        let rooms = getActiveRooms(io);
        return callback(rooms.includes(room))
    });

    // Sending messages
    socket.on('sendMessage', (message, callback) => {
        const user = getUserById(socket.id);
        if (user) {
            io.to(user.room).emit('message', { user: user, text: message})
        }
        callback();
    });

    // Video State
    socket.on('sendSync', ({ id, ...videoProps}, callback) => {
        socket.to(id).emit('startSync', videoProps);
    });

    socket.on('sendVideoState', (params, callback) => {
        const { name, room, eventName, eventParams } = params;
        socket.to(room).exit('receiveVideoState', params);
        let admin_msg;
        switch (eventName) {
            case 'syncPlay':
                admin_msg = `${name} played the video at ${new Date(eventParams.seekTime * 1000).toISOString(11, 8)}.`;
                break;
            case 'syncPause':
                admin_msg = `${name} paused the video.`;
                break;
            case 'videoStartBuffer':
                admin_msg = `${name} is buffering.`;
                break;
            case 'videoFinishBuffer':
                admin_msg = `${name} finished buffering.`;
                break;
            case 'syncRateChange':
                admin_msg = `${name} changed the playback rate to ${eventParams.playbackRate}.`;
                break;
            case 'syncLoad':
                admin_msg = `${name} changed the video.`;
                break;
            case 'syncLoadFromQueue':
                admin_msg = `${name} loaded next video on the queue.`;
                break;
            case 'syncQueue':
                if (eventParams.type === "add")
                    admin_msg = `${name} added a video to the queue.`
                else if (eventParams.type === "remove")
                    admin_msg = `${name} removed a video from the queue`;
                break;
            default:
                admin_msg = '';
                break;
        }

        // console.log(admin_msg);
        io.in(room).emit('message', { user: { name: 'admin' }, text: admin_msg});
        callback();
    });

});

app.use(router);
app.use(cors())

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
