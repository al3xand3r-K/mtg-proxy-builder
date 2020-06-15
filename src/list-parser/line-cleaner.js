function isNumber(fragment) {
    return !isNaN(Number(fragment));
}

function isTrimable(char) {
    return isNumber(char) || char === "x" || char === " ";
}

function trimQtyMultipliers(line) {
    let firstChar = line.charAt(0);

    while (isTrimable(firstChar) && line.length > 0) {
        if (isTrimable( line.charAt(0) ) && line.substring(0, 4) != "1996") {
            line = line.substring(1);
            firstChar = line.charAt(0);
        } else {
            return line;
        }
    }

    return line;
}

// trim end line
function trimLineEndComma(line) {
    const lastChar = line.charAt(line.length - 1);

    if (lastChar == ",") {
        return line.substring(0, line.length - 1);
    } else {
        return line;
    }
}

function trimFlips(line) {
    const flipIdx = line.indexOf("  Flip");

    if (flipIdx > 0) {
        return line.substring(0, flipIdx);
    } else {
        return line;
    }
}

function trimPrintVariantCode(line) {
    const variantCodeIdx = line.indexOf(" (");

    if (variantCodeIdx > 0) {
        return line.substring(0, variantCodeIdx);
    } else {
        return line;
    }
}

function trimForwardSlashes(line) {
    const slashIdx = line.indexOf("/");

    if (slashIdx > 0) {
        return line.split('/').join('-');
    } else {
        return line;
    }
}

// removes all the fuzz off the card name
export function cleanUpLine(line) {
    let cleanedLine;

    cleanedLine = trimQtyMultipliers(line);
    cleanedLine = trimLineEndComma(cleanedLine);
    cleanedLine = trimFlips(cleanedLine);
    cleanedLine = trimPrintVariantCode(cleanedLine);
    cleanedLine = trimForwardSlashes(cleanedLine);

    return cleanedLine;
}
