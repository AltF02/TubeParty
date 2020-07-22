const socketio = require('socket.io');
const http = require('http');
const app = require('express')();

require('dotenv').config();

const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.SERVER_PORT || 3000

io.on('connection', (socket) => {
    console.log(`new connection id: ${socket.id}`);

    socket.on('YEET', function () {
        console.log(`${socket.id} yeet received`)
    })

    socket.on('disconnect', function () {
        console.log(`${socket.id} disconnected`)
    })

});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

