
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

// src/server/app.js
import express from 'express';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const server = createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, 'public')));

// Allow access to files inside the 'dist' directory
app.use('/dist', express.static(join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public/index.html'));
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});


