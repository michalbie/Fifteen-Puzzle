const createTimer = (boardCells) => {
    deleteOldTimer();
    
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
    let updateCurrentTime = setInterval(() => {
        updateTimer(startTime, timeFields, boardCells);
    }, 10)
}

const updateTimer = (startTime, timeFields, boardCells) => {
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

    checkWinConditions(boardCells);
}


const checkWinConditions = (boardCells) => {
    //DODAJ WIN CONDITIONS
}

export { createTimer };