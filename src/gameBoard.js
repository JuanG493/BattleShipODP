

function setPositionShip(lenghtS,) {

    //using a hash map insted of two dimension grid
    let hashNotAvailable = [];
    //  function that determine a valid point to to start the construction of ther ship
    // take as an input the length of the ship 
    function pointStartConstruction(lenghtS) {
        let notAllowed = [];
        let starP;

        let findP = false;
        do {
            //select a random position
            let ranPoint = getRandomInt();
            //primero tengo que comprobar que alrededor no halla otro punto o espacio 
            // si no hay proseguir
            // si hay buscar otro punto gi
            findP = checkAround(ranPoint)


        } while (!findP);
        let maxP = 0;
        return starP;
    }
    //aux functions
    // put all the fields around the target point unavailables for other than the same ship
    function checkAround(point, lenghtS) {

        // better to try the total length of the ship on the board it self 
        // 
        //bounderies

        function checkBondary() {

            if (prevCol < limitLeft) {
                partial += 1;
            }
            if (netxCol > limitRight) {
                partial += 1;
            }
            if (nextRow > 99) {
                partial += 1;
            }
            if (prevRow < 0) {
                partial += 1;
            }
        }
        let row = point % 10;
        let col = point / 10;

        let limitLeft = point - col
        let limitRight = point + 9;

        let prevCol = point - 1;
        let netxCol = point + 1;

        let prevRow = point - 10;
        let nextRow = point + 10;

        //verificar el punto 
        let partial = 0;
        if (hashNotAvailable[point] == undefined) {
            // hashAvailables[point] = true;
        } else {
            return false
        }

    }



}




function GameBoard() {
    let list = [];
    let listUnavailable = [];

    function makeBoard() {
        for (let i = 11; i < 99; i++) {
            list[i] = false;
        }
        return list;
    }

    function setStartPoint(size) {
        let position;
        //check if it is the first entry, if so then go direcc 
        if (listUnavailable == 0) {
            position = getRandomInt();
            // list[partialPosition] = true;
            // listUnavailable.push(position);
            dockyard(position, size);

        } else {
            let dir;
            while (true) {
                position = getRandomInt();
                // if false, the item can be taken as point of start
                if (list[position] == false) {
                    // list[partialPosition] = true;

                    //if true there are at least one direccion to build the ship
                    dir = direcction(position, size)
                    if (dir != false) {
                        break
                    }

                }
            }


            dockyard(position, size, dir)
        }
    }

    // take a point of start, base on the available points and the restriccions of the board
    // determine a direction to build the ship 
    // reterun a direccion (top, down, right, left ) or (false) if a point don´t have any valid  direccion
    function direcction(star, size) {
        let bondaryLeft
        let bondaryRight


        if (up()) {
            return 1
        } else if (right()) {
            return 2
        } else if (down()) {
            return 3;
        } else if (left()) {
            return 4;
        } else {
            return false;
        }

        function up() {
            //check the point and their lef and right, the last one is for the bottom
            let oneDown = list[star - 10] == false || list[star - 10] == undefined;
            let oneDownleft = list[(star - 10) - 1] == false || list[(star - 10) - 1] == undefined;
            let oneDownRigtlist = [(star - 10) + 1] == false || list[(star - 10) + 1] == undefined;
            if ((checkUpDown('U', star) && oneDown) && ((checkUpDown('u', star - 1) && oneDownleft) || (checkUpDown('U', star + 1)) && oneDownRigtlist)) {
                return true;
            } else {
                return false
            }
        }
        function down() {
            if (checkUpDown('D', star) && checkUpDown('D', star - 1) && checkUpDown('D', star + 1) && checkUpDown('D', star - 10)) {
                return true;
            } else {
                return false
            }
        }
        function right() {




        }
        function left() {

        }
        function checkLeftRoight(params) {

        }
        function checkOneDoP(stP) {



        }

        function checkUpDown(polo, pointCheck) {
            let iter = 0;
            // check if toda la nave + 1 cabe (+1 porque se necesita que tambiens ese espacio este disponible)
            for (let i = 0; i < size + 1; i++) {
                //for the ceil of the ship
                if (iter == size) {
                    // if false there are not space up the ship to build this
                    if (!(list[pointCheck] === false || list[pointCheck] == undefined)) {
                        iter = 0;
                        break;
                    }
                } else if (list[pointCheck] == false) {
                    iter++;
                    if (polo == 'U') {
                        pointCheck += 10;
                    } else if (polo == 'D') {
                        pointCheck -= 10;
                    } else if (polo == 'L') {
                        pointCheck - 1;
                    } else {
                        pointCheck + 1;

                    }
                }
            }
        }
    }






    function dockyard(point, sizeShip, pointer = getRandomInt(1, 4)) {
        switch (pointer) {
            case 1: //up
                while (sizeShip >= 0) {
                    drawpoinst(point)
                    point += 10;
                    sizeShip--;
                }
                break;
            case 2: //right
                while (sizeShip >= 0) {
                    drawpoinst(point)
                    point++;
                    sizeShip--;
                }
                break;
            case 3: //down
                while (sizeShip >= 0) {
                    drawpoinst(point)
                    point -= 10;
                    sizeShip--;
                }
                break;
            default: //left
                while (sizeShip >= 0) {
                    drawpoinst(point)
                    point--;
                    sizeShip--;
                }
                break;
        }
    }
    // draw the point and disable all the points around that point
    function drawpoinst(point) {
        list[point] = true;
        // one row before and after
        // listUnavailable.push(point - 1);
        list[point - 1] = null;
        list[point + 1] = null;
        //one column up and down
        // listUnavailable.push(point - 10);
        // listUnavailable.push(point + 10);
        list[point - 10] = null;
        list[point - 10] = null;
        //diagonals -Y
        // listUnavailable.push((point - 1) - 10)
        // listUnavailable.push((point - 1) + 10)
        list[(point - 1) + 10] = null;
        list[(point - 1) - 10] = null;
        //diagonals +X 
        // listUnavailable.push((point + 1) - 10)
        // listUnavailable.push((point + 1) + 10)
        list[(point + 1) - 10] = null;
        list[(point + 1) + 10] = null;
    }
    //return a random number between min and max, both included
    function getRandomInt(min = 11, max = 99) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    makeBoard();
    return list;
}


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
module.exports = GameBoard;
