export function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export function printFailedDownloads(parsed, downloaded) {
    let missing1 = downloaded.filter((o) => parsed.indexOf(o) === -1);
    let missing2 = parsed.filter((o) => downloaded.indexOf(o) === -1);

    const missing = missing1.concat(missing2);
    console.log(`parsed: ${parsed.length}`);
    console.log(`downloaded: ${downloaded.length}`);

    if (missing.length > 0) {
        console.log(`Failed to download the following cards:`);
        console.log(missing)
    } else {
        console.log('All cards were downloaded successfully.');
    }
}