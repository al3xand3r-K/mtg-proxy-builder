import fs from 'fs';
import gm from 'gm';

const tmpDir = '__tmp';
const outputDir = '__output';
const blankImageName = 'blank.png';

const width = "745";
const height = "1040";

function addBlankSlots(imagesList, imagesPerRow, rowsPerSheet) {
    let finalizedImagesList = imagesList;

    const blankSlotsQty = imagesPerRow * rowsPerSheet - imagesList.length;
    if (blankSlotsQty > 0) {
        for (let i = 0; i < blankSlotsQty; i++) {
            finalizedImagesList.push( blankImageName );
        }
    }

    return finalizedImagesList;
}

function joinImages(imagesList, imagesDir, imagesPerRow, rowsPerSheet) {
    console.log('Joining images...');

    let rowIdx = 0;
    let columnIdx = 0;
    let sheet = gm();

    imagesList.forEach(imageName => {
        if (imageName !== blankImageName) {
            sheet =  sheet
                .in('-page', `+${width * columnIdx}+${height * rowIdx}`)
                .in(`${imagesDir}/${imageName}`);
        } else {
            sheet =  sheet
                .in('-page', `+${width * columnIdx}+${height * rowIdx}`)
                .in(blankImageName);
        }

        // update column and row indexes
        if (columnIdx === imagesPerRow - 1) rowIdx ++;
        columnIdx < imagesPerRow - 1 ? columnIdx ++ : columnIdx = 0;
    });

    return sheet;
}

function writeSpreadsheet(sheet, name) {
    console.log(`Writing sheets to file "${name}.png"...`);
    sheet.mosaic()  // Merges the images as a matrix
        .write(`${outputDir}/${name}.png`, err => {
            if (err) console.log(err);
        });
}

/**
 * Forms an array of all image file names contained in `__tmp`
 */
export function buildImagesNameList(dir) {
    let images = [];

    fs.readdirSync(dir).forEach(file => {
        images.push(file);
    });

    return images;
}



/**
 * `width` - images per row in a spreadsheet
 * `height` - rows per spreadsheet
 *
 * +---+---+---+
 * | 0 | 1 | 2 |
 * +---+---+---+
 * | 3 | 4 | 5 |
 * +---+---+---+
 * | 6 | 7 | 8 |
 * +---+---+---+
 */
export async function assembleSpreadsheets(imagesNameList, imagesDir, width, height) {
    let sheetIndex = 0;

    // break down a pile of cards into groups
    for (let i = 0; i < imagesNameList.length; i += width * height) {
        let sheet = [];

        // if it's the end of the images list - assemble leftovers
        if (imagesNameList.length - i < width * height ) {
            for (let j = 0; j < imagesNameList.length - i; j++) {
                await sheet.push(imagesNameList[i + j]);
            }
        } else {    // otherwise, assemble a complete 3x3 sheet
            for (let j = 0; j < width * height; j++) {
                await sheet.push(imagesNameList[i + j]);
            }
        }

        console.log(`Sheet #${sheetIndex}: ${JSON.stringify(sheet, null ,2)}`);

        // add blanks, if there are less then maximum cards per sheet
        const finalizedImagesList = addBlankSlots(sheet, width, height);

        // assemble a spreadsheet object
        const printable = await joinImages(finalizedImagesList, imagesDir, width, height);

        // write a spreadsheet to the `__output` dir
        await writeSpreadsheet(printable, `__print-${sheetIndex}`);
        sheetIndex ++;
    }
}
