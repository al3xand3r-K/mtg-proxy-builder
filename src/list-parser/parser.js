import fs from 'fs';
import { cleanUpLine } from "./line-cleaner";

export function parseFileIntoArr() {
    let parsedCardList = [];

    fs.readFileSync(`__input/cardlist.txt`, 'utf-8')
        .split(/\r?\n/)
        .forEach(function (line) {
            if (line.length > 0
                && line != "Deck" && line != "Sideboard") {
                const cardName = cleanUpLine(line);
                if (
                    cardName != "Plains" &&
                    cardName != "Mountain" &&
                    cardName != "Swamp" &&
                    cardName != "Island" &&
                    cardName != "Forest"
                ) {
                    parsedCardList.push(cardName)
                }
            }
        });

    console.log(`Number of cards parsed: ${parsedCardList.length}`);
    return parsedCardList;
}
