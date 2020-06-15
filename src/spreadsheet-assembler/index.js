import { assembleSpreadsheets, buildImagesNameList } from "./spreadsheet-assembler";

(async() => {
    const imageList = await buildImagesNameList("__tmp");
    await assembleSpreadsheets( imageList, "__tmp", 3, 3 );
})();
