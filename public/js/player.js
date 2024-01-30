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
    #lastGoodPositionsOfAtk = [];
    #listClassShips = [];

    constructor(mode) {
        this.setModeGame(mode);
        this.setShips();
        this.board = new GameBoard(this.listShips);
        this.setTotalPoints();
        this.setListClassShips();
    }

    setListClassShips() {
        for (const element of this.listShips) {
            if (!this.#listClassShips.includes(element.getClass())) {
                let tempo = element.getClass();
                this.#listClassShips.push(tempo)
            }
        }
    }
    getListClass() {
        this.#listClassShips = [];
        this.setListClassShips();
        return this.#listClassShips
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

    // fill the array with the ships size (1 and 5)
    // or whith the specifc list
    setShips() {
        let listSizeShips = [1, 2, 3, 4, 5, 2, 3]

        for (let i = 0; i < this.numbOfShips; i++) {
            this.listShips.push(new Ship(listSizeShips[i]))
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

    updateShip(ship, replace) {
        let nav = this.identifyShip(ship);
        const navIndex = this.listShips.findIndex((elm) => elm === nav);
        this.listShips[navIndex] = replace;
    }
}

export { Player };
// module.exports = Player;
