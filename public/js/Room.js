export default class Rooms {
    #id
    #numMembers
    #vacant
    #players
    constructor(id) {
        this.#id = id;
        this.#numMembers = 0;
        this.#vacant = true;
        this.#players = []
    }

    addMembers(pj) {
        if (this.#numMembers < 3) {
            this.#numMembers ++;
            this.#players.push(pj)
            this.setVacants()
        }
    }

    setVacants() {
        if (this.#numMembers == 2) {
            this.#vacant = false
        }
    }


}
export { Rooms } 