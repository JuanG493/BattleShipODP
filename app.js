import { Rooms } from './public/js/Room.js';
import express from 'express';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Server } from 'socket.io';
// import { callbackify } from 'util';
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

const boards = []
const listPlayers = []
const ListRooms = []
let partialListRm = []
// let idRoom = 0;
// let roomName = "roomOne"
let numNav = 0;

function handleTurns() {
}



io.on('connection', (socket) => {
    console.log('a user connected');
    // listPlayers.push(socket.id)

    socket.emit('id', socket.id)

    socket.on('createRoom', (nameGame, idpj, pj1) => {
        socket.join(`${nameGame}`);
        console.log(`Socket ${socket.id} joined room: ${nameGame}`);
        // console.log(pj1);
        boards.push(pj1)
        partialListRm.push(nameGame)
        listPlayers.push(idpj)
    });

    socket.on('joinRoom', (nameRoom, idpj, callback) => {
        if (partialListRm.includes(nameRoom)) {
            console.log(`Socket ${socket.id} joined room: ${nameRoom}`);
            callback([listPlayers[0], boards[0]])
            listPlayers.push(idpj)

        } else {
            callback(false)
        }

    })
    socket.on('leave', () => {
        console.log('User disconnected');
        // socket.
    });

    //inform that the game can start
    socket.on('turns', (rommName, pj2) => {
        boards.push(pj2)
        // todos en el room meenos este 
        //send the id of the second plyar the player that join to the game
        // console.log(boards);
        socket.to(`${rommName}`).emit('readyToPlay', listPlayers[1], boards[1])
        // console.log(players[socket.id]);ssssssss
        // await turns(players)




    })


    socket.on('pointAttacked', async (nameR, pto, cb) => {
        // let resp = await checkPto(idOponent, pto)
        console.log(nameR, pto);
        // await test(nameR, pto)
        // response({ status: "ok" })
        // io.to(`${nameR}`).emit("wasAtakked", pto);
        io.to(`${nameR}`).emit("wasAtakked", pto, (response) => {

            console.log("Received response from client:", response);
        });

        cb("aceptado")
    });





    // socket.on('pointAttacked', (romm, punto, callback) => {


    //     socket.to(romm).emit("hello", punto)

    //     callback()

    // });

    socket.on('chekeated', (id, boolVal) => {
        console.log(boolVal);
        socket.to(id).emit(boolVal)
    })





})




server.listen(app.get('port'), () => {
    console.log('Server running at ', app.get('port'));
});

function emitToSocketWithCallback(socketId, eventName, data) {
    return new Promise((resolve, reject) => {
        io.to(socketId).emit(eventName, data, (callbackData) => {
            resolve(callbackData);
        });
    });
}





async function turns(pjCurrentTurn, pjTarget, turn) {
    // console.log("playing globla: ", playing);
    // if (playing) {

    drawRemainPoints()


    // console.log(pjTarget);
    if (turn) {
        displayTurn.innerText = "Human Turn"
        // console.log("Human TURN");
    } else {
        displayTurn.innerText = "Machine Turn"
    }
    //check if it´s posible play
    if (pjCurrentTurn.totalPoints > 0 && pjTarget.totalPoints > 0) {

        if (turn) {
            attackBoard.addEventListener("click", async e => {
                let divTarget = e.target
                // console.log("target waas : ", divTarget);

                // mark in the map
                // divTarget.classList.add("hit")
                let pointTarget = divTarget.attributes[0].nodeValue;

                drawPointOfAttack(attackBoard, pointTarget)

                let wasHit = await checkHit(pointTarget, pjCurrentTurn, pjTarget);
                // if (pjCurrentTurn.totalPoints > 0 && pjTarget.totalPoints > 0) {

                if (wasHit) {
                    navHit(divTarget)
                    //the actual PJ continue with the turn
                    turns(pjCurrentTurn, pjTarget, true)
                } else {
                    turns(pjTarget, pjCurrentTurn, false)
                }
                // } else {
                //     console.log("game Over");
                //     //call function game over
                // }
            }, { once: true })

        } else {
            await playMachine(pjCurrentTurn, pjTarget);
            turns(pjTarget, pjCurrentTurn, true)
        }

    } else {
        gameOver();
    }
}