import fs from 'fs';
import Scryfall from "./src/scryfall-api-client/scryfall";
import { parseFileIntoArr } from "./src/list-parser/parser";
import { printFailedDownloads } from "./src/utils/utils";

const scryfall = new Scryfall();

// parse input card list
const parsedCardList = parseFileIntoArr();
let downloadedCards = [];
let cardsDownloadsCounter = 0;


/**
 * GET the card
 * └─> if GET card returned no errors
 *     |└─> extract image URIs
 *     |    └─> try single-image cards first
 *     |        └─> if fails ─> try multi-image cards, like Flips
 *     └─> print response code and error msg, then move to the next card
 */
(async () => {
    // remove fuzz files
    if (fs.existsSync('__tmp/.DS_Store')) fs.unlinkSync('__tmp/.DS_Store');

    for (let card of parsedCardList) {
        let imageURIs = [];

        let res = await scryfall.getCard(card);

        if (res.body.object !== "error") {
            try {
                imageURIs.push( res.body.image_uris.png );
            } catch (e) {
                res.body.card_faces.forEach(card_face => {
                    imageURIs.push( card_face.image_uris.png );
                });
            }

            let cardSideIdx = 1;
            for (let uri of imageURIs) {
                // let cardName = imageURIs.length > 1 ? `${card}-${cardSideIdx}` : `${card}`;
                let cardName = cardSideIdx === 2 ? `${card}__flipside` : card;
                let counterStep = imageURIs.length > 1 ? 0.5 : 1;

                await scryfall.getImage(uri, cardName);
                downloadedCards.push(card);     // record unedited card name. means, flip cards count as 1.
                cardsDownloadsCounter += counterStep;
                console.log(`[ ${cardsDownloadsCounter} / ${parsedCardList.length} ] "${cardName}" downloaded`);
                cardSideIdx ++;
            }
        } else {
            console.log(`${res.body.status}: ${res.body.details}`);
        }
    }

    await printFailedDownloads( parsedCardList, downloadedCards );
})();