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

const PORT = process.env.PORT || 5000;
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
})

app.use(router);
app.use(cors())

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
