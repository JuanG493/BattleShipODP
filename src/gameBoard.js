
//recive a array of ships to set the position on the board like {1,2,5,3} where each int represent a size
// TODO //1.makeboard //2. set the position of boards
function GameBoard(armada) {

    armada.forEach(nav => {
        positionShip(nav)


    });
}

let listCoordinates = [];
let listUnavailable = [];

function makeBoard() {
    for (let i = 0; i <= 99; i++) {
        listCoordinates[i] = false;
    }
    return listCoordinates;
}
// ####Start HERE####

function positionShip(size) {
    let position;
    let bluprint;
    // search for a clean point to position the ship
    //TODO the initial search can be better?
    while (true) {
        position = getRandomInt();
        // if true (the point it clear), the item can be taken as point of start
        if (listCoordinates[position] == false) {

            bluprint = direcction(position, size)
            //if true there are at least one direccion to build the ship
            if (bluprint[0] !== null) {
                break
            }

        }
    }
    // send to construction
    return bluprint;

    // return false;
}

// take a point of star and determine a direction to build the ship 
// reterun a direccion (top 1, down 3, right 2, left 4 ) or (false) if a point don´t have any valid  direccion
function direcction(starPoint, sizeShip) {

    //point is a number between 10 and 99
    // true if it´s boudari the point

    let row = Math.floor(starPoint / 10);
    let col = starPoint % 10

    //space available
    let downAvl = row;
    let upAvl = 9 - row;
    let leftAvl = col;
    let rightAvl = 9 - col;

    let pointsToBuild = [];
    //check if are space if so then search the space around
    if (downAvl >= sizeShip) {
        pointsToBuild = checkPoints(starPoint, sizeShip, -10);
        if (pointsToBuild[0].length == sizeShip) {
            return pointsToBuild;
        }

    } else if (upAvl >= sizeShip) {
        pointsToBuild = checkPoints(starPoint, sizeShip, 10);
        if (pointsToBuild[0].length == sizeShip) {
            return pointsToBuild;
        }

    } else if (leftAvl >= sizeShip) {

        pointsToBuild = checkPoints(starPoint, sizeShip, -1);
        if (pointsToBuild[0].length == sizeShip) {
            return pointsToBuild;
        }

    } else if (rightAvl >= sizeShip) {
        pointsToBuild = checkPoints(starPoint, sizeShip, 1);
        if (pointsToBuild[0].length == sizeShip) {
            return pointsToBuild;
        }
    } else {
        return null;
    }

}

// //emulates the point to beging the constuction, the size and the direccion (-10(down), 10(up), 1(right), -1(left)) 
// // only for testing purpose
// function preCheckPot(point, sizeShip, direccion) {

// let listCoordinates = makeBoard();
// check the points of a ship base on his length
// return a array with the points to build the ship [0] and all the points around the ship [1]
function checkPoints(point, sizeShip, direccion) {
    let listPointsOfCnstr = [];
    let listPointInPerimeter = [];
    let result = [];
    // 
    for (let i = 0; i < sizeShip; i++) {
        //check all the around of the point, if the space is available
        // false means a ship in that position
        let partial = helperCheckPst(point);
        if (partial !== false) {
            // this corroboration is necesary?
            if (point >= 0 && point <= 99) {
                listPointsOfCnstr.push(point);
            }
            // TotalPerimeter.push(...partial)

            listPointInPerimeter.push(...partial.filter((elm) => !(listPointInPerimeter.includes(elm))))
            //chenge the point toward the direction
            point += direccion;

        } else {
            break
        }
    }
    // filter the points around

    listPointInPerimeter = listPointInPerimeter.filter((elm) => !(listPointsOfCnstr.includes(elm)))
    result.push(listPointsOfCnstr, listPointInPerimeter)
    return result;
}
// check all the direccions around a point,
// return the perimeter around a point
function helperCheckPst(pointStr) {
    let baseRow = Math.floor(pointStr / 10);
    let baseCol = pointStr % 10

    let partialPerimeter = []
    let topes = []
    let total = 8;

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
        (pointStr - 1) + 10,
        (pointStr - 1) - 10,
        (pointStr + 1) + 10,
        (pointStr + 1) - 10
    ]
    pointsAround.forEach(element => {
        //check if it is a valid even if are out of the board
        if (topes.includes(element)) {
            total--;
        } else if (listCoordinates[element] == false) {
            partialPerimeter.push(element)
            total--;
        }
    });
    return total === 0 ? partialPerimeter : false;
}


//return a random number between min and max, both included
function getRandomInt(min = 0, max = 99) {
    return Math.floor(Math.random() * (max - min) + min)
}

// makeBoard();
// positionShip(2);
// return listCoordinates


GameBoard()
//take in acount that the direccion is cheeck before this check by point
//so if the ship does not has space in the board never gonna reach this point
let shipD5 = checkPoints(78, 2, 1)


// module.exports = GameBoard;
// module.exports = checkPoints;















// function GameBoard() {

//     let rows = 10;
//     let cols = 10;
//     let list = [];
//     for (let i = 0; i < rows; i++) {
//         list[i] = [];
//         // let partialL = [];
//         for (let j = 0; j < cols; j++) {
//             list[i][j] = j
//             // partialL.push(j);
//             // let square = document.createElement("div");
//             // square.setAttribute("class", "square");
//             // square.setAttribute("data", `${i},${j}`);
//             // board.appendChild(square);
//         }
//         // list.push(partialL)
//     }
//     return list;
// }
// class GameBoard {
//     listCoordinates = [];
//     listUnavailable = [];
//     constructor() {
//         this.board = this.drawBoard();
//     }
//     drawBoard() {


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