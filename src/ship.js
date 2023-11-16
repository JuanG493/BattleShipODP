

class Ship {
    _hitsRecived = 0;
    _sunk = false;
    _lenghtShip = 0;

    constructor() {
        this._lenghtShip = this.setLenghtNewShip();
    }

    setLenghtNewShip() {
        const MIN = 1;
        const MAX = 6;
        return Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
    }

    hit(shot = 1) {
        this._hitsRecived += shot;
    }

    isSunk() {
        if (this._hitsRecived >= this.lenghtShip) {
            this._sunk = true;
        }
        return this._sunk
    }
}

// export { Ship }
module.exports = Ship;