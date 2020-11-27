import * as initializer from "./GameManagement/prepareGame.js"
import { prepareSidebar } from "./Layout/layoutManager.js"

var boardCells = {
    0: {
        div: null,
        blank: null,
        nextToBlank: false
    } 
};

initializer.prepareElements(boardCells);