import './style.css';
import Player from './player.js';


const socket = io(); //here the domain 


let positionBoard = document.querySelector("#board_pst");
let pstY = document.querySelector(".pst_ind_left");
let pstX = document.querySelector(".pst_ind_right");

let attackBoard = document.querySelector("#board_atk");
let atkY = document.querySelector(".atk_ind_left");
let atkX = document.querySelector(".atk_ind_right");

let leftPtsPj1 = document.querySelector("#leftPts_pj1")
let leftPtsPj2 = document.querySelector("#leftPts_pj2")


let btnMakeArmy = document.querySelector("#make_army")
let btnRandom = document.querySelector("#rand")
let btnRestar = document.querySelector("#restar")
let displayTurn = document.querySelector("#display_turn")
let btnPlay = document.querySelector("#play")

let btnJoinGame = document.querySelector("#join_game")
let btnVsMachine = document.querySelector("#vs_machine")
let btnCreateGame = document.querySelector("#vs_friend")
let btnLeave = document.querySelector("#leave")
let state = document.querySelector("#state");
let containerInputRoom = document.getElementById("nameRoom");
let btnsSelectOponent = document.getElementById("btn_select_opt");
const inputNameRoom = document.getElementById("nameRoom_inp");

let player = null;
let idOponent = null;
let selectionOponentMenu = null;
let nameGameRoom = null;
let idPlayer = null;
let machineAsOponent = null;

//catch the id from the server
socket.on('id', (id) => {
    idPlayer = id;
    console.log("Your id:", idPlayer);
})


//let to create a room to play 
function handleCreateRoom() {
    nameGameRoom = inputNameRoom.value;

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
async function handleJointToGame() {
    return new Promise((resolve, reject) => {
        let roomName = inputNameRoom.value
        socket.emit('joinRoom', roomName, idPlayer, (response) => {
            let res = response;
            resolve(res);
        })
    })
}


async function readyToStart() {
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
    idOponent = idOpt;
    displayTurn.innerText = "YOUR TURN"
    console.log("mi id:", idPlayer, "oponent id : ", idOponent);
    startAttack()
})

async function startAttack() {
    let cond = NaN;
    let pointTarget;
    //prevent to select a div that already was selected
    do {
        pointTarget = await allowedAttack()
        cond = parseInt(pointTarget) ? true : false;
    } while (!cond);
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
        let div = attackBoard.querySelector(`div[value="${point}"]`)
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

//let the player to play in his attack board for a turn
async function allowedAttack() {
    return new Promise((resolve, reject) => {
        function clickHandler(e) {
            let divTarget = e.target
            let pointTarget = divTarget.attributes[0].nodeValue;
            resolve(pointTarget)
        }
        attackBoard.addEventListener('click', clickHandler, { once: true })
    })
}


function toggle(elemnt) {
    elemnt.classList.toggle("selected")
}

//select the oponent
btnsSelectOponent.addEventListener('click', (e) => {
    selectionOponentMenu = e.target.value;
    disbleHeaderOponents(e.target)
    if (selectionOponentMenu === "join") {
        btnMakeArmy.innerText = "Join game"
        containerInputRoom.classList.remove('selected');

    } else if (selectionOponentMenu === 'create') {
        btnMakeArmy.innerText = "create Game"
        containerInputRoom.classList.remove('selected');

    } else {
        containerInputRoom.classList.add('selected')
    }
})

//set the actual elemnt as disable and the other options as able
function disbleHeaderOponents(target) {
    let buttonsOponent = [btnVsMachine, btnCreateGame, btnJoinGame]
    for (const btn of buttonsOponent) {
        if (btn === target) {
            target.disabled = true
        } else {
            btn.disabled = false
        }
    }
}

btnRandom.addEventListener("click", () => {
    cleanArea()
    started()
    player = new Player(gameModeSelected());
    positionShipsOn(player)
})

btnMakeArmy.addEventListener("click", async () => {
    if (selectionOponentMenu == null) {
        alert("Please select a oponent")

    } else {
        if (selectionOponentMenu === "create") {
            if (inputNameRoom.value == "") {
                alert("Please enter a room name firs")
            } else {
                hablePanel()
            }

        } else if (selectionOponentMenu === "join") {
            if (inputNameRoom.value == "") {
                alert("Please enter a room name firs")
            } else {
                let response = await handleJointToGame();
                // console.log(response);
                if (response) {
                    console.log(`sucess join to romm: ${inputNameRoom.value}`);
                    idOponent = response;
                    nameGameRoom = inputNameRoom.value
                    console.log("mi id:", idPlayer, "oponent id : ", idOponent);
                    hablePanel()
                    toggle(btnLeave, true)
                }
                else {
                    alert(`The game: ${inputNameRoom.value} do not exist`)
                }
            }
            // for vs machine
        } else {
            hablePanel()
            machineAsOponent = new Player(gameModeSelected());
        }
    }
})
//................................................................................
function dragstartHandler(ev) {
    console.log(player);
    console.log(this.classList[0]);
    let sameCls = document.querySelector(`."${this.classList[0]}"`);
    sameCls.forEach()



}

function testing() {
    // const shipst = document.querySelectorAll(".ship");
    const shipst = document.querySelectorAll(".ship");
    shipst.forEach(element => {
        element.addEventListener('dragstart', dragstartHandler)

    });

}


function hablePanel() {
    player = new Player(gameModeSelected());
    positionShipsOn(player)
    testing(player);
    disabledHtmlBtn(btnMakeArmy, true)
    disabledHtmlBtn(btnPlay, false)
    toggle(btnRandom)
    toggle(btnRestar)
}

btnPlay.addEventListener("click", async () => {
    disabledHtmlBtn(btnPlay, true)
    disabledHtmlBtn(btnRandom, true)
    switch (selectionOponentMenu) {
        case "machine":
            await turns(player, machineAsOponent, true);
            break;
        case "create":
            handleCreateRoom()
            state.innerText = "waiting for the oponent to join"
            socket.emit('readyToPlay', (nameGameRoom, player))
            break;
        case "join":
            await readyToStart()
            socket.emit('readyToPlay', (nameGameRoom, player))
            break;
        default:
            break;
    }
})

function cleanArea() {
    player = null;
    idOponent = null;
    positionBoard.innerHTML = "";
    attackBoard.innerHTML = "";
    pstX.innerHTML = "";
    pstY.innerHTML = "";
    atkX.innerHTML = "";
    atkY.innerHTML = "";
    player = null;
    idOponent = null;
    machineAsOponent = null;
    leftPtsPj1.innerText = "0";
    leftPtsPj2.innerText = "0";
    displayTurn.innerHTML = "";
}


btnRestar.addEventListener("click", () => {
    location.replace(location.href);
})

function disableMainPanel() {
    disabledHtmlBtn(btnRandom, true);
    disabledHtmlBtn(btnVsMachine, false)
    disabledHtmlBtn(btnPlay, true);
    disabledHtmlBtn(btnJoinGame, false);
    disabledHtmlBtn(btnMakeArmy, false)
    disabledHtmlBtn(btnJoinGame, false)
}

function started() {
    drawBasicBoard(positionBoard, pstY, pstX)
    drawBasicBoard(attackBoard, atkY, atkX)
}

started()

btnLeave.addEventListener("click", () => {
    cleanArea()
    disableMainPanel()
    toggle(btnLeave)
    started()
    socket.emit('leave')
})

function gameModeSelected() {
    let mode;
    let radiosBtns = document.querySelectorAll(".md");
    radiosBtns.forEach(element => {
        if (element.checked) {
            mode = element.value;
        }
    });
    return mode;
}


function disabledHtmlBtn(btn, toggle) {
    btn.disabled = toggle;
    // btnMakeArmy.disabled = toggle;
}

//set the flow of the game, turn is a boolean to know who is playing
//true -> player || false -> machine
async function turns(pjCurrentTurn, pjTarget, turn) {
    drawRemainPoints()
    if (turn) {
        displayTurn.innerText = "Human Turn"
    } else {
        displayTurn.innerText = "Machine Turn"
    }
    //check if it´s posible play
    if (pjCurrentTurn.totalPoints > 0 && pjTarget.totalPoints > 0) {
        if (turn) {
            attackBoard.addEventListener("click", async e => {
                let divTarget = e.target
                // mark in the map
                let pointTarget = divTarget.attributes[0].nodeValue;
                drawPointOfAttack(attackBoard, pointTarget)
                let wasHit = await checkHit(pointTarget, pjCurrentTurn, pjTarget);
                if (wasHit) {
                    navHit(divTarget)
                    //the actual PJ continue with the turn
                    turns(pjCurrentTurn, pjTarget, true)
                } else {
                    turns(pjTarget, pjCurrentTurn, false)
                }
            }, { once: true })
        } else {
            await playMachine(pjCurrentTurn, pjTarget);
            turns(pjTarget, pjCurrentTurn, true)
        }
    } else {
        gameOver();
    }
}


function gameOver() {
    console.log("game Over");
    let winner = player.totalPoints == 0 ? "MACHINE" : "HUMAN";
    displayTurn.innerText = winner + " Win";
    disabledHtmlBtn(btnMakeArmy, false)
}

async function drawRemainPoints(playerPoints = player.totalPoints, oponetPoints = machineAsOponent.totalPoints) {
    leftPtsPj1.innerText = `${playerPoints}`
    leftPtsPj2.innerText = `${oponetPoints}`
}

function drawPointOfAttack(board, point) {
    let div = board.querySelector(`div[value="${point}"]`)
    // div.innerText = "X"
    div.innerHTML = "<img src='./images/diana.png'>"
    div.classList.add("hit");
}

async function playMachine(machineBoard, humanBoard) {
    let point;
    let wasHIt;
    let partialpoint
    do {
        //serch for a point around the last hit
        let prevElemts = machineBoard.getLastGooPositionOfAtk();
        //it is think that work after ther second iteration
        if (wasHIt || prevElemts[0] != undefined) {
            //while still good position take those
            if (prevElemts.length > 0) {
                partialpoint = machineBoard.board.getRandomInt(0, prevElemts.length - 1)
                point = prevElemts[partialpoint];
                machineBoard.removeAgoodPosition(point);
            } else {
                //surch for a good positions
                let around = serchNerbyPto(point, machineBoard.getMapPointAttk(), machineBoard);
                partialpoint = machineBoard.board.getRandomInt(0, around.length - 1)
                point = around[partialpoint]
                machineBoard.removeAgoodPosition(point);
            }
        } else {
            do {
                point = machineBoard.board.getRandomInt();
                // prevent to select a point that alredy was selectec - is a hash map
            } while (machineBoard.getMapPointAttk(point));
        }
        //select the point on the position board
        let div = positionBoard.querySelector(`div[value="${point}"]`)
        // to go a little slow
        await timeOut()
        drawPointOfAttack(positionBoard, point)
        wasHIt = await checkHit(point, machineBoard, humanBoard)
        if (wasHIt) {
            navHit(div)
            quitOusidePoints(point, machineBoard);
            //adding the new good point to the list of good points
            serchNerbyPto(point, machineBoard.getMapPointAttk(), machineBoard);
        }
        //save the point that was selected
        machineBoard.setMapPointsAttk(point)
        //clean the remain options for a point
        cleanGoodPositions(machineBoard, machineBoard.getLastGooPositionOfAtk())
    } while (wasHIt && humanBoard.totalPoints > 0);
}

function cleanGoodPositions(machineBoard, listPositiones) {
    for (const position of listPositiones) {
        if (machineBoard.getMapPointAttk(position)) {
            machineBoard.removeAgoodPosition(position)
        }
    }
}

function timeOut(ms = 2000) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function navHit(ship) {
    ship.classList.add("nav_hit")
}
// check if a ship was hit, if so call the methos to discount points 
//point -> the selected point on the map
async function checkHit(unFormatPoint, playerInTurn, playerTarget) {
    let point = parseInt(unFormatPoint);
    let coord = Object.values(playerTarget.board)[0];
    //if hit
    if (coord[point]) {
        let ship = playerTarget.identifyShip(point)
        ship.hit()
        playerTarget.discountPoint();
        return true
    } else {
        return false;
    };
}


// position the ships of a player
function positionShipsOn(player) {
    let listNav = player.listShips;
    listNav.forEach(nav => {
        marker(nav.getPositions(), nav.getId())
    });
}

//draw the point (ship) in the board
function marker(arrylist, id) {
    arrylist.forEach(elm => {
        let tempo = document.querySelector(`div[value="${elm}"]`)
        //draggable..............................................................
        tempo.setAttribute('draggable', "true")
        // tempo.setAttribute('ondragstart', "drag(id)");
        tempo.setAttribute('class', `${id}`)
        tempo.classList.add("ship")
    });
}
//draw the grid and the indicators
function drawBasicBoard(targetBoard, y, x) {
    let letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    for (let i = 0; i < 100; i++) {
        if (i < 10) {
            let ind = document.createElement("div");
            ind.innerText = i + 1;
            y.appendChild(ind)
            let sInd = document.createElement("div");
            sInd.innerText = letter[i]
            x.appendChild(sInd)
        }
        let square = document.createElement("div");
        square.setAttribute("value", `${i}`);
        targetBoard.appendChild(square);
        if (targetBoard != positionBoard) {
            square.classList.add("squareAttack")
        }
    }
}
//return a list of valid points around a point and add to board those elemnts
function serchNerbyPto(pointStr, listPtosAttaked, machineBoard) {
    let partialPerimeter = []
    //the 4 points around
    let pointsAround = [
        pointStr - 1,
        pointStr + 1,
        pointStr - 10,
        pointStr + 10,
    ]
    let topesList = topes(pointStr)
    pointsAround.forEach(element => {
        if (listPtosAttaked[element] == undefined && !(topesList.includes(element))) {
            partialPerimeter.push(element)
        }
    });
    machineBoard.setLastGoodPositionsOfAtk(partialPerimeter);
    return partialPerimeter
}
//identify that the points are valid
function topes(pointStr) {
    let baseRow = Math.floor(pointStr / 10);
    let baseCol = pointStr % 10
    let topes = []
    if (baseCol == 9) {
        topes.push(...[pointStr + 1, (pointStr - 10) + 1, (pointStr + 10) + 1])
        // if the point is at the begining of the columns
    } if (baseCol == 0) {
        topes.push(...[pointStr - 1, (pointStr - 10) - 1, (pointStr + 10) - 1]);
    } if (baseRow == 0) {
        topes.push(...[pointStr - 10, (pointStr - 10) - 1, (pointStr - 10) + 1]);
    } if (baseRow == 9) {
        topes.push(...[pointStr + 10, (pointStr + 10) - 1, (pointStr + 10) + 1])
    }
    return topes
}

function quitOusidePoints(pointStr, machineBoard) {
    let topesList = topes(pointStr)
    let discountPoints = [
        (pointStr - 1) + 10,
        (pointStr - 1) - 10,
        (pointStr + 1) + 10,
        (pointStr + 1) - 10
    ]
    for (const pto of discountPoints) {
        if (!topesList.includes(pto)) {
            machineBoard.setMapPointsAttk(pto)
        }
    }
}

