import { handleNickSubmit } from "../scoreboardManager.js";

const createTimer = (boardCells) => {
	deleteOldTimer();

	for (let i = 0; i < 12; i++) {
		let img = document.createElement("img");
		img.setAttribute("class", "timer-digit-img");

		if (i == 2 || i == 5) {
			img.src = `assets/digits/colon.png`;
		} else if (i == 8) {
			img.src = `assets/digits/dot.png`;
		} else {
			img.src = `assets/digits/c0.png`;
		}

		document.getElementById("timer-wrapper").appendChild(img);
	}

	let fields = document.getElementById("timer-wrapper").querySelectorAll("img");
	var timeFields = {
		hours: [fields[0], fields[1]],
		minutes: [fields[3], fields[4]],
		seconds: [fields[6], fields[7]],
		milliseconds: [fields[9], fields[10], fields[11], fields[12]],
	};

	startTimer(timeFields, boardCells);
};

const deleteOldTimer = () => {
	let oldDigits = document.querySelectorAll(".timer-digit-img");
	for (let oldDigit of oldDigits) {
		oldDigit.remove();
	}
};

const startTimer = (timeFields, boardCells) => {
	let startTime = new Date();
	let timeDifference = null;

	let updateTimeInterval = setInterval(() => {
		timeDifference = updateTime(startTime, boardCells, updateTimeInterval, updateTimerInterval, timeFields);
	}, 1);
	let updateTimerInterval = setInterval(() => {
		updateTimer(timeFields, timeDifference);
	}, 15);
};

const updateTime = (startTime, boardCells, updateTimeInterval, updateTimerInterval, timeFields) => {
	let currentTime = new Date();
	let timeDifference = new Date();
	timeDifference.setTime(currentTime.getTime() - startTime.getTime());

	let won = checkWinConditions(boardCells);
	if (won) {
		clearInterval(updateTimeInterval);
		clearInterval(updateTimerInterval);
		updateTimer(timeFields, timeDifference) //to equalize results
		showWinInfo(timeDifference);
	}

	return timeDifference;
}

const updateTimer = (timeFields, timeDifference) => {
	let absoluteTime = new Date();
	absoluteTime.setTime(timeDifference.getTime() + timeDifference.getTimezoneOffset() * 60 * 1000);

	const updateHours = (timeDifference) => {
		let hours = timeDifference.getHours();
		let string = hours.toString();
		string = string.padStart(2, 0);

		timeFields["hours"][0].src = `assets/digits/c${string[0]}.png`;
		timeFields["hours"][1].src = `assets/digits/c${string[1]}.png`;
	};

	const updateMinutes = (timeDifference) => {
		let minutes = timeDifference.getMinutes();
		let string = minutes.toString();
		string = string.padStart(2, 0);

		timeFields["minutes"][0].src = `assets/digits/c${string[0]}.png`;
		timeFields["minutes"][1].src = `assets/digits/c${string[1]}.png`;
	};

	const updateSeconds = (timeDifference) => {
		let seconds = timeDifference.getSeconds();
		let string = seconds.toString();
		string = string.padStart(2, 0);

		timeFields["seconds"][0].src = `assets/digits/c${string[0]}.png`;
		timeFields["seconds"][1].src = `assets/digits/c${string[1]}.png`;
	};

	const updateMilliseconds = (timeDifference) => {
		let milliseconds = timeDifference.getMilliseconds();
		let string = milliseconds.toString();
		string = string.padStart(3, 0);

		timeFields["milliseconds"][0].src = `assets/digits/c${string[0]}.png`;
		timeFields["milliseconds"][1].src = `assets/digits/c${string[1]}.png`;
		timeFields["milliseconds"][2].src = `assets/digits/c${string[2]}.png`;
	};

	updateHours(absoluteTime);
	updateMinutes(absoluteTime);
	updateSeconds(absoluteTime);
	updateMilliseconds(absoluteTime);
};

const checkWinConditions = (boardCells) => {
	let divs = document.querySelectorAll(".cell");
	for (let index in boardCells) {
		if (boardCells[index]["div"] != divs[index]) {
			return false;
		}
	}
	return true;
};

const showWinInfo = (time) => {
	let template = document.querySelector("#overlay-info-template");
	let clone = template.content.cloneNode(true);

	let achievedTime = millisecondsToNormalFormat(time);
	clone.querySelector(".info").innerHTML = `You won! Your time is: ${achievedTime}`;
    document.body.appendChild(clone);

    let infoWrapper = document.querySelector(".info-wrapper");
    
    document.querySelector(".info-wrapper .close-menu-btn").addEventListener("mousedown", () => {
        removeInfo(infoWrapper, "bottom", 1000)
    })

    document.querySelector(".overlay").addEventListener("mousedown", (e) => {
        if(e.target == document.querySelector(".overlay")){
            removeInfo(infoWrapper, "bottom", 1000)
        }
    })

    setTimeout(() => {
		infoWrapper.style.bottom = 0;
	}, 100);

	const form = document.getElementById("enter-nick-form");
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		let gridSize = Math.sqrt(document.querySelectorAll(".cell").length);
		handleNickSubmit(document.querySelector("#nick-input").value, time.getTime(), gridSize);
	});
};

const removeInfo = (infoWrapper, animationProperty, propertyValue) => {
    let transitionTime = getComputedStyle(infoWrapper).transitionDuration.split("s")[0]
    infoWrapper.style[animationProperty] = propertyValue + "px";

    setTimeout(() => {
        document.querySelector(".overlay").remove();
    }, transitionTime * 1000);
}

const millisecondsToNormalFormat = (milliseconds) => {
	let absoluteTime = new Date();
	absoluteTime.setTime(milliseconds.getTime() + milliseconds.getTimezoneOffset() * 60 * 1000);
	let format = absoluteTime.getHours().toString().padStart(2, 0) + ":" + 
		absoluteTime.getMinutes().toString().padStart(2, 0) + ":" + 
		absoluteTime.getSeconds().toString().padStart(2, 0) + "." + 
		absoluteTime.getMilliseconds().toString().padStart(3, 0);
	return format;
};

export { createTimer, millisecondsToNormalFormat, removeInfo };
