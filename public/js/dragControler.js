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
let allowed = false;


// ************************EVENTS OVER THE DESTINATION ZONE ***************************************************

function dragOverHandlerDropZone(e) {
    let partial = e.target;
    if (allowed) {
        e.preventDefault()
        // prevent to select as target the actual zone of the ship
        if (targetPointer != partial && partial != targetShipDraging) {
            updateDispo();
            checkValidPosition(partial)
            targetPointer = partial;
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
    allowed = false;
    let newPositons = positionBoard.querySelectorAll(".dispo");

    //functionality: when drop over a not valid zone nothing happend
    if (newPositons.length > 0) {
        //remove the old positions on board
        let oldClase = targetShipDraging.classList[0]
        let oldPositions = document.querySelectorAll(`.${oldClase}.ship`);
        for (const elm of oldPositions) {
            //set the old nav position as available in the player list of coordinates
            player.board.listCoordinates[elm.getAttribute("data-value")] = false;

            elm.classList.remove(`${oldClase}`, "ship")
            elm.style.position = null;
            if (elm.firstChild) {
                elm.removeChild(elm.firstChild)
            }
        }
        //create the class with the new positions
        let newClass = `${shipInPjBoard.getType()}`;
        for (const post of newPositionHover) {
            newClass += `_${post}`;
        }
        for (const pst of newPositons) {
            // console.log(i);
            pst.classList.remove("dispo")
            pst.classList.add(newClass)
            pst.classList.add("ship")

            //set the new nav position as not available
            // newListOfNoAvailable[pst.getAttribute("data-value")] = true;

            //set the new nav position as not available in the player list of coordinates
            player.board.listCoordinates[pst.getAttribute("data-value")] = true;
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
        //set the new space around of the new nav as not available
        // spaceArd.map((elm) => newListOfNoAvailable[elm] = true)

        newShip.setSpaceAround(spaceArd);
        //update th board of the player
        player.updateShip(valueTargetDiv, newShip);
        removeBigDivs();
        newListOfNoAvailable = []
        makingNewDiv();
        preDragEvents();
    }
}

function removeBigDivs() {
    for (const cls of player.getListClass()) {
        let target = positionBoard.querySelector(`.${cls}`)
        if (target.firstChild) {
            target.removeChild(target.firstChild)
        }
    }
}

function cleatEvents() {
    let positionShip = positionBoard.querySelectorAll('.ship');
    for (const pointShip of positionShip) {
        pointShip.removeEventListener("mouseenter", mouseenterHandler)
        pointShip.removeEventListener("mousedown", mousedownHandler)
    }
}



//************************EVENTS OVER THE ELEMENT****************************************************
function dragStartHandler(e) {
    if (e.target.draggable) {
        allowed = true;
    }
}

function dragEndHandler(e) {
    e.target.style.display = "none";
}

function controlDrag() {
    //create the elements for drag
    makingNewDiv()

    // positionBoard.addEventListener("dragenter", dragEnterHandlerDropZone);
    positionBoard.addEventListener("dragover", dragOverHandlerDropZone);
    positionBoard.addEventListener("drop", dropped);
    positionBoard.addEventListener("dragstart", dragStartHandler);
    preDragEvents();
}

function preDragEvents() {
    let positionShip = positionBoard.querySelectorAll('.ship');
    for (const shipYellow of positionShip) {
        shipYellow.addEventListener('mouseenter', mouseenterHandler)
        shipYellow.addEventListener('mousedown', mousedownHandler)
    }
}


function mouseenterHandler(e) {
    targetShipDraging = document.getElementById(`${this.classList[0]}`)
}
function mousedownHandler(e) {
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
    for (const nav of listNavs) {
        if (nav != shipInPjBoard) {
            let spaceArd = nav.getSpaceAround()
            for (const point of spaceArd) {
                newListOfNoAvailable[point] = true;
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
        let direccion = listOfCoordinates.length > 1 ?
            ((+listOfCoordinates[1] - (+listOfCoordinates[0])) == 1 ? "hrz" : "vert") :
            "none"

        newDiv.classList.add(`${cls}`);
        newDiv.classList.add('dragShip');
        newDiv.values = `${listOfCoordinates}`;
        newDiv.style.display = "none"
        newDiv.setAttribute('id', `${cls}`)
        newDiv.classList.add(`${direccion}_${sizeDiv}`)
        newDiv.style.border = "solid 5px #ff5d00"
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

export { makingNewDiv, controlDrag, removeBigDivs, cleatEvents }