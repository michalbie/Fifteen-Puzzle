import { updateNextToBlankProperty, swapCells } from "./boardManager.js"

const shufflesNumber = 50;
const shuffleTime = 20;

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

        if(iter < shufflesNumber){
            setTimeout(doOneShuffle, shuffleTime)
        } 
    }

    doOneShuffle()
}

export { shuffleCells };