import { GameBoard } from "./gameBoard.js"
import { Ship } from "./ship.js";

// const GameBoard = require('./gameBoard');
// const Ship = require('./ship');

export default class Player {
    board = null;
    listShips = [];
    sizeNavy = null;
    totalPoints = 0;



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

    setModeGame(md) {
        switch (md) {
            case "H":
                this.sizeNavy = 1;
                break;
            case "R":
                this.sizeNavy = 7;
                break;
            default:
                this.sizeNavy = 5;
                break;
        }
    }

    // fill the array with the ships of random size (1 and 5)
    setShips() {
        for (let i = 0; i < this.sizeNavy; i++) {
            this.listShips.push(new Ship())
        }
    }

}
// export { Player };
// module.exports = Player;
