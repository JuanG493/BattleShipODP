
import { Ship } from "./ship";
import { dockyard } from "./gameBoard";
// 1	Carrier	5
// 2	Battleship	4
// 3	Destroyer	3
// 4	Submarine	3
// 5	Patrol Boat	2


describe("ship construction", () => {

    test('a new ship instance', () => {
        let smallBoat = new Ship(2)
        smallBoat.hit();
        smallBoat.hit();
        // smallBoat.hit();


        expect(smallBoat.lenghtShip).toBe(2);
        // expect(smallBoat.hitsRecived).toBe(2);
        expect(smallBoat.isSunk()).toBeTruthy();
        // expect(smallBoat.isSunk()).toBeFalsy();

    })


})

describe("Game board Test of constructions", () => {

    test("boar area construction", () => {

        let area = dockyard();
        expect(area).toHaveLength(10);
        expect(area[0]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    })

    import { sum } from "./ship";

    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);

        import { Ship } from "./ship";
        import { dockyard } from "./gameBoard";
        // 1	Carrier	5
        // 2	Battleship	4
        // 3	Destroyer	3
        // 4	Submarine	3
        // 5	Patrol Boat	2


        describe("ship construction", () => {

            test('a new ship instance', () => {
                let smallBoat = new Ship(2)
                smallBoat.hit();
                smallBoat.hit();
                // smallBoat.hit();


                expect(smallBoat.lenghtShip).toBe(2);
                // expect(smallBoat.hitsRecived).toBe(2);
                expect(smallBoat.isSunk()).toBeTruthy();
                // expect(smallBoat.isSunk()).toBeFalsy();

            })


        })

        describe("Game board Test of constructions", () => {

            test("boar area construction", () => {

                let area = dockyard();
                expect(area).toHaveLength(10);
                expect(area[0]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            })
        })