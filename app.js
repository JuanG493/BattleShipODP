import { Rooms } from './public/js/Room.js';
import express from 'express';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Server } from 'socket.io';
import { callbackify } from 'util';
// import { isTypedArray } from 'util/types';
// import { emit } from 'process';


const app = express();
const server = createServer(app);
const io = new Server(server);

app.set('port', process.env.PORT || 3000);

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
let partialListRm = []
// let idRoom = 0;
// let roomName = "roomOne"
let numNav = 0;

function handleRoom(socket) {
    console.log(socket);
}



io.on('connection', (socket) => {
    console.log('a user connected');
    players.push(socket.id)

    // io.emit('joinR0om')
    socket.on('joinRoom', (nameGame, callback) => {
        if (partialListRm.includes(nameGame)) {
            console.log(`Socket ${socket.id} joined room: ${nameGame}`);
            callback(true)

            socket.emit('readyToPlay')

        } else {
            callback(false)
        }

    })





    socket.on('createRoom', (nameGame) => {

        socket.join(`${nameGame}`);
        console.log(`Socket ${socket.id} joined room: ${nameGame}`);
        if (partialListRm.length <= 2) {
            partialListRm.push(nameGame)
        }
        // partialListRm.push
        // console.log(io.rooms);
    });

    // socket.on('sendMessage', (roomName, message) => {
    //     console.log(message);
    //     io.to(roomName).emit('message', message);
    // });

    // socket.on('sizeShips', () => {
    //     io.emit(numNav)
    // })
    // socket.on("connect_error", (err) => {
    //     console.log(`connect_error due to ${err.message}`);
    // });
});

// socket.on('createRoom', roomName)


server.listen(app.get('port'), () => {
    console.log('Server running at ', app.get('port'));
});


