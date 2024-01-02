
// const express = require('express')
// const app = express()

// const http = require('http')
// const server = http.createServer(app)
// const { Server } = require("socket.io");
// // const io = new Server(server)
// // const { Server } = require('socket.io');
// const io = new Server(server);

// const port = 8080

// app.use(express.static('src'))

// app.get('/', (req, res) => {
//     res.send('Hello World!')
//     res.sendFile(__dirname + '/index.html')
// })

// io.on('connection', (socket) => {
//     console.log('a user connected');
// });

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

// console.log("server")


import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const app = express();
const server = createServer(app);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});