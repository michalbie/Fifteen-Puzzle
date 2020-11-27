import { handleNickSubmit } from "../scoreboardManager.js"

const createTimer = (boardCells) => {
    deleteOldTimer();
    console.log(boardCells, document.querySelectorAll(".cell"))
    
    for (let i=0; i<13; i++){
        let img = document.createElement("img")
        img.setAttribute("class", "timer-digit-img")

        if(i == 2 || i == 5) {
            img.src = `assets/digits/colon.gif`
        } else if(i == 8) {
            img.src = `assets/digits/dot.gif`
        } else {
            img.src = `assets/digits/c0.gif`
        }
        
        document.getElementById("timer-wrapper").appendChild(img);
    }

    let fields = document.getElementById("timer-wrapper").querySelectorAll("img")
    var timeFields = {
        hours: [fields[0], fields[1]],
        minutes: [fields[3], fields[4]],
        seconds: [fields[6], fields[7]],
        milliseconds: [fields[9], fields[10], fields[11], fields[12]]
    }

    startTimer(timeFields, boardCells);
}

const deleteOldTimer = () =>{
    let oldDigits = document.querySelectorAll(".timer-digit-img")
    for(let oldDigit of oldDigits){
        oldDigit.remove()
    }
}


const startTimer = (timeFields, boardCells) => {
    let startTime = new Date();
    let updateTimeInterval = setInterval(() => {
        updateTimer(startTime, timeFields, boardCells, updateTimeInterval);
    }, 10)
}

const updateTimer = (startTime, timeFields, boardCells, updateTimeInterval) => {
    let currentTime = new Date();
    let timeDifference = new Date();
    timeDifference.setTime(currentTime.getTime() - startTime.getTime())
    timeDifference.setHours(0)

    const updateHours = (timeDifference) => {
        let hours = timeDifference.getHours();
        let string = hours.toString()
        string = string.padStart(2, 0);

        timeFields['hours'][0].src = `assets/digits/c${string[0]}.gif`;
        timeFields['hours'][1].src = `assets/digits/c${string[1]}.gif`;
    }

    const updateMinutes = (timeDifference) => {
        let minutes = timeDifference.getMinutes();
        let string = minutes.toString()
        string = string.padStart(2, 0);

        timeFields['minutes'][0].src = `assets/digits/c${string[0]}.gif`;
        timeFields['minutes'][1].src = `assets/digits/c${string[1]}.gif`;
    }

    const updateSeconds = (timeDifference) => {
        let seconds = timeDifference.getSeconds();
        let string = seconds.toString()
        string = string.padStart(2, 0);

        timeFields['seconds'][0].src = `assets/digits/c${string[0]}.gif`;
        timeFields['seconds'][1].src = `assets/digits/c${string[1]}.gif`;
    }

    const updateMilliseconds = (timeDifference) => {
        let milliseconds = timeDifference.getMilliseconds();
        let string = milliseconds.toString()
        string = string.padStart(4, 0);

        timeFields['milliseconds'][0].src = `assets/digits/c${string[0]}.gif`;
        timeFields['milliseconds'][1].src = `assets/digits/c${string[1]}.gif`;
        timeFields['milliseconds'][2].src = `assets/digits/c${string[2]}.gif`;
        timeFields['milliseconds'][3].src = `assets/digits/c${string[3]}.gif`;
    }

    updateHours(timeDifference);
    updateMinutes(timeDifference);
    updateSeconds(timeDifference);
    updateMilliseconds(timeDifference);

    let won = checkWinConditions(boardCells);
    if(won){
        clearInterval(updateTimeInterval);
        showWinInfo(timeDifference)
    }
}


const checkWinConditions = (boardCells) => {
    let divs = document.querySelectorAll(".cell")
    for(let index in boardCells){
        if(boardCells[index]['div'] != divs[index]){
            return false;
        }
    }
    return true;
}

const showWinInfo = (time) => {
    let template = document.querySelector("#overlay-info-template");
    let clone = template.content.cloneNode(true);

    let achievedTime = time.getHours().toString().padStart(2, 0) + ':'
        + time.getMinutes().toString().padStart(2, 0) + ':'
        + time.getSeconds().toString().padStart(2, 0) + '.'
        + time.getMilliseconds().toString().padStart(4, 0)
    achievedTime.replace('\n', "")
    clone.querySelector(".info").innerHTML = `You won! Your time is: ${achievedTime}`;
    document.body.appendChild(clone);

    const form = document.getElementById("enter-nick-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let gridSize = Math.sqrt(document.querySelectorAll(".cell").length)
        handleNickSubmit(document.querySelector("#nick-input").value, achievedTime, gridSize);
    });

    //document.cookie = `nick2=${achievedTime}-4;secure;`;
}



export { createTimer };