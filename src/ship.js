

class Ship {
    #hitsRecived = 0;
    #sunk = false;
    #lenghtShip = 0;
    #tipe;

    constructor(lenght = this.#setLenghtNewShip()) {
        if (lenght >= 1 && lenght <= 5) {
            this.#lenghtShip = lenght;
        } else {
            this.#lenghtShip = this.#setLenghtNewShip();
        }
        this.#setType();

    }

    getHitsRecived() {
        return this.#hitsRecived;
    }

    getSunk() {
        return this.#sunk;
    }
    getSizeShip() {
        return this.#lenghtShip;
    }
    getType() {
        return this.#tipe;
    }

    #setLenghtNewShip() {
        const MIN = 1;
        const MAX = 5;
        return Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
    }

    hit() {
        if (this.#lenghtShip >= 1) {
            this.#hitsRecived += 1;
        }
        this.#setSunk;
    }

    #setSunk() {
        if (this.#hitsRecived >= this.lenghtShip) {
            this.#sunk = true;
        }
        return this.#sunk
    }

    #setType() {
        switch (this.#lenghtShip) {
            case 1:
                this._tipe = "boat"
                break;
            case 2:
                this._tipe = "Patrol Boat"
                break
            case 3:
                this._tipe = "Submarine"
                break
            case 4:
                this._tipe = "Destroyer"
                break
            default:
                this._tipe = "Carrier"
                break;
        }
    }
}

// export { Ship }
module.exports = Ship;