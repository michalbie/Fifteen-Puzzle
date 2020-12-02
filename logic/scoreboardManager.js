import { hideSidebar } from "./Layout/layoutManager.js"
import { millisecondsToNormalFormat } from "./GameManagement/gameManager.js"

const handleNickSubmit = (nick, achievedTime, gridSize) => {
    let cookies = document.cookie;
    let exists = checkIfExists(nick, cookies, gridSize)

    if(exists == false){
        saveRecord(nick, achievedTime, gridSize);
        document.querySelector(".overlay").remove()
    } else {
        alert(`Provided nick already exists in ${gridSize}x${gridSize} grid scoreboard!`)
    }
}

const checkIfExists = (nick, cookies, gridSize) => {
    let i = 0
    while(cookies.split(" ")[i]){
        let n = cookies.split(" ")[i].split("=")[0]
        if(nick == n){
            let scoreGrid = cookies.split(" ")[i].split("=")[1].split("-")[1]
            if(gridSize == scoreGrid){
                return true;
            }
        }
        i++
    }

    return false;
}

const saveRecord = (nick, achievedTime, gridSize) => {
    let parseNick = nick.replaceAll(" ", "_")
    document.cookie = `${parseNick}=${achievedTime}-${gridSize};secure;`;
}

const showScoreboard = () => {
    hideSidebar();
    createScoreboard();
    let allScores = loadScores();
    let sortedScores = sortScores(allScores);
    createScoresEntries(sortedScores, 3);

    let scoreboard = document.querySelector(".scoreboard-wrapper")
    setTimeout(() => {
        scoreboard.style.top = 0;
    }, 100)
}

const createScoreboard = () => {
    let template = document.querySelector("#overlay-scoreboard-template");
    let clone = template.content.cloneNode(true);
    document.body.appendChild(clone);
    
    let scoreboard = document.querySelector(".scoreboard-wrapper")
    let transitionTime = getComputedStyle(scoreboard).transitionDuration.split("s")[0];

    let closeButton = scoreboard.querySelector(".close-menu-btn")
    closeButton.addEventListener("mousedown", () => {
        scoreboard.style.top = -1000 + "px";

        setTimeout(() => {
            document.querySelector(".overlay").remove();
        }, transitionTime * 1000)
    })

    let select = scoreboard.querySelector("#grid-score-select");
    select.addEventListener("change", (event) => {
        removeScoresEntries();
        let allScores = loadScores();
        let sortedScores = sortScores(allScores);
        createScoresEntries(sortedScores, event.target.value);
    })

}



const loadScores = () => {
    let allScores = {
        3: [],
        4: [],
        5: [],
        6: []
    }

    let index = 0;
    while(document.cookie.split(" ")[index]){
        let score = document.cookie.split(" ")[index].split("=")[1].split("-")[0]
        let nickname = document.cookie.split(" ")[index].split("=")[0].replaceAll("_", " ")
        let gridSize = document.cookie.split(" ")[index].split("=")[1].split("-")[1].replace(";", "")
        var scoreTime = new Date();
        scoreTime.setTime(score);   

        allScores[gridSize].push([nickname, score])
        index++
    }

    return allScores;
}

const sortScores = (allScores) => {
    for(let key of Object.keys(allScores)){
        allScores[key].sort(function(a, b){return a[1]-b[1]})
    }
    return allScores;
}

const createScoresEntries = (scoresList, gridSize) => {
    let scoresWrapper = document.querySelector(".scores-wrapper")
    let limit = scoresList[gridSize].length < 10 ? scoresList[gridSize].length : 10

    for(let i = 0; i < limit; i++){
        let entryWrapper = document.createElement("div")
        entryWrapper.setAttribute("class", "score-wrapper")
        if(i == 0){
            entryWrapper.style.borderColor = "gold";
        } else if (i == 1) {
            entryWrapper.style.borderColor = "silver";
        } else if (i == 2) {
            entryWrapper.style.borderColor = "#cd7f32";
        }
        let entryKey = document.createElement("p")
        let entryValue = document.createElement("p")
        let scoreToTime = new Date();
        scoreToTime.setTime(scoresList[gridSize][i][1])
        let timeFormat = millisecondsToNormalFormat(scoreToTime)
        
        entryKey.innerHTML = `${i+1}. ${scoresList[gridSize][i][0]}`
        entryValue.innerHTML = `${timeFormat}`

        entryWrapper.appendChild(entryKey)
        entryWrapper.appendChild(entryValue)
        scoresWrapper.appendChild(entryWrapper)
    }
}

const removeScoresEntries = () => {
    document.querySelector(".scores-wrapper").innerHTML = "";
}

export { handleNickSubmit, showScoreboard };