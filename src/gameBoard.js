


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




function GameBoard() {

    let listCoordinates = [];
    let listUnavailable = [];

    function makeBoard() {
        for (let i = 0; i <= 99; i++) {
            listCoordinates[i] = false;
        }
        return listCoordinates;
    }
}
// ####Start HERE####
function positionShip(size) {
    let position;
    //check if it is the first entry, if so then go direcc 
    // if (listUnavailable == 0) {
    // position = getRandomInt();
    // list[partialPosition] = true;
    // listUnavailable.push(position);
    // dockyard(position, size);

    // } else {
    let bluprint;
    while (true) {
        position = getRandomInt();
        // if false, the item can be taken as point of start
        if (listCoordinates[position] == false) {
            // list[partialPosition] = true;

            //if true there are at least one direccion to build the ship
            bluprint = direcction(position, size)
            if (bluprint[0] !== null) {
                break
            }

        }
    }
    // send to construction
    dockyard(bluprint)

    return false;
}

// take a point of start, base on the available points and the restriccions of the board
// determine a direction to build the ship 
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

// check the points of a ship base on his length
// return the points to build the ship [0] and all the points around the ship
function checkPoints(point, sizeShip, direccion) {
    let lisForShip = [];
    let TotalPerimeter = [];
    let result = [];

    for (let i = 0; i < sizeShip; i++) {
        //check around the point if the space is available
        // false means a ship in that position
        let partial = helperCheckPst(point);
        if (partial !== false) {
            lisForShip.push(point);
            partial.forEach(element => {
                if (!TotalPerimeter.includes(element) && !lisForShip.includes(element)) {
                    TotalPerimeter.push(element)
                }
            });

            if (direccion > 0) {
                point += direccion;
            } else {
                point -= direccion;
            }
        } else {
            break
        }

    }
    result.push(lisForShip, TotalPerimeter)
    return result;
}
// check all the direccions around a point,
// return the perimeter around a point
function helperCheckPst(pointStr) {
    let baseRow = pointStr % (pointStr % 10);
    let baseCol = pointStr % 10;

    let partialPerimeter = []
    let topes = []
    let total = 8;
    // if the point is at the end of the columns still be a valid position  
    if (baseCol == 9) {
        topes = [pointStr + 1, (pointStr - 10) + 1, (pointStr + 10) + 1]
        // if the point is at the begining of the columns
    } if (baseCol == 0) {
        topes = [pointStr - 1, (pointStr - 10) - 1, (pointStr + 10) - 1]
    }

    let cases = [pointStr - 1, pointStr + 1, pointStr - 10, pointStr + 10, (pointStr - 1) + 10, (pointStr - 1) - 10, (pointStr + 1) + 10, (pointStr + 1) - 10]
    cases.forEach(element => {
        if (listCoordinates[element] == false || listCoordinates[element] == undefined || topes.includes(element)) {
            total--;
        }
        // do not interest to include points that are undefined or points that are out of range
        if (!(topes.includes(element)) && listCoordinates[element] != undefined) {
            //?????????????????? add points that are already in the list ???
            partialPerimeter.push(element)
        }
    });
    return total === 0 ? partialPerimeter : false;


}




// pointer will be asumme as the direction 
function dockyard(ListOfPoints) {
    ListOfPoints[0].forEach(element => {
        console.log("elementos", element);

    });
    ListOfPoints[1].forEach(element => {
        console.log(element)

    });
}

//return a random number between min and max, both included
function getRandomInt(min = 0, max = 99) {
    return Math.floor(Math.random() * (max - min) + min)
}

makeBoard();
positionShip(2);
return listCoordinates


GameBoard()



module.exports = GameBoard;
