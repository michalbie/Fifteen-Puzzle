import * as initializer from "./prepareGame.js"
import { prepareSidebar } from "./Layout/layoutManager.js"

var boardCells = {
    0: {
        div: null,
        blank: null,
        nextToBlank: false
    } 
};

prepareSidebar();
initializer.prepareElements(boardCells);