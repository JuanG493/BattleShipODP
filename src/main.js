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
            console.log(oponent);

        }
        //create the player with a mode
        let player = new Player(mode);
        positionShipsOn(player)

        flow(player, oponent)
    })
}

started()

function flow(player1, player2) {
    let displayResult = document.querySelector("#display_turn");
    let pointPj1 = player1.getTotalPoints();
    let pointPj2 = player2.getTotalPoints();
    let target
    // let hitPoint = await getHitPoint();

    let pointTarget;
    attackBoard.addEventListener("click", async e => {
        pointTarget = e.target.attributes[0].nodeValue;
        let total = await checkHit(pointTarget)
        if (total > 3) {
            console.log("saldjfklasjf");
        }
    }, { once: true })

    // console.log(hitPoint
    // mientras exista una nave en el campo de batalla
    // while (pointPj1 != 0 && pointPj2 != 0) {
    //     displayResult.innerText = "your turn"
    //     // let points = await testi();
    //     // then(console.log(234234));
    //     break;
    // }

}
// function getHitPoint() {
//     let pointTarget;
//     attackBoard.addEventListener("click", (event) => {
//         pointTarget = event.target;
//         // console.log(target);
//         // event.preventDefault()
//     }, { once: true })
//     return pointTarget;


// }
async function checkHit(point) {
    console.log(point)
    return 5


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

function attack(point) {
    console.log(point);
    // console.log();
    // if (player.board.listCoordinates[point]) {
    //     console.log("hit");

    // } else {
    //     console.log("no hit");
    // }

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
//draw the point in the board
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
        //put the event listener only in the attack board
        // if (targetBoard != positionBoard) {
        //     square.addEventListener("click", () => {
        //         let selectPoint = square.attributes[0].nodeValue;
        //         attack(selectPoint)
        //     })
        // }
    }

}






function turns(params) {

}

