

// function setPositionShip(lenghtS,) {

//     //using a hash map insted of two dimension grid
//     let hashNotAvailable = [];
//     //  function that determine a valid point to to start the construction of ther ship
//     // take as an input the length of the ship 
//     function pointStartConstruction(lenghtS) {
//         let notAllowed = [];
//         let starP;

//         let findP = false;
//         do {
//             //select a random position
//             let ranPoint = getRandomInt();
//             //primero tengo que comprobar que alrededor no halla otro punto o espacio 
//             // si no hay proseguir
//             // si hay buscar otro punto gi
//             findP = checkAround(ranPoint)


//         } while (!findP);
//         let maxP = 0;
//         return starP;
//     }
//     //aux functions
//     // put all the fields around the target point unavailables for other than the same ship
//     function checkAround(point, lenghtS) {

//         // better to try the total length of the ship on the board it self 
//         // 
//         //bounderies

//         function checkBondary() {

//             if (prevCol < limitLeft) {
//                 partial += 1;
//             }
//             if (netxCol > limitRight) {
//                 partial += 1;
//             }
//             if (nextRow > 99) {
//                 partial += 1;
//             }
//             if (prevRow < 0) {
//                 partial += 1;
//             }
//         }
//         let row = point % 10;
//         let col = point / 10;

//         let limitLeft = point - col
//         let limitRight = point + 9;

//         let prevCol = point - 1;
//         let netxCol = point + 1;

//         let prevRow = point - 10;
//         let nextRow = point + 10;

//         //verificar el punto 
//         let partial = 0;
//         if (hashNotAvailable[point] == undefined) {
//             // hashAvailables[point] = true;
//         } else {
//             return false
//         }

//     }

//     function constructionRestLenght(params) {
//     }
//     //
//     // min is inclusive max exclusive
//     function getRandomInt(min = 0, max = 100) {
//         return Math.floor(Math.random() * (max - min) + min)
//     }
// }

// function dockyard() {
//     let starPoint = pointStartConstruction();
//     let numCol = 0;

//     let numRow = Math.floor(Math.random() * 11);

//     while (numCol == 0) {
//         let partialCol = Math.floor(Math.random() * 11);
//         if (!hashAvailables.includes(partialCol)) {
//             numCol = partialCol;
//         }
//     }

//     function constructionRestLenght(params) {
//     }
//     //return a random number between min and max, both included
//     function getRandomInt(min = 0, max = 100) {
//         return Math.floor(Math.random() * (max - min + 1) + min)
//     }
// }

// function dockyard() {
//     let starPoint = pointStartConstruction();
//     let numCol = 0;

//     let numRow = Math.floor(Math.random() * 11);

//     while (numCol == 0) {
//         let partialCol = Math.floor(Math.random() * 11);
//         if (!hashAvailables.includes(partialCol)) {
//             numCol = partialCol;
//         }
//     }
//     return availableArea;
// }
function GameBoard() {

    let list = [];
    for (let i = 0; i < 10; i++) {
        let partialL = [];
        for (let j = 0; j < 10; j++) {
            partialL.push(j);
            // let square = document.createElement("div");
            // square.setAttribute("class", "square");
            // square.setAttribute("data", `${i},${j}`);
            // board.appendChild(square);
        }
        list.push(partialL)
    }
    return list;
}



// class GameBoard {
//     board = [];

//     constructor() {
//         this.board = this.drawBoard();

//     }

//     drawBoard() {
//         let list = [];
//         for (let i = 0; i < 10; i++) {
//             let partialL = [];
//             for (let j = 0; j < 10; j++) {
//                 partialL.push(j);
//                 // let square = document.createElement("div");
//                 // square.setAttribute("class", "square");
//                 // square.setAttribute("data", `${i},${j}`);
//                 // board.appendChild(square);
//             }
//             list.push(partialL)
//         }
//         return list;
//     }

//     positionShip() {

//     }
//     // determine if the atack hit the ship
//     receiveAttack(x, y) {


//     }

//     totalShips() {

//     }
// }

// export { GameBoard, dockyard }
module.exports = GameBoard;
