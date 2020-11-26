const updateNextToBlankProperty = (boardCells) => {
	for (let cell in boardCells) {
		if(boardCells[cell].blank == true){
            let neighborsList = updateNeighbors(boardCells, cell);
            return neighborsList;
        }	
	}
};

const updateNeighbors = (boardCells, blankCell) => {

    const resetNeighbors = () => {
        for (let cell in boardCells) {
            boardCells[cell]['nextToBlank'] = false;
        }
    }

    resetNeighbors();
    let cellCords = boardCells[blankCell].cords;
    let listOfNeighborsCords = [
        { x: cellCords.x - 1, y: cellCords.y },
        { x: cellCords.x + 1, y: cellCords.y },
        { x: cellCords.x, y: cellCords.y - 1 },
        { x: cellCords.x, y: cellCords.y + 1 },
    ];
    let neighborsList = []


    for(let cords of listOfNeighborsCords){
        for (let cell in boardCells) {
            if (boardCells[cell].cords.x == cords.x && boardCells[cell].cords.y == cords.y) {
                boardCells[cell]['nextToBlank'] = true;
                neighborsList.push(boardCells[cell]);
            } else if(boardCells[cell]['nextToBlank'] != true){
                boardCells[cell].nextToBlank = false;
            }
        }
    }

    return neighborsList;
};

const getBlankCell = (boardCells) => {
    for(let cell in boardCells){
        if(boardCells[cell]['blank'] == true){
            return boardCells[cell];
        }
    }
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


const trySwapCells = (boardCells, cell) => {
    const matchDiv = (boardCells, div) => {
        for(let object in boardCells){
            if (boardCells[object]['div'] == div) {
                return boardCells[object];
            }
        }
    }

    let boardCell = matchDiv(boardCells, cell)
    if(boardCell['nextToBlank'] == true){
        let blankCell = getBlankCell(boardCells);
        swapCells(blankCell, boardCell)
        updateNextToBlankProperty(boardCells)
    }
}

export { updateNextToBlankProperty, trySwapCells, swapCells };
