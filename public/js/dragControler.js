import { player } from "./index.js";
import { GameBoard } from "./gameBoard.js";
import { Ship } from "./ship.js";

let positionBoard = document.querySelector("#board_pst");
let targetShipDraging = null
let valueTargetDiv = null;
let targetPointer = null;
const pxSize = 40;
let newListOfNoAvailable = [];
let newPositionHover = [];
let shipInPjBoard;
let listValuesShip;
let permitido = false;


// ************************EVENTS OVER THE DESTINATION ZONE ***************************************************

function dragEnterHandlerDropZone(e) {
    // e.preventDefault()

}
function dragOverHandlerDropZone(e) {
    // console.dir(e.target);
    let partial = e.target;
    console.log(e.target);

    e.preventDefault()
    if (permitido) {
        // prevent to select as target the actual zone of the ship
        if (targetPointer != partial && partial != targetShipDraging) {
            targetPointer = partial;
            updateDispo();
            checkValidPosition(partial)
        }

    }
}

function updateDispo() {
    let dispoItems = document.querySelectorAll(".dispo")
    for (const i of dispoItems) {
        i.classList.remove("dispo")
    }
}
//check if the hover zone it is a valid position to drop the ship
function checkValidPosition(target) {
    listValuesShip = targetShipDraging.values.split(",");
    let valueTempoHover = target.getAttribute('data-value');
    let valueDiferentia = valueTempoHover - valueTargetDiv;
    newPositionHover = listValuesShip.map((x) => +x + valueDiferentia)
    let dispo = newPositionHover.every((item) => !newListOfNoAvailable[item] && item >= 0 && item <= 99);
    if (dispo) {
        for (const iter of newPositionHover) {
            let tempo = document.querySelector(`div[data-value="${iter}"]`)
            tempo.classList.add("dispo")
        }
    }
}

function dropped(e) {
    // console.log(player.listShips);
    // console.log("list values ship:", listValuesShip);
    let newPositons = positionBoard.querySelectorAll(".dispo");

    //functionality: when drop over a not valid zone nothing happend
    if (newPositons.length > 0) {
        //remove the prev-position on board
        let oldClase = targetShipDraging.classList[0]
        let oldPositions = document.querySelectorAll(`.${oldClase}.ship`);
        for (const elm of oldPositions) {
            elm.classList.remove(`${oldClase}`, "ship")
            elm.style.position = null;
            if (elm.firstChild) {
                // console.log(elm.firstChild);
                elm.removeChild(elm.firstChild)
                // console.log("tiene hijo", elm);

            }
        }
        //create the class with the new positions
        let newClass = `${shipInPjBoard.getType()}`;
        for (const post of newPositionHover) {
            newClass += `_${post}`;
        }
        for (const i of newPositons) {
            i.classList.remove("dispo")
            i.classList.add(newClass)
            i.classList.add("ship")
            // i.style.position = "relative";
            // i.addEventListener("mouseenter", mouseenterHandler)
            // i.addEventListener("mousedown", mousedownHandler)

        }
        //create the new nav
        let newShip = new Ship(newPositionHover.length);
        newShip.setPosition(newPositionHover);
        let spaceArd = [];
        for (const i of newPositionHover) {
            let pointsArdNewPosition = GameBoard.helperCheckPst(+i, []);
            for (const j of pointsArdNewPosition) {
                //include only if is not in the list nither a ship point
                if (!spaceArd.includes(j) && !newPositionHover.includes(j)) {
                    spaceArd.push(j)
                }
            }
        }
        newShip.setSpaceAround(spaceArd);
        //update th board of the player
        player.updateShip(valueTargetDiv, newShip);

        // for (const i of listValuesShip) {
        //     const partial = document.querySelector(`div[data-value="${i}"]`);
        //     partial.classList.remove(`${targetShipDraging.classList[0]}`);
        //     partial.classList.remove("ship");

        //     if (partial.children.length == 1) {
        //         partial.firstChild.remove()

        //         // let divChild = partial.children[0];
        //         // let target = positionBoard.querySelector(`.${newClass}`)
        //         // divChild.classList.replace(`${targetShipDraging.classList[0]}`, newClass)
        //         // divChild.id = newClass;
        //         // divChild.values = `${newPositionHover}`
        //         // target.appendChild(divChild);
        //     }
        // }
        // clarEventos()
        // console.log(player.listShips);
        // addEvents()
        removeBigDivs()
        newListOfNoAvailable = []
    }
}

function removeBigDivs() {
    // let fathers = document.querySelectorAll()
    console.log(player.getListClass());
    for (const cls of player.getListClass()) {
        let target = positionBoard.querySelector(`.${cls}`)
        console.log(target);
        if (target.firstChild) {
            target.removeChild(target.firstChild)
        }
        // console.log(target.firstChild);
        // target.firstChild.remove();
        // console.log(target);
    }


}

function clarEventos() {
    let positionShip = positionBoard.querySelectorAll('.ship');
    for (const pointShip of positionShip) {
        pointShip.removeEventListener("mouseenter", mouseenterHandler)
        pointShip.removeEventListener("mousedown", mousedownHandler)
    }
}



//************************EVENTS OVER THE ELEMENT****************************************************
function dragStartHandler(e) {
    // console.dir(e.target);
    if (e.target.draggable) {
        permitido = true
    }
    // targetShipDraging = this;
    // console.log(this.attributes["class"]);
    // let clasePositions = dragShipMoving

}
function dragEndHandler(e) {
    e.target.style.display = "none";
}

function controlDrag() {
    positionBoard.addEventListener("dragenter", dragEnterHandlerDropZone);
    positionBoard.addEventListener("dragover", dragOverHandlerDropZone);
    positionBoard.addEventListener("drop", dropped);
    positionBoard.addEventListener("dragstart", dragStartHandler);

    let positionShip = positionBoard.querySelectorAll('.ship');
    for (const shipYellow of positionShip) {
        shipYellow.addEventListener('mouseenter', mouseenterHandler, { once: true })
        shipYellow.addEventListener('mousedown', mousedownHandler, { once: true })
    }
    // addDragendHandler()
    // dragShipsOnBoard.forEach(itm => {
    //     itm.addEventListener('dragend', dragEndHandler)
    //     // itm.addEventListener('dragstart', dragStartHandler)
    // })
}
// let dragShipsOnBoard = document.querySelectorAll('.dragShip');
// function deleteDragHadler() {
//     for (const ship of dragShipsOnBoard) {
//         ship.removeEventListener('dragend', dragEndHandler);
//     }
// }
// function dragendHandler() {
//     for (const ship of dragShipsOnBoard) {
//         console.log("aasdfasdfasdfasdfas");
//         ship.addEventListener("dragend", dragEndHandler)
//         // ship.removeEventListener('dragend',dragEndHandler);
//     }
// }



function mouseenterHandler(e) {
    targetShipDraging = document.getElementById(`${this.classList[0]}`)
    // console.log("target ship: ", targetShipDraging);
}
function mousedownHandler(e) {
    // let dragship = document.getElementById(`${e.target.classList[0]}`);
    // dragship.style.display = "block";
    valueTargetDiv = e.target.getAttribute('data-value')
    targetShipDraging.style.display = "block"
    updatListOfNoAvailable();
}

//set the newListOfNoAvailable, not available other ships and their around space;
function updatListOfNoAvailable() {
    shipInPjBoard = player.identifyShip(valueTargetDiv)
    let shipCoor = shipInPjBoard.getPositions();
    let listNavs = player.listShips;

    // add the space around of the all ships but not the actual target
    for (const i of listNavs) {
        if (i != shipInPjBoard) {
            let spaceArd = i.getSpaceAround();
            for (const j of spaceArd) {
                newListOfNoAvailable[j] = true;
            }
        }
    }

    // add the positions of the all ships as not available
    let coor = player.board.listCoordinates;
    for (let i = 0; i < coor.length - 1; i++) {
        if (newListOfNoAvailable[i] == undefined) {
            newListOfNoAvailable[i] = coor[i];
        }
    }
    //override the position of the current target ship as available
    for (const pto of shipCoor) {
        newListOfNoAvailable[pto] = false;
    }
}

//create a div that cover the size of the ship
function makingNewDiv() {

    //select the first point of the each ship
    for (const cls of player.getListClass()) {
        let target = positionBoard.querySelector(`.${cls}`)
        let newDiv = document.createElement('div')
        let listOfCoordinates = cls.split("_")

        //format the coordinates to creat the div in the right place
        listOfCoordinates.shift();
        listOfCoordinates.sort((a, b) => a - b);

        let sizeDiv = listOfCoordinates.length;
        let direccion = listOfCoordinates.length > 1 ? ((+listOfCoordinates[1] - (+listOfCoordinates[0])) == 1 ? "hrz" : "vert") : "none"

        newDiv.classList.add(`${cls}`);
        newDiv.classList.add('dragShip');
        newDiv.values = `${listOfCoordinates}`;
        newDiv.style.display = "none"
        newDiv.setAttribute('id', `${cls}`)
        newDiv.classList.add(`${direccion}_${sizeDiv}`)
        newDiv.style.border = "solid 5px red"
        newDiv.setAttribute('draggable', "true")

        if (direccion === "hrz") {
            newDiv.style.width = `${pxSize * sizeDiv}px`;
            newDiv.style.height = `${pxSize}px`;
        } else {
            newDiv.style.height = `${pxSize * sizeDiv}px`;
        }
        target.style.position = "relative";
        newDiv.addEventListener("dragend", dragEndHandler)
        target.appendChild(newDiv)
    }
}

export { makingNewDiv, controlDrag }