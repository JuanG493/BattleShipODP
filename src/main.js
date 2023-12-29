import Player from "./player.js";



let positionBoard = document.querySelector("#board_pst");
let pstY = document.querySelector(".pst_ind_left");
let pstX = document.querySelector(".pst_ind_right");

let attackBoard = document.querySelector("#board_atk");
let atkY = document.querySelector(".atk_ind_left");
let atkX = document.querySelector(".atk_ind_right");

let leftPtsPj1 = document.querySelector("#leftPts_pj1")
let leftPtsPj2 = document.querySelector("#leftPts_pj2")


let btnMakeArmy = document.querySelector("#mk_army")
let displayTurn = document.querySelector("#display_turn")

// let mode = document.querySelector("#mode");

let player = null;
let oponent = null;

function started() {
    drawBasicBoard(positionBoard, pstY, pstX)
    drawBasicBoard(attackBoard, atkY, atkX)
    let mode;
    let selectOponent;

    //button make army create the player and their ships
    btnMakeArmy.addEventListener("click", () => {

        //select the game mode
        let radiosBtns = document.querySelectorAll(".md");
        radiosBtns.forEach(element => {
            if (element.checked) {
                mode = element.value;
            }
        });

        //select the oponent
        let tempOponent = document.querySelectorAll(".opp");
        selectOponent = tempOponent[0].checked ? "maquina" : "friend";


        if (selectOponent == "maquina") {
            oponent = new Player(mode);
            // console.log(oponent);

        }
        //create the player with a mode
        player = new Player(mode);
        positionShipsOn(player)

        turns(player, oponent, true)
    })
}

started()

//set the flow of the game, turn is a boolean to know who is playing
//true -> player || false -> machine
async function turns(pjCurrentTurn, pjTarget, turn) {
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
            let played = await playMachine(pjCurrentTurn, pjTarget);
            turns(pjTarget, pjCurrentTurn, true)
        }

    } else {
        console.log("game Over");
        //call function game over
    }

}
function drawRemainPoints() {
    leftPtsPj1.innerText = `${player.totalPoints}`
    leftPtsPj2.innerText = `${oponent.totalPoints}`

}
function drawPointOfAttack(board, point) {
    if (point != null) {
        let div = board.querySelector(`div[value="${point}"]`)
        div.innerHTML = "<img src='/src/images/redPoint.png'>"
        div.classList.add("hit");
    }
}

async function playMachine(machineBoard, humanBoard) {
    let point;
    let wasHIt;
    do {
        //serch for a point around the last hit
        //it is think that work afeter ther second iteration
        if (wasHIt) {
            let around = serchNerbyPto(point, machineBoard.getMapPointAttk());

            let partialpoint = machineBoard.board.getRandomInt(1, around.length)
            point = around[partialpoint]


        } else {
            do {
                point = machineBoard.board.getRandomInt();

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
        }
        machineBoard.setMapPointsAttk(point)

    } while (wasHIt);


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

function serchNerbyPto(pointStr, listSelectdPtos) {
    let baseRow = Math.floor(pointStr / 10);
    let baseCol = pointStr % 10

    let partialPerimeter = []
    let topes = []
    // let total = 8;

    // if the point is at the end of the columns still be a valid position  
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

    //all the 8 points around
    let pointsAround = [
        pointStr - 1,
        pointStr + 1,
        pointStr - 10,
        pointStr + 10,
        // (pointStr - 1) + 10,
        // (pointStr - 1) - 10,
        // (pointStr + 1) + 10,
        // (pointStr + 1) - 10
    ]
    pointsAround.forEach(element => {
        // //check if it is a valid even if it is out of the board
        // if (topes.includes(element)) {
        //     total--;
        //     //chenge for thee actual points selected ----------------------------------
        // } 
        if (listSelectdPtos[element] == undefined) {
            partialPerimeter.push(element)
            // total--;
        }
    });
    return partialPerimeter


}



