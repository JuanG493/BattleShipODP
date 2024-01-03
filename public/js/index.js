// import Player from "./player.js";
// main.js
import './style.css';
import Player from './player.js';



let container = document.querySelector("#container");
// container.innerHTML = `${content}`;

let positionBoard = document.querySelector("#board_pst");
let pstY = document.querySelector(".pst_ind_left");
let pstX = document.querySelector(".pst_ind_right");

let attackBoard = document.querySelector("#board_atk");
let atkY = document.querySelector(".atk_ind_left");
let atkX = document.querySelector(".atk_ind_right");

let leftPtsPj1 = document.querySelector("#leftPts_pj1")
let leftPtsPj2 = document.querySelector("#leftPts_pj2")


let btnMakeArmy = document.querySelector("#mk_army")
let btnRandom = document.querySelector("#rand")
let btnRestar = document.querySelector("#restar")
let displayTurn = document.querySelector("#display_turn")
let btnPlay = document.querySelector("#play")


let player = null;
let oponent = null;

// btnPlay.addEventListener("click", () => {

// })

// btnRandom.addEventListener("click", () => {

// })


btnRestar.addEventListener("click", () => {

    player = null;
    oponent = null;

    positionBoard.innerHTML = "";
    attackBoard.innerHTML = "";
    pstX.innerHTML = "";
    pstY.innerHTML = "";
    atkX.innerHTML = "";
    atkY.innerHTML = "";
    player = null;
    oponent = null;

    leftPtsPj1.innerText = "";
    leftPtsPj2.innerText = "";
    displayTurn.innerHTML = "";

    disabledHtmlBtn(btnMakeArmy, false);
    btnMakeArmy.removeEventListener("click", handleMakeArmy, true)

    started();

})


function started() {
    drawBasicBoard(positionBoard, pstY, pstX)
    drawBasicBoard(attackBoard, atkY, atkX)
    //button make army create the player and their ships
    btnMakeArmy.addEventListener("click", handleMakeArmy)

}

started()



function handleMakeArmy() {
    let mode;
    let selectOponent;
    let listSizeShipsOponent;
    //select the game mode
    let radiosBtns = document.querySelectorAll(".md");
    radiosBtns.forEach(element => {
        if (element.checked) {
            mode = element.value;
        }
    });

    //select the oponent
    let tempOponent = document.querySelectorAll(".opp");
    selectOponent = tempOponent[0].checked ? "machine" : "friend";


    if (selectOponent == "machine") {
        oponent = new Player(mode);
        listSizeShipsOponent = filterSizesShips(oponent)

        //create the player with a mode
        player = new Player(mode, listSizeShipsOponent);

        positionShipsOn(player)

        turns(player, oponent, true);
    } else {
        createRomm()

    }


}

function disabledHtmlBtn(btn, toggle) {
    btn.disabled = toggle;
    btnMakeArmy.disabled = toggle;


}
//for boths players have the same lenght of ships
function filterSizesShips(pJ) {
    let sizeShips = [];
    pJ.listShips.forEach(element => {
        sizeShips.push(element.getSizeShip());
    });
    return sizeShips;
}




//set the flow of the game, turn is a boolean to know who is playing
//true -> player || false -> machine
async function turns(pjCurrentTurn, pjTarget, turn) {
    // btnMakeArmy.disabled = true;
    disabledHtmlBtn(btnMakeArmy, true);
    drawRemainPoints()
    console.log(pjTarget);
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
                console.log("target waas : ", divTarget);

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
function gameOver() {
    console.log("game Over");
    let winner = leftPtsPj1 == 0 ? "MACHINE" : "HUMAN";
    displayTurn.innerText = winner, "Win";
    disabledHtmlBtn(btnMakeArmy, false)
}

function drawRemainPoints() {
    leftPtsPj1.innerText = `${player.totalPoints}`
    leftPtsPj2.innerText = `${oponent.totalPoints}`

}
function drawPointOfAttack(board, point) {
    if (point != null) {
        let div = board.querySelector(`div[value="${point}"]`)
        div.innerText = "X"
        div.innerHTML = "<img src='./images/diana.png'>"
        div.classList.add("hit");
    }
}

async function playMachine(machineBoard, humanBoard) {
    let point;
    let wasHIt;
    let partialpoint
    do {
        //serch for a point around the last hit
        //it is think that work after ther second iteration
        let prevElemts = machineBoard.getLastGooPositionOfAtk();
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

    } while (wasHIt);


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
    // attackBoard
    //if hit
    if (coord[point]) {

        let ship = playerTarget.identifyShip(point)
        ship.hit()
        // ship.classList.add("hitNav")
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
        // console.log(nav.getPositions());
        // let tst = nav;
        // console.log(nav.getId());
        marker(nav.getPositions(), nav.getId())

    });
}
//draw the point (ship) in the board
function marker(arrylist, id) {

    // console.log(identifier);
    arrylist.forEach(elm => {
        let tempo = document.querySelector(`div[value="${elm}"]`)
        //limpiar despues de crear
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
    //all the 8 points around
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

    // machineBoard.setCornerPtos(cornersPoints)
    machineBoard.setLastGoodPositionsOfAtk(partialPerimeter);
    return partialPerimeter


}

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
            // cornersPoints.push(iter)
        }

    }
    // machineBoard.setCornerPtos(cornersPoints)
    // machineBoard.setLastGoodPositionsOfAtk(partialPerimeter);
}




// Your other JavaScript code


const socket = io();


socket.on('updatePlayers', (players) => { // escucha por el evento
    console.log("estos son los jugadores", players);

    socket.emit("hello", "world", (response) => {
        console.log(response); // "got it"
    });

})

let rooms = [];
function createRomm() {


    // console.log("creando a room");
    socket.emit('createRoom');
    // const roomName = prompt('Enter room name:');
    const message = prompt('Enter message:');
    if (message) {
        socket.emit('sendMessage', "roomOne", message);
    }


}


socket.on('message', (message) => {
    console.log('Received message:', message);
});
