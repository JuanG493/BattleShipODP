import Player from "./player.js";



let positionBoard = document.querySelector("#board_pst");
let pstY = document.querySelector(".pst_ind_left");
let pstX = document.querySelector(".pst_ind_right");

let attackBoard = document.querySelector("#board_atk");
let atkY = document.querySelector(".atk_ind_left");
let atkX = document.querySelector(".atk_ind_right");


let btnMakeArmy = document.querySelector("#mk_army")

// let mode = document.querySelector("#mode");



function started() {
    drawBasicBoard(positionBoard, pstY, pstX)
    drawBasicBoard(attackBoard, atkY, atkX)
    let mode;
    let selectOponent;
    let oponent = null;
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
        let player = new Player(mode);
        positionShipsOn(player)

        flow(player, oponent, true)
    })
}

started()
//set the flow of the game, turn is a boolean to know who is playing
//true -> player || false -> machine
async function flow(pjCurrentTurn, pjTarget, turn) {
    console.log(pjTarget);
    if (turn) {
        console.log("Human TURN");
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
                drawPointInBoard(attackBoard, pointTarget)

                let wasHit = await checkHit(pointTarget, pjCurrentTurn, pjTarget);
                // if (pjCurrentTurn.totalPoints > 0 && pjTarget.totalPoints > 0) {

                if (wasHit) {
                    //the actual PJ continue with the turn
                    flow(pjCurrentTurn, pjTarget, true)
                } else {
                    flow(pjTarget, pjCurrentTurn, false)
                }
                // } else {
                //     console.log("game Over");
                //     //call function game over
                // }
            }, { once: true })

        } else {
            let played = await playMachine(pjCurrentTurn, pjTarget);
            flow(pjTarget, pjCurrentTurn, true)
        }

    } else {
        console.log("game Over");
        //call function game over
    }

}
function drawPointInBoard(board, point) {
    // console.log(point instanceof board);
    if (point != null) {
        let div = board.querySelector(`div[value="${point}"]`)
        div.innerText = "X"
        // div.textContent = "x"
        // div.innerHTML = "<p>x</p>"
        // console.log(div);
        div.classList.add("hit");

    }

}

async function playMachine(machineBoard, humanBoard) {
    let wasHIt;
    do {
        let point = machineBoard.board.getRandomInt();
        //select the point on the position board

        let div = positionBoard.querySelector(`div[value="${point}"]`)
        console.log(div);
        div.classList.add("hit")
        // let wasHIt = checkHit(point)
        wasHIt = await checkHit(point, machineBoard, humanBoard)

    } while (wasHIt);


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
        playerTarget.discountPoint();
        return true

    } else {
        return false;
    };
}

function testi() {
    let squaresAtrack = document.querySelectorAll(".squareAttack")
    for (const iterator of squaresAtrack) {
        iterator.addEventListener("click", () => {
            let selectPoint = iterator.attributes[0].nodeValue;
            // attack(selectPoint)
            return selectPoint
        })
    }
    return point;
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
        // tempo.setAttribute("class", "ship");

        // console.dir(tempo);

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



