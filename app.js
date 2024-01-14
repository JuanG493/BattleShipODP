import express from 'express';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Server } from 'socket.io';



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

const boards = {};
const listPlayers = {};
const ListRooms = {};
let wasHit = null;



io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('id', socket.id)

    socket.on('createRoom', (nameGame, idpj, boardPj1, response) => {
        socket.join(`${nameGame}`);
        console.log(`Socket ${socket.id} joined room: ${nameGame}`);
        boards[idpj] = boardPj1
        ListRooms[nameGame] = 1;
        listPlayers["pj1"] = idpj
        response(true)
    });

    socket.on('joinRoom', (nameRoom, idpj, callback) => {
        if (ListRooms.hasOwnProperty(`${nameRoom}`) && ListRooms[nameRoom] == 1) {
            console.log(`Socket ${socket.id} joined room: ${nameRoom}`);
            listPlayers["pj2"] = idpj
            callback(listPlayers.pj1)
        } else {
            callback(false)
        }

    })
    socket.on('leave', () => {
        console.log('User disconnected');
    });

    //listen for the indication to start the game 
    socket.on('turns', (rommName, idPj, boardPj2) => {
        boards[idPj] = boardPj2
        // all in the room but not this socket 
        //send the id of the second plyar the player that join to the game
        socket.to(`${rommName}`).emit('readyToPlay', listPlayers["pj2"])
    })

    // recive the signal to start the game
    socket.on('gameHasStarted', async (ptoTarget, idOpt, idCurrentPj, nameRoom) => {
        await drawPoints(ptoTarget, idOpt, idCurrentPj)
        if (wasHit) {
            await handleTurns(idOpt, idCurrentPj, nameRoom)
        } else {
            await handleTurns(idCurrentPj, idOpt, nameRoom)
        }
    });

    // targetPj is the pj that recibe the attack
    async function drawPoints(pto, targetPj, currentPj) {
        wasHit = boards[targetPj].coordinates[pto]
        // console.log("wasHit: ", wasHit);
        if (wasHit) {
            // console.log(boards[targetPj].totalPoints);
            boards[targetPj].totalPoints -= 1;
            // console.log(boards[targetPj].totalPoints);
        }
        let remainPuntos = [boards[targetPj].totalPoints, boards[currentPj].totalPoints]
        io.to(currentPj).emit("drawAttackBoardPoint", pto, wasHit, remainPuntos)
        //washit is use in the below event to change the turn info
        io.to(targetPj).emit("drawPositionBoardPoint", pto, wasHit, remainPuntos)

    }

    async function handleTurns(waitingPj, currentPj, nameGame) {
        if (boards[waitingPj].totalPoints > 0 && boards[currentPj].totalPoints > 0) {

            io.to(currentPj).emit("playing")

        } else {
            let winner = boards[waitingPj].totalPoints == 0 ? currentPj : waitingPj
            // io.in(nameGame).emit("winner", winner)
            io.to(waitingPj).emit("winner", winner)
            io.to(currentPj).emit("winner", winner)

        }

    }

})

server.listen(app.get('port'), () => {
    console.log('Server running at ', app.get('port'));
});

