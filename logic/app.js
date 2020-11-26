import * as initializer from "./prepareGame.js"

var boardCells = {
    0: {
        div: null,
        blank: null,
        nextToBlank: false
    } 
};


initializer.prepareElements(boardCells)