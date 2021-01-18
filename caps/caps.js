'use strict'

const net = require('net');
const PORT = process.env.PORT || 3000;

const server = net.createServer();
server.listen (PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
});
let socketPool = {};

server.on('connection', (socket) => {
    const id = Math.random();
    socketPool[id] = socket;
    socket.on('data', (buffer) => dispatchEventData(buffer));
    socket.on('error', (e) => console.log('SOCKET ERROR', e));
    socket.on('end', (e) => delete socketPool[id]);
});

function dispatchEventData(buffer) {
    let data = JSON.parse(buffer.toString().trim());
    if (data.event && data.payload) {
        broadcast(data);
        logIt(data.event, data.payload);
    }
}

function logIt(event, payload) {
    let time = new Date().toLocaleString();
    console.log('EVENT',{ event, time, payload })
}

function broadcast(message) {
    let payload = JSON.stringify(message);
    for (let socket in socketPool) {
        socketPool[socket].write(payload);
    }
}