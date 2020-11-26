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

export { updateNextToBlankProperty };
