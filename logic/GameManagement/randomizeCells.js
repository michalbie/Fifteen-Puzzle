import { updateNextToBlankProperty, swapCells } from "./boardManager.js";
import { createTimer } from "./gameManager.js";

const shufflesNumber = 2;
const shuffleTime = 20;

const shuffleCells = (boardCells, blankCell, initNeighbors) => {
	let blank = blankCell;
	let neighbors = initNeighbors;
	let iter = 0;
	let previousNeighbor = { div: null };

	const doOneShuffle = () => {
		let randomIndex = Math.round(Math.random() * (neighbors.length - 1));

		while (neighbors[randomIndex].div == previousNeighbor.div) {
			randomIndex = Math.round(Math.random() * (neighbors.length - 1));
		}

		let randomNeighbor = neighbors[randomIndex];
		previousNeighbor = neighbors[randomIndex];
		blank = swapCells(blank, randomNeighbor, false);
		neighbors = updateNextToBlankProperty(boardCells);
		iter++;

		if (iter < shufflesNumber) {
			setTimeout(doOneShuffle, shuffleTime);
		} else {
			createTimer(boardCells);
		}
	};

	doOneShuffle();
};

export { shuffleCells };
