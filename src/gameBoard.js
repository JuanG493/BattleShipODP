
//recive a array of ships to set the position on the board like {1,2,5,3} where each int represent a size
// TODO //1.makeboard //2. set the position of boards

class GameBoard {
    listCoordinates = [];
    listUnavailable = [];

    constructor(armada) {
        this.makeBoard();
        armada.forEach(nav => {
            // console.dir(nav.getSizeShip());
            let positionsNav = this.positionShip(nav.getSizeShip());
            //set the coordinates of nav into the nav
            nav.setPosition(positionsNav);
        })
    }

    makeBoard() {
        for (let i = 0; i <= 99; i++) {
            this.listCoordinates[i] = false;
        }
    }
    //loop until find a valid position for set the ship.
    positionShip(size) {
        let position;
        let bluprint;
        // search for a clean point to position the ship
        //TODO the initial search can be better?
        while (true) {
            position = this.getRandomInt();
            // if true (the point it clear), the item can be taken as point of start
            if (this.listCoordinates[position] == false) {
                bluprint = this.direcction(position, size)
                //if true there are at least one direccion to build the ship
                if (bluprint != undefined) {
                    break
                }
            }
        }
        // bluprint[0] are the points to construct the Ship
        // fill the global variables with the values
        bluprint[0].map((elm) => this.listCoordinates[elm] = true)
        this.listUnavailable.push(...[...bluprint[1]]);
        return bluprint[0];
    }

    // take a point of star and determine a direction to build the ship 
    // reterun a direccion (top 1, down 3, right 2, left 4 ) or (false) if a point don´t have any valid  direccion
    direcction(starPoint, sizeShip) {
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
            pointsToBuild = this.checkPoints(starPoint, sizeShip, -10);
            if (pointsToBuild != undefined && pointsToBuild[0].length === sizeShip) {
                return pointsToBuild;
            }

        } if (upAvl >= sizeShip) {
            pointsToBuild = this.checkPoints(starPoint, sizeShip, 10);
            if (pointsToBuild != undefined && pointsToBuild[0].length === sizeShip) {
                return pointsToBuild;
            }

        } if (leftAvl >= sizeShip) {

            pointsToBuild = this.checkPoints(starPoint, sizeShip, -1);
            if (pointsToBuild != undefined && pointsToBuild[0].length === sizeShip) {
                return pointsToBuild;
            }

        } if (rightAvl >= sizeShip) {
            pointsToBuild = this.checkPoints(starPoint, sizeShip, 1);
            if (pointsToBuild != undefined && pointsToBuild[0].length === sizeShip) {
                return pointsToBuild;
            }
        } else {
            return;
        }
    }

    // let listCoordinates = makeBoard();
    // check the points of a ship base on his length
    // return a array with the points to build the ship [0] and all the points around the ship [1]
    checkPoints(point, sizeShip, direccion) {
        let listPointsConstruction = [];
        let listPointInPerimeter = [];
        let result = [];
        // 
        for (let i = 0; i < sizeShip; i++) {
            //check all the around of the point, if the space is available
            // false means a ship in that position
            let partial = this.helperCheckPst(point);
            if (partial !== false) {
                listPointsConstruction.push(point);
                listPointInPerimeter.push(...partial.filter((elm) => !(listPointInPerimeter.includes(elm))))
                //chenge the point toward the direction
                point += direccion;

            } else {
                return;
            }
        }
        // filter the points around
        listPointInPerimeter = listPointInPerimeter.filter((elm) => !(listPointsConstruction.includes(elm)))
        result.push(listPointsConstruction, listPointInPerimeter)
        return result;
    }
    // check all the direccions around a point,
    // return the perimeter around a point
    helperCheckPst(pointStr) {
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
            //check if it is a valid even if it is out of the board
            if (topes.includes(element)) {
                total--;
            } else if (this.listCoordinates[element] == false) {
                partialPerimeter.push(element)
                total--;
            }
        });
        return total === 0 ? partialPerimeter : false;
    }
    //return a random number between min and max, both included
    getRandomInt(min = 0, max = 99) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}

// module.exports = GameBoard;
export { GameBoard }
// module.exports = checkPoints;















