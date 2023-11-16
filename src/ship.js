

class Ship {
    #hitsRecived = 0;
    #sunk = false;

    constructor(lenghtShip) {
        this.lenghtShip = lenghtShip;
    }

    hit(shot = 1) {
        this.#hitsRecived += shot;
    }

    isSunk() {
        if (this.#hitsRecived >= this.lenghtShip) {
            this.#sunk = true;
        }
        return this.#sunk
    }
}

export { Ship }