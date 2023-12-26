// import { GameBoard } from "./gameBoard.js"
// import { Ship } from "./ship.js";

const GameBoard = require('./gameBoard');
const Ship = require('./ship');

class Player {
    board;
    listShips = [];
    mode;


    constructor(mode = "normal") {
        this.setModeGame(mode);
        this.setShips();
        this.board = new GameBoard(this.listShips);

    }

    setModeGame(md) {
        if (md == "normal") {
            this.mode = 5
        } else {
            this.mode = 7;
        }
    }
    // fill the array with the ships of random size (1 and 5)
    setShips() {
        for (let i = 0; i < this.mode; i++) {
            this.listShips.push(new Ship())
        }
    }

}
// export { Player }
module.exports = Player;
