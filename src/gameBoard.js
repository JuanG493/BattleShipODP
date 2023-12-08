

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
        let dir;
        while (true) {
            position = getRandomInt();
            // if false, the item can be taken as point of start
            if (listCoordinates[position] == false) {
                // list[partialPosition] = true;

                //if true there are at least one direccion to build the ship
                dir = direcction(position, size)
                if (dir != false) {
                    break
                }

            }
        }

        // send to construction
        dockyard(position, size, dir)


    }

    // take a point of start, base on the available points and the restriccions of the board
    // determine a direction to build the ship 
    // reterun a direccion (top 1, down 3, right 2, left 4 ) or (false) if a point don´t have any valid  direccion
    function direcction(starPoint, sizeShip) {
        let bondaryLeft
        let bondaryRight


        if (up()) {
            return 10
        } else if (right()) {
            return 1
        } else if (down()) {
            return -10;
        } else if (left()) {
            return -1;
        } else {
            return false;
        }

        function up() {

            checkPoints(starPoint, sizeShip, 10)



        }
        function down() {
            if (checkUpDown('D', starPoint) && checkUpDown('D', starPoint - 1) && checkUpDown('D', starPoint + 1) && checkUpDown('D', starPoint - 10)) {
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


        function checkPoints(point, sizeShip, direccion) {
            let lisForShip = [];

            for (let i = 0; i < sizeShip; i++) {
                // if and only if the point exist in the board check the perimeter of the point 
                // if not exist that means it is a wrong direcction
                if (listCoordinates[point] == null) {

                    if (aux(point) != 0) {
                        return false;
                    }
                    lisForShip.push(point);
                    if (direccion > 0) {
                        point += direccion;
                    } else {
                        point -= direccion;
                    }
                } else {
                    return false;
                }


            }

            function aux(PontStr) {
                let total = 8;
                let cases = [PontStr - 1, PontStr + 1, PontStr - 10, PontStr + 10, (PontStr - 1) + 10, (PontStr - 1) - 10, (PontStr + 1) + 10, (PontStr + 1) - 10]

                cases.forEach(element => {
                    if (listCoordinates[element] == false || listCoordinates[element] == undefined) {
                        // here I will check the bondaries for the point ???????????????????
                        total--;
                    }
                });
                return total;
            }
            return true
        }



    }

    //point is a number between 10 and 99
    // true if it´s boudari the point
    function bondaries(point, comparison) {
        let row = point % (point % 10);
        let col = point % 10



    }





    // pointer will be asumme as the direction 
    function dockyard(point, sizeShip, pointer = getRandomInt(1, 4)) {
        switch (pointer) {
            case 1: //up
                while (sizeShip >= 0) {
                    drawPoints(point)
                    point += 10;
                    sizeShip--;
                }
                break;
            case 2: //right
                while (sizeShip >= 0) {
                    drawPoints(point)
                    point++;
                    sizeShip--;
                }
                break;
            case 3: //down
                while (sizeShip >= 0) {
                    drawPoints(point)
                    point -= 10;
                    sizeShip--;
                }
                break;
            default: //left
                while (sizeShip >= 0) {
                    drawPoints(point)
                    point--;
                    sizeShip--;
                }
                break;
        }
    }
    // draw the point and disable all the points around that point
    function drawPoints(point) {
        listCoordinates[point] = true;
        // one row before and after
        // listUnavailable.push(point - 1);
        listCoordinates[point - 1] = null;
        listCoordinates[point + 1] = null;

        //one column up and down
        // listUnavailable.push(point - 10);
        // listUnavailable.push(point + 10);
        listCoordinates[point - 10] = null;
        listCoordinates[point - 10] = null;

        //diagonals -Y
        // listUnavailable.push((point - 1) - 10)
        // listUnavailable.push((point - 1) + 10)
        listCoordinates[(point - 1) + 10] = null;
        listCoordinates[(point - 1) - 10] = null;

        //diagonals +X 
        // listUnavailable.push((point + 1) - 10)
        // listUnavailable.push((point + 1) + 10)
        listCoordinates[(point + 1) - 10] = null;
        listCoordinates[(point + 1) + 10] = null;
    }
    //return a random number between min and max, both included
    function getRandomInt(min = 0, max = 99) {
        return Math.floor(Math.random() * (max - min) + min)
    }

    makeBoard();
    positionShip(4);
    return listCoordinates;
}
GameBoard()



module.exports = GameBoard;
