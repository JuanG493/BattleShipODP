import Player from "./player.js";

// flow
// make the Player 
//     the player have a array with ships 
//     the player have a board     
//         pass the array of navis to the board to set the position
// select a point -> direccion -> check around for the available space

let player = new Player();
console.log(player);

let board = document.querySelector("#board");
let indLeft = document.querySelector("#ind_left");
let indRight = document.querySelector("#ind_right");


// class Testin {
//     player1;



function drawBoard(player) {
    let letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

    let coord = Object.values(player.board)[0];
    let contador = 0;
    coord.forEach(element => {
        if (contador < 10) {
            // // indLeft
            // if(contador == 0){
            // let aditional= document.createElement("div");
            // indLeft

            // }
            let ind = document.createElement("div");
            ind.innerText = contador + 1;
            indLeft.appendChild(ind)

            let sInd = document.createElement("div");
            sInd.innerText = letter[contador]
            indRight.appendChild(sInd)
            // square.setAttribute("data", `${contador}`);

        }
        let square = document.createElement("div");
        square.setAttribute("class", `${element}`);
        square.setAttribute("data", `${contador}`);
        board.appendChild(square);
        contador++;

    });

}
drawBoard(player);





function turns(params) {

}

