class Ship {
    #hitsRecived = 0;
    #sunk = false;
    #lenghtShip = 0;
    #type;
    #positions = [];
    #spaceAround = [];

    constructor(lenght = this.#randomLength()) {
        this.#lenghtShip = lenght;
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
        return this.#type;
    }

    #randomLength() {
        const MIN = 1;
        const MAX = 5;
        return Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
    }
    setSpaceAround(listPointsAround) {
        this.#spaceAround = listPointsAround;
    }
    getSpaceAround() {
        return this.#spaceAround;
    }

    setPosition(listOfPositions) {
        this.#positions = listOfPositions;
    }

    getPositions() {
        return this.#positions;
    }
    getClass() {
        const regex = /,/g
        return (this.getType() + "_" + this.getPositions().toString().replace(regex, "_")).replace(" ", "_")
    }

    hit() {
        if (!this.getSunk()) {
            this.#hitsRecived += 1;
        }
        this.#setSunk();
    }

    #setSunk() {
        if (this.#hitsRecived >= this.#lenghtShip) {
            this.#sunk = true;
        }
        return this.#sunk
    }

    #setType() {
        switch (this.#lenghtShip) {
            case 1:
                this.#type = "boat"
                break;
            case 2:
                this.#type = "PatrolBoat"
                break
            case 3:
                this.#type = "Submarine"
                break
            case 4:
                this.#type = "Destroyer"
                break
            default:
                this.#type = "Carrier"
                break;
        }
    }
}

export { Ship }
// module.exports = Ship;