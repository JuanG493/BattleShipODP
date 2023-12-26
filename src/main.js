import Player from "./player";
import "./style.css";

// flow
// make the Player 
//     the player have a array with ships 
//     the player have a board     
//         pass the array of navis to the board to set the position
// select a point -> direccion -> check around for the available space

let modoJuego = "normal"
let player1 = new Player(modoJuego);

// pointer will be asumme as the direction 
function dockyard(ListOfPoints) {
    ListOfPoints[0].forEach(element => {
        console.log("elementos", element);

    });
    ListOfPoints[1].forEach(element => {
        console.log(element)

    });
}
