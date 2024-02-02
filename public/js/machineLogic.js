import { navHit, checkHit, positionBoard, drawPointOfAttack } from './index.js';

export async function playMachine(machineBoard, humanBoard) {
    let point;
    let wasHIt;
    let partialpoint
    do {
        //serch for a point around the last hit
        let prevElemts = machineBoard.getLastGooPositionOfAtk();
        //it is think that work after ther second iteration
        if (wasHIt || prevElemts[0] != undefined) {
            //while still good position take those
            if (prevElemts.length > 0) {
                partialpoint = machineBoard.board.getRandomInt(0, prevElemts.length - 1)
                point = prevElemts[partialpoint];
                machineBoard.removeAgoodPosition(point);
            } else {
                //surch for a good positions
                let around = serchNerbyPto(point, machineBoard.getMapPointAttk(), machineBoard);
                partialpoint = machineBoard.board.getRandomInt(0, around.length - 1)
                point = around[partialpoint]
                machineBoard.removeAgoodPosition(point);
            }
        } else {
            do {
                point = machineBoard.board.getRandomInt();
                // prevent to select a point that alredy was selectec - is a hash map
            } while (machineBoard.getMapPointAttk(point));
        }
        //select the point on the position board
        let div = positionBoard.querySelector(`div[data-value="${point}"]`)
        // to go a little slow
        await timeOut()
        drawPointOfAttack(positionBoard, point)
        wasHIt = await checkHit(point, machineBoard, humanBoard)
        if (wasHIt) {
            navHit(div)
            quitOusidePoints(point, machineBoard);
            //adding the new good point to the list of good points
            serchNerbyPto(point, machineBoard.getMapPointAttk(), machineBoard);
        }
        //save the point that was selected
        machineBoard.setMapPointsAttk(point)
        //clean the remain options for a point
        cleanGoodPositions(machineBoard, machineBoard.getLastGooPositionOfAtk())
    } while (wasHIt && humanBoard.totalPoints > 0);
}

function cleanGoodPositions(machineBoard, listPositiones) {
    for (const position of listPositiones) {
        if (machineBoard.getMapPointAttk(position)) {
            machineBoard.removeAgoodPosition(position)
        }
    }
}

function timeOut(ms = 2000) {
    return new Promise(resolve => setTimeout(resolve, ms))
}







//return a list of valid points around a point and add to the board those elemnts
function serchNerbyPto(pointStr, listPtosAttaked, machineBoard) {
    let partialPerimeter = []
    //the 4 points around
    let pointsAround = [
        pointStr - 1,
        pointStr + 1,
        pointStr - 10,
        pointStr + 10,
    ]
    let topesList = topes(pointStr)
    pointsAround.forEach(element => {
        if (listPtosAttaked[element] == undefined && !(topesList.includes(element))) {
            partialPerimeter.push(element)
        }
    });
    machineBoard.setLastGoodPositionsOfAtk(partialPerimeter);
    return partialPerimeter
}
//identify that the points are valid
function topes(pointStr) {
    let baseRow = Math.floor(pointStr / 10);
    let baseCol = pointStr % 10
    let topes = []
    if (baseCol == 9) {
        topes.push(...[pointStr + 1, (pointStr - 10) + 1, (pointStr + 10) + 1])
        // if the point is at the begining of the columns
    } if (baseCol == 0) {
        topes.push(...[pointStr - 1, (pointStr - 10) - 1, (pointStr + 10) - 1]);
    } if (baseRow == 0) {
        topes.push(...[pointStr - 10, (pointStr - 10) - 1, (pointStr - 10) + 1]);
    } if (baseRow == 9) {
        topes.push(...[pointStr + 10, (pointStr + 10) - 1, (pointStr + 10) + 1])
    }
    return topes
}

function quitOusidePoints(pointStr, machineBoard) {
    let topesList = topes(pointStr)
    let discountPoints = [
        (pointStr - 1) + 10,
        (pointStr - 1) - 10,
        (pointStr + 1) + 10,
        (pointStr + 1) - 10
    ]
    for (const pto of discountPoints) {
        if (!topesList.includes(pto)) {
            machineBoard.setMapPointsAttk(pto)
        }
    }
}