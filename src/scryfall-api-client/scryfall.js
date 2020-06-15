import HttpClient from "./httpClient";

export default class Scryfall {
    constructor() {
        this.http = new HttpClient("https://api.scryfall.com");
    }

    search(query) {
        let encodedQuery = query.indexOf(" ") > 0 ? encodeURI(query) : query;
        return this.http.get(`/cards/search?=${encodedQuery}`);
    }

    getCard(name) {
        let encodedName = name.indexOf(" ") > 0 ? encodeURI(name) : name;
        return this.http.get( `/cards/named?fuzzy=${encodedName}` );
    }

    async getImage(imageURI, filename) {
        return this.http.getImage(imageURI, filename.split(" ").join("-").toLowerCase());
    }
}