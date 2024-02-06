import './style.css';
import Player from './player.js';
import { makingNewDiv, controlDrag } from './dragControler.js';
import { playMachine } from './machineLogic.js';
// import { allowedAttack } from './socketIOControl.js';


import { handleCreateRoom, handleJointToGame, ready, readyToPlay, readyToStart } from './socketIOControl.js';

// const socket = io(); //here the domain 


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

function setID(id) {
    idPlayer = id;
}
function setNameRoom(name) {
    nameGameRoom = name

}
function setIdOponent(id) {
    idOponent = id;
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
    controlDrag();
})

btnMakeArmy.addEventListener("click", async () => {
    if (selectionOponentMenu == null) {
        alert("Please select a oponent")

    } else {
        if (selectionOponentMenu === "create") {
            if (inputNameRoom.value == "") {
                alert("Please enter a room name first")
            } else {
                hablePanel()
            }

        } else if (selectionOponentMenu === "join") {
            if (inputNameRoom.value == "") {
                alert("Please enter a room name first")
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



function hablePanel() {
    player = new Player(gameModeSelected());
    positionShipsOn(player)
    controlDrag(); //start here //..................................here draw

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
            readyToPlay(nameGameRoom, player);
            break;
        case "join":
            ready();
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

    //check if it´s posible play
    if (pjCurrentTurn.totalPoints > 0 && pjTarget.totalPoints > 0) {
        if (turn) {
            displayTurn.innerText = "Human Turn"
            let pointTarget = await attack()
            drawPointOfAttack(attackBoard, pointTarget)
            let wasHit = await checkHit(pointTarget, pjCurrentTurn, pjTarget);
            if (wasHit) {
                navHit(divTarget)
                //the actual PJ continue with the turn
                turns(pjCurrentTurn, pjTarget, true)
            } else {
                turns(pjTarget, pjCurrentTurn, false)
            }
        } else {
            displayTurn.innerText = "Machine Turn"
            await playMachine(pjCurrentTurn, pjTarget);
            turns(pjTarget, pjCurrentTurn, true)
        }
    } else {
        gameOver();
    }
}
async function attack() {
    let validTargetPto;
    while (!validTargetPto) {
        let selectedPto = await allowedAttack();
        if (selectedPto >= 0 && selectedPto <= 99) {
            validTargetPto = selectedPto;
        }
    }
    return validTargetPto
}

//let the player to play in his attack board for a turn
export async function allowedAttack() {
    return new Promise((resolve, reject) => {
        function clickHandler(e) {
            let divTarget = e.target
            let pointTarget = divTarget.attributes[0].nodeValue;
            resolve(pointTarget)
        }
        attackBoard.addEventListener('click', clickHandler, { once: true })
    })
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
    let div = board.querySelector(`div[data-value="${point}"]`)
    // div.innerText = "X"
    div.innerHTML = "<img src='./images/diana.png'>"
    div.classList.add("hit");
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
        // console.log(nav);
        marker(nav.getPositions(), nav.getClass())
    });
}

//draw the point (ship) in the board
function marker(arrylist, className) {
    arrylist.forEach(elm => {
        let tempo = document.querySelector(`div[data-value="${elm}"]`)
        // tempo.setAttribute('draggable', "true")
        tempo.classList.add(`${className}`)
        tempo.classList.add("ship")
        // tempo.style.zIndex = "1";
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
        square.setAttribute("data-value", `${i}`);
        targetBoard.appendChild(square);
        if (targetBoard != positionBoard) {
            square.classList.add("squareAttack")
        }
    }
}


export {
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
    checkHit,
    attack
}