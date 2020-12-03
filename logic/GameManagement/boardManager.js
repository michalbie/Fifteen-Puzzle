var isSwapping = false;

const updateNextToBlankProperty = (boardCells) => {
	for (let cell in boardCells) {
		if (boardCells[cell].blank == true) {
			let neighborsList = updateNeighbors(boardCells, cell);
			return neighborsList;
		}
	}
};

const updateNeighbors = (boardCells, blankCell) => {
	const resetNeighbors = () => {
		for (let cell in boardCells) {
			boardCells[cell]["nextToBlank"] = false;
		}
	};

	resetNeighbors();
	let cellCords = boardCells[blankCell].cords;
	let listOfNeighborsCords = [
		{ x: cellCords.x - 1, y: cellCords.y },
		{ x: cellCords.x + 1, y: cellCords.y },
		{ x: cellCords.x, y: cellCords.y - 1 },
		{ x: cellCords.x, y: cellCords.y + 1 },
	];
	let neighborsList = [];

	for (let cords of listOfNeighborsCords) {
		for (let cell in boardCells) {
			if (boardCells[cell].cords.x == cords.x && boardCells[cell].cords.y == cords.y) {
				boardCells[cell]["nextToBlank"] = true;
				neighborsList.push(boardCells[cell]);
			} else if (boardCells[cell]["nextToBlank"] != true) {
				boardCells[cell].nextToBlank = false;
			}
		}
	}

	return neighborsList;
};

const getBlankCell = (boardCells) => {
	for (let cell in boardCells) {
		if (boardCells[cell]["blank"] == true) {
			return boardCells[cell];
		}
	}
};

const swapCells = (blank, cell2, withAnimation) => {
	const playSwapAnimation = (blank, cell2) => {
		let swapTransition = getComputedStyle(document.querySelector(".cell")).transition

		cell2["div"].style.transition = swapTransition;
		let targetLeft = blank["div"].offsetLeft - cell2["div"].offsetLeft;
		let targetTop = blank["div"].offsetTop - cell2["div"].offsetTop;

		cell2["div"].style.left = targetLeft + "px";
		cell2["div"].style.top = targetTop + "px";
	};

	const swapProperties = (blank, cell2) => {
		blank["div"].querySelector("img").style.display = "block";

		cell2["div"].style.transition = "0s";
		cell2["div"].style.left = 0 + "px";
		cell2["div"].style.top = 0 + "px";

		let buffor = cell2["div"];
		cell2["div"] = blank["div"];
		blank["div"] = buffor;

		buffor = cell2["cords"];
		cell2["cords"] = blank["cords"];
		blank["cords"] = buffor;

		cell2["div"].querySelector("img").src = blank["div"].querySelector("img").src;
		blank["div"].querySelector("img").src = "";

		cell2["div"].querySelector("img").style.objectPosition = blank["div"].querySelector("img").style.objectPosition;
		blank["div"].querySelector("img").style.display = "none";

		return blank;
	};

	if (withAnimation == true) {
		playSwapAnimation(blank, cell2);
		const swap = new Promise((resolve, reject) => {
			let time = getComputedStyle(cell2["div"]).transitionDuration.split("s")[0];
			setTimeout(() => {
				let newBlank = swapProperties(blank, cell2);
				resolve(newBlank);
			}, time * 1000);
		});
		return swap;
	} else {
		let newBlank = swapProperties(blank, cell2);
		return newBlank;
	}
};

const trySwapCells = async (boardCells, cell) => {
	const matchDiv = (boardCells, div) => {
		for (let object in boardCells) {
			if (boardCells[object]["div"] == div) {
				return boardCells[object];
			}
		}
	};

	let boardCell = matchDiv(boardCells, cell);
	if (boardCell["nextToBlank"] == true && isSwapping == false) {
		isSwapping = true;
		let blankCell = getBlankCell(boardCells);
		let blank = await swapCells(blankCell, boardCell, true);
		updateNextToBlankProperty(boardCells);
		isSwapping = false;
	}
};

export { updateNextToBlankProperty, trySwapCells, swapCells };
