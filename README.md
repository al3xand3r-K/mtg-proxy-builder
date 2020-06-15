## MTG Proxy Builder

A tool for building ready-to-print spreadsheets of MTG cards proxies.

(A russian version of README is [here](./README__russian.md))

### A couple of things to note:
  - I didn't test it on Windows, so I have no idea whether it works under it or not. However it works fine on MacOS and Linux. If you're on windows, I'd suggest to try using [Windows Linux Subsystem](https://docs.microsoft.com/en-us/windows/wsl/install-win10).
  - Images are stored in 1045x750, in .png
  - The latest version of card released will be downloaded to make sure you get the image in the highest resolution available. Means, if you want an alpha Black Lotus - you won't get it, even if it's 1045x750.
  If the card is really old, you'll get the image anyway, but it will have a lower resolution.
  - The card is skipped if it's name is not recognized. To make sure you won't miss what's left out, card names of those cards are printed out in the console once download is finished.
  - The most possible cardlist export formats (such as those used by MTGGoldfish, TappedOut, etc., or just a regular plain text) are supported. However, there might be issues with the cardlist parsing if you feed it a less common format.
  - Flip cards are supported.
  - Since high resolution images are available only in english, other languages are not supported.
  - Quantity of each card in the cardlist is ignored. Means, you'll get only 1 instance of each card in the printable spreadsheet. I initially needed this for cube proxies, so there was no reason for me to implement this. However, I might do it later.
  
### How to run

#### Preconditions
Since it's a node.js application, you will have to install `node.js` and `npm` (or `yarn`) to be able to use this tool. There's no specific version requirements, just make sure it's not an extremely old one. I've used v12.x.x - worked fine for me.
Installation guides, as well as guides on "how to used node.js cli application", are easy to google.

#### Run
1. Form a list of cards you need proxies for, then copy and paste it into `__input/cardlist.txt`. Make sure that there's only one card name per line and all card names are in English.

2. Make sure that `__tmp` and `__output` dirs are empty before running. Either clean it up manually, or do this:
    ```
    yarn clean
    ```

3. Transpile ES6 code:
    ```
    yarn build
    ```

4. Pull card front images from Scryfall:
    ```
    yarn pull
    ```

5. Assemble spreadsheets:
    ```
    yarn assemble
    ```

6. Wait for the process to complete, then check the `__output` dir for the spreadsheets.

Alternatively, you can do `yarn start` so you won't need to type all these commands one by one.

#### TODO list:
  - tokens
  - sheets with multiple instances of a single card
  - config file, to make this tool more versatile
  - make an option to assemble all the flipside images on a separate sheet

Disclaimer: any materials produced by this tool should not be used for sale or counterfeit.