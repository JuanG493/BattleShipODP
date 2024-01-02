import { GameBoard } from "./gameBoard.js"
import { Ship } from "./ship.js";

// const GameBoard = require('./gameBoard');
// const Ship = require('./ship');

export default class Player {
    board = null;
    listShips = [];
    numbOfShips = null;
    totalPoints = 0;
    #mapPointsOfAttacked = [];
    // #listCornerPoints = [];
    #lastGoodPositionsOfAtk = [];
    // #randomSizes = [];

    constructor(mode, listSizeShips) {
        this.setModeGame(mode);
        this.setShips(listSizeShips);
        this.board = new GameBoard(this.listShips);
        this.setTotalPoints();
    }

    getTotalPoints() {
        return this.totalPoints;
    }

    setTotalPoints() {
        for (const iterator of this.listShips) {
            this.totalPoints += iterator.getSizeShip();
        }
    }
    discountPoint() {
        this.totalPoints--;
    }
    // setCornerPtos(list) {
    //     this.#listCornerPoints.push(...list)
    // }
    // getCornerPoints() {
    //     return this.#listCornerPoints;
    // }

    setLastGoodPositionsOfAtk(points) {
        this.#lastGoodPositionsOfAtk.push(...points)
    }
    getLastGooPositionOfAtk() {
        return this.#lastGoodPositionsOfAtk
    }
    removeAgoodPosition(elm) {
        // this.#lastGoodPositionsOfAtk.shift()
        let index = this.#lastGoodPositionsOfAtk.indexOf(elm);
        this.#lastGoodPositionsOfAtk.splice(index, 1)

    }


    setModeGame(md) {
        switch (md) {
            case "H":
                this.numbOfShips = 1;
                break;
            case "R":
                this.numbOfShips = 7;
                break;
            default:
                this.numbOfShips = 5;
                break;
        }
    }

    // fill the array with the ships of random size (1 and 5)
    // or whith the specifc list
    setShips(listSizeShips) {
        if (listSizeShips == undefined) {
            for (let i = 0; i < this.numbOfShips; i++) {
                this.listShips.push(new Ship())
            }
        } else {
            for (const item of listSizeShips) {
                this.listShips.push(new Ship(item))
            }
        }
    }


    identifyShip(num) {
        let intNum = parseInt(num)
        for (const nav of this.listShips) {
            let pointsN = Object.values(nav.getPositions());
            if (pointsN.includes(intNum)) {
                return nav
            }
        }
    }

    getMapPointAttk(pto = 100) {
        if (pto == 100) {
            return this.#mapPointsOfAttacked
        } else {
            return this.#mapPointsOfAttacked[pto];
        }
    }

    setMapPointsAttk(pto) {
        this.#mapPointsOfAttacked[pto] = true;
    }
}
export { Player };
// module.exports = Player;
