import { player } from "./index.js";

let positionBoard = document.querySelector("#board_pst");
let targetShipDraging = null
let valueTargetDiv = null;
// let elmentsOfship = {
//     direccion: null,
//     up: null,
//     down: null,
//     left: null,
//     right: null
// }
let targetPointer = null;
const pxSize = 40;

positionBoard.addEventListener("dragenter", dragEnterHandlerDropZone);
positionBoard.addEventListener("dragover", dragOverHandlerDropZone);
// positionBoard.addEventListener("drop", soltado, false);

// ************************EVENTS OVER THE DESTINATION ZONE ***************************************************

function checkValidPosition(target) {
    console.log(valueTargetDiv);
    console.log(targetShipDraging);

    let listValuesShip = targetShipDraging.values.split(",");
    let direccion = targetShipDraging.classList[2];
    let valueTempoHover = target.attributes.value.value;
    let diferentia = valueTempoHover - valueTargetDiv > 0 ? "+" : "-";

    console.log("div Hover: ", valueTempoHover);
    console.log("div Targed div: ", valueTargetDiv);
    console.log("target div: ", valueTargetDiv);
    console.log(diferentia);
    console.log(valueTempoHover - valueTargetDiv);
    console.log(listValuesShip);

    // pocision vertical
    let listNotAvailable = player.board.listUnavailable;
    let partialNewList = [];

    for (const iter of listValuesShip) {

        if (listNotAvailable.includes(+iter + diferentia)) {
        }
    }
}


function dragEnterHandlerDropZone(e) {
    e.preventDefault()

}
function dragOverHandlerDropZone(e) {
    e.preventDefault()
    let partial = e.target;
    // prevent to select as target the actual zone of the ship
    if (targetPointer != partial && partial != targetShipDraging && partial != valueTargetDiv) {
        targetPointer = partial;
        checkValidPosition(targetPointer)
        // console.log("tartget: ", e.target);
    }
}

function soltado(e) {
    // console.log("soldado");
}

//************************EVENTS OVER THE ELEMENT****************************************************
// function dragStartHandler() {
//     targetShipDraging = this;
//     // console.log(this.attributes["class"]);
//     // let clasePositions = dragShipMoving

// }
function handleDragEnd() {
    targetShipDraging.style.display = "none";
}

function controlDrag() {

    let positionShip = positionBoard.querySelectorAll('.ship');
    for (const pointShip of positionShip) {
        pointShip.addEventListener('mouseenter', (e) => {
            targetShipDraging = document.getElementById(`${pointShip.classList[0]}`)
            // console.dir(e)
            // let test = e.fromElement.classList;
            // let arryOfElm = Object.values(e.fromElement.classList);
            // console.log(arryOfElm);
            // console.log(arryOfElm.includes("ship"));
            // console.log(e.fromElement.classList);
            //prevent that the event triger for the bbuble defaul change the target
            // if (e.fromElement.classList.length == 0) {
            //     // console.log(pointShip);
            //     valueTargetDiv = pointShip.attributes.value.value;
            // }
        })
        pointShip.addEventListener('mousedown', (e) => {
            valueTargetDiv = e.target.attributes.value.value;
            targetShipDraging.style.display = "block"
        })
    }

    let sameCls = document.querySelectorAll('.dragShip');
    sameCls.forEach(itm => {
        itm.addEventListener('dragend', handleDragEnd)
        // itm.addEventListener('dragstart', dragStartHandler)
    })
}

//create a div that cover the size of the ship
function makingNewDiv() {

    for (const cls of player.getListClass()) {
        let target = positionBoard.querySelector(`.${cls}`)
        let newDiv = document.createElement('div')
        let listOfCoordinates = cls.split("_")
        // console.log("lisfCoodinates", listOfCoordinates);
        // console.log(listOfCoordinates[0]);
        //format the coordinates to creat the div in the right place
        listOfCoordinates.shift();
        listOfCoordinates.sort((a, b) => a - b);

        let sizeDiv = listOfCoordinates.length;

        let direccion = "none";
        if (listOfCoordinates.length > 1) {
            direccion = (+listOfCoordinates[1] - (+listOfCoordinates[0])) == 1 ? "hrz" : "vert"
        };

        newDiv.classList.add(`${cls}`);
        newDiv.classList.add('dragShip');
        newDiv.values = `${listOfCoordinates}`;
        newDiv.style.display = "none"
        newDiv.setAttribute('id', `${cls}`)
        // newDiv.style.zIndex = "-1";
        // newDiv.setAttribute('value', `${listOfCoordinates}`)

        newDiv.classList.add(`${direccion}_${sizeDiv}`)
        // newDiv.style.backgroundColor = "red"
        newDiv.style.border = "solid 5px red"
        newDiv.setAttribute('draggable', "true")

        if (direccion === "hrz") {
            newDiv.style.width = `${pxSize * sizeDiv}px`;
            newDiv.style.height = `${pxSize}px`;
        } else {
            newDiv.style.height = `${pxSize * sizeDiv}px`;
        }

        target.style.position = "relative";
        target.appendChild(newDiv)

    }

}

export { makingNewDiv, controlDrag }