
// import { Ship } from "./ship";
// import { dockyard } from "./gameBoard";
// import { Player } from "./player";
// import expect from "expect";



// const Ship = require('./ship.js');
// describe("ship construction", () => {

//     test('new ship', () => {
//         let smallBoat = new Ship(4);
//         smallBoat.hit();
//         smallBoat.hit();
//         // smallBoat.hit();
//         expect(smallBoat.getSizeShip()).toBe(4);
//         expect(smallBoat.getHitsRecived()).toBe(2);
//         expect(smallBoat.getSunk()).toBeFalsy();
//         // expect(smallBoat.isSunk()).toBeFalsy();
//     })
// })



// const Player = require('./player.js');
// describe("construccion of a player", () => {

//     test('list of ships', () => {
//         let player1 = new Player("normal");
//         // console.log(player1);
//         // console.log(player1._board.drawBoard);
//         expect(player1.listShips.length).toBe(5)
//     });


//     test('list of board', () => {
//         let player2 = new Player("normal");
//         console.log(player2.board);
//         // console.log(player2.board.length);
//         expect(player2.board.length).toBe(10)
//     })


// })

// const sum = require('./sum');

// test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
// });

const GameBoard = require('./gameBoard');
describe("hash map ", () => {
    test('lenght', () => {
        let board = new GameBoard;
        expect(board[99]).toBeFalsy();
        expect(board[11]).toBeFalsy();
        expect(board[100]).toBeUndefined();
        expect(board[10]).toBeUndefined();
        console.log(board);
    })
})