import { Rooms } from './public/js/Room.js';
import express from 'express';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, 'public')));

// Allow access to files inside the 'dist' directory
app.use('/dist', express.static(join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public/index.html'));
});

const players = []
const ListRooms = []
let idRoom = 0;
let roomName = "roomOne"

function handleRoom(socket) {
    console.log(socket);
}



io.on('connection', (socket) => {
    console.log('a user connected');
    players.push(socket.id)




    socket.on('createRoom', () => {

        socket.join(`${roomName}`);
        console.log(`Socket ${socket.id} joined room: ${roomName}`);
    });

    socket.on('sendMessage', (roomName, message) => {
        console.log(message);
        io.to(roomName).emit('message', message);
    });
    // socket.on("connect_error", (err) => {
    //     console.log(`connect_error due to ${err.message}`);
    // });
});

// socket.on('createRoom', roomName)


server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});


