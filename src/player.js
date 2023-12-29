import { GameBoard } from "./gameBoard.js"
import { Ship } from "./ship.js";

// const GameBoard = require('./gameBoard');
// const Ship = require('./ship');

export default class Player {
    board = null;
    listShips = [];
    numbOfShips = null;
    totalPoints = 0;
    #mapPointAttk = [];



    constructor(mode) {
        this.setModeGame(mode);
        this.setShips();
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
    setShips() {
        for (let i = 0; i < this.numbOfShips; i++) {
            this.listShips.push(new Ship())
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
            return this.#mapPointAttk
        } else {
            return this.#mapPointAttk[pto];
        }
    }

    setMapPointsAttk(pto) {
        this.#mapPointAttk[pto] = true;
    }
}
// export { Player };
// module.exports = Player;
