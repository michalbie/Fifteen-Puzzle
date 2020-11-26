import { updateNextToBlankProperty } from "./boardManager.js"

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const shuffleCells = (boardCells, blankCell, initNeighbors) => {
    let blank = blankCell
    let neighbors = initNeighbors
    let iter = 0
    let previousNeighbor = { div: null }

    const doOneShuffle = () => {
        let randomIndex = Math.round(Math.random() * (neighbors.length-1));
        while( neighbors[randomIndex].div == previousNeighbor.div ){
            randomIndex = Math.round(Math.random() * (neighbors.length-1));
        }
        let randomNeighbor = neighbors[randomIndex];
        previousNeighbor = neighbors[randomIndex];
        blank = swapCells(blank, randomNeighbor);
        neighbors = updateNextToBlankProperty(boardCells);
        iter++;

        if(iter < 120){
            setTimeout(doOneShuffle, 20)
        } 
    }

    doOneShuffle()
}

const swapCells = (blank, cell2) => {
    let buffor = cell2['div']
    cell2['div'] = blank['div']
    blank['div'] = buffor

    buffor = cell2['cords']
    cell2['cords'] = blank['cords']
    blank['cords'] = buffor

    cell2['div'].querySelector('img').src = blank['div'].querySelector('img').src
    blank['div'].querySelector('img').src = ""

    cell2['div'].querySelector('img').style.objectPosition = blank['div'].querySelector('img').style.objectPosition;

    return blank;
}

export { shuffleCells };