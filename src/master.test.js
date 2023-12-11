
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


//     // test('list of board', () => {
//     //     let player2 = new Player("normal");
//     //     // console.log(player2.board);
//     //     // console.log(player2.board.length);
//     //     expect(player2.board.length).toBe(100)
//     // })


// })

// const sum = require('./sum');

// test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
// });

// const GameBoard = require('./gameBoard');
// describe("hash map ", () => {
//     test('lenght', () => {
//         let board = new GameBoard;
//         expect(board[99]).toBeFalsy();
//         expect(board[11]).toBeFalsy();
//         // expect(board[100]).toBeUndefined();
//         // expect(board[10]).toBeUndefined();
//         // console.log(board);
//     })

//     test("testing the acces to method", () => {
//         let board = new GameBoard;
//         board.posi
//     })
// })

const preCheckPot = require('./gameBoard.js')
describe("checkDiferentsPositions", () => {
    test("up", () => {
        let ch1 = preCheckPot(55, 1, 10);
        expect(ch1.length).toBe(2)
    })
    test("up a ship of lenght 2", () => {
        let ch2 = preCheckPot(55, 2, 10)
        expect(ch2.length).toBe(2);
        expect(ch2[0].length).toBe(2);
        expect(ch2[0]).toEqual([55, 65]);
        expect(ch2[1]).toContain(44, 45, 46, 54, 56, 64, 66, 74, 75, 76);
    })

    test("up a ship of lenght 3", () => {
        let ch3 = preCheckPot(55, 3, 10)
        expect(ch3.length).toBe(2);
        expect(ch3[0].length).toBe(3);
        expect(ch3[0]).toEqual([55, 65, 75]);
        expect(ch3[1]).toContain(44, 45, 46, 54, 56, 64, 66, 74, 76, 84, 85, 86);
    })

    test("up a ship of lenght 4", () => {
        let ch4 = preCheckPot(55, 4, 10)
        expect(ch4.length).toBe(2);
        expect(ch4[0].length).toBe(4);
        expect(ch4[0]).toEqual([55, 65, 75, 85]);
        expect(ch4[1]).toContain(44, 45, 46, 54, 56, 64, 66, 74, 76, 84, 86, 95, 94, 96);
    })

    test("up a ship of lenght 5", () => {
        let ch5 = preCheckPot(55, 5, 10)
        expect(ch5.length).toBe(2);
        expect(ch5[0].length).toBe(5);
        expect(ch5[0]).toEqual([55, 65, 75, 85, 95]);
        expect(ch5[1]).toContain(44, 45, 46, 54, 56, 64, 66, 74, 76, 84, 86, 94, 96);
    })

    test("left a ship of 5", () => {
        let shL5 = preCheckPot(55, 5, 1)
        expect(shL5.length).toBe(2)
        expect(shL5[0].length).toBe(5)
        expect(shL5[0]).toEqual([55, 56, 57, 58, 59]);
        expect(shL5[1].length).toBe(13);

    })

    test("down a ship of 5", () => {
        let shipD5 = preCheckPot(55, 5, -10)
        expect(shipD5.length).toBe(2)
        expect(shipD5[0].length).toBe(5)
        expect(shipD5[0]).toEqual([55, 45, 35, 25, 15]);
        expect(shipD5[1].length).toBe(16);
    })

    test("left a ship of 5", () => {
        let shipL5 = preCheckPot(55, 5, -1)
        expect(shipL5.length).toBe(2)
        expect(shipL5[0].length).toBe(5)
        expect(shipL5[0]).toEqual([55, 54, 53, 52, 51]);
        expect(shipL5[1].length).toBe(16);
    })
})

describe("Border cases", () => {

    test("down", () => {
        let shipDcorner = preCheckPot(5, 2, -10);
        expect(shipDcorner.length).toBe(2);
        expect(shipDcorner[0]).toEqual([5])
        expect(shipDcorner[1].length).toBe(5)
    })

    test("Up", () => {
        let shipUCor = preCheckPot(95, 2, 10);
        expect(shipUCor.length).toBe(2);
        expect(shipUCor[0]).toEqual([95])
        expect(shipUCor[1].length).toBe(5)
    })

    test("Left", () => {
        let shipLCor = preCheckPot(79, 2, 1);
        expect(shipLCor.length).toBe(2);
        expect(shipLCor[0]).toEqual([79])
        expect(shipLCor[1].length).toBe(5)
    })
})
