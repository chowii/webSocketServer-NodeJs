const express = require('express')
const app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({server: server});

wss.on('connection', function connection(socket) {
    console.log('A new client Connected!');
    // socket.send('Welcome New Client!');

    socket.on('message', function incoming(message) {
        if (message !== 'test') {
            let data = JSON.parse(message);

            console.log('received: %s %s', data, new Date(data.time).toString());
            console.log(typeof message)

            wss.clients.forEach(function each(client) {
                if (client !== socket && client.readyState === WebSocket.OPEN) {
                    console.log(`client: ${client}`)
                    client.send(message);
                    // socket.send(message);
                }
            })
        }
    });
});

server.listen(3000, () => console.log(`Lisening on port :3000`))
