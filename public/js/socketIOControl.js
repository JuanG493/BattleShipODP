import {
    player,
    setID,
    idPlayer,
    idOponent,
    setNameRoom,
    nameGameRoom,
    attackBoard,
    inputNameRoom,
    state,
    displayTurn,
    setIdOponent,
    drawPointOfAttack,
    drawRemainPoints,
    positionBoard,
    navHit,
    attack
} from './index.js'

const socket = io(); //here the domain 

//catch the id from the server
socket.on('id', (id) => {
    setID(id)
    // idPlayer = id;
    console.log("Your id:", idPlayer);
})

export function readyToPlay(nameRoom, pj) {
    socket.emit('readyToPlay', (nameRoom, pj))
}
export async function ready() {
    await readyToStart()
    socket.emit('readyToPlay', (nameGameRoom, player))
}


//let to create a room to play 
export function handleCreateRoom() {
    // nameGameRoom = inputNameRoom.value;
    setNameRoom(inputNameRoom.value)

    const payload = {
        coordinates: player.board.listCoordinates,
        totalPoints: player.totalPoints
    }
    socket.emit('createRoom', nameGameRoom, idPlayer, payload, (response) => {
        if (response) {
            console.log(`Player: ${idPlayer} has joined room: ${nameGameRoom}`);
        }
    })
}

//let a partner to joint a room that have been created
export async function handleJointToGame() {
    return new Promise((resolve, reject) => {
        let roomName = inputNameRoom.value
        socket.emit('joinRoom', roomName, idPlayer, (response) => {
            let res = response;
            resolve(res);
        })
    })
}


export async function readyToStart() {
    const payload = {
        coordinates: player.board.listCoordinates,
        totalPoints: player.totalPoints
    }
    socket.emit('turns', nameGameRoom, idPlayer, payload)
    displayTurn.innerText = "OPPONENT TURN"
}
//recive the indication to star the game, is the pj that create the room (HOST)
socket.on('readyToPlay', (idOpt) => {
    state.innerText = "a contenden has joined to this game"
    setIdOponent(idOpt)
    displayTurn.innerText = "YOUR TURN"
    console.log("mi id:", idPlayer, "oponent id : ", idOponent);
    startAttack();
})

async function startAttack() {
    let pointTarget = await attack();
    socket.emit('gameHasStarted', pointTarget, idOponent, idPlayer, nameGameRoom)
}

socket.on('winner', (winner) => {
    if (winner == idPlayer) {
        displayTurn.innerText = "YOU ARE THE WINNER"
    } else {
        displayTurn.innerText = "YOU LOST"
    }
})

//draw the atack into the atackBoard
socket.on('drawAttackBoardPoint', (point, washit, restPtos) => {
    drawRemainPoints(restPtos[1], restPtos[0])
    drawPointOfAttack(attackBoard, point)
    if (washit) {
        displayTurn.innerText = "YOUR TURN"
        let div = attackBoard.querySelector(`div[data-value="${point}"]`)
        navHit(div)
    } else {
        displayTurn.innerText = "OPONENT TURN"
    }
})

//draw the atakk into the position board
socket.on('drawPositionBoardPoint', (point, wasHit, restPtos) => {
    drawRemainPoints(restPtos[0], restPtos[1])
    drawPointOfAttack(positionBoard, point)
    if (wasHit) {
        // displayTurn.innerText = "HOST TURN"
        displayTurn.innerText = "OPONENT TURN"
    } else {
        displayTurn.innerText = "YOUR TURN"
    }
})

socket.on("playing", () => {
    startAttack()
})
