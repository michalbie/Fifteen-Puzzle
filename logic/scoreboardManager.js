
const handleNickSubmit = (nick, achievedTime, gridSize) => {
    let cookies = document.cookie;
    let exists = checkIfExists(nick, cookies, gridSize)

    if(exists == false){
        saveRecord(nick, achievedTime, gridSize);
        document.querySelector(".overlay").remove()
    } else {
        alert(`Provided nick already exists in ${gridSize}x${gridSize} grid scoreboard!`)
    }
    

    //document.cookie.split(" ")[0].split("=")[0]
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
    document.cookie = `${nick}=${achievedTime}-${gridSize};secure;`;
}

export { handleNickSubmit };