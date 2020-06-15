import request from 'superagent';
import fs from 'fs';

function isRelative(path) {
    return !(path.indexOf('http://') > -1 || path.indexOf('https://') > -1);
}

export default class HttpClient {
    constructor(baseURI) {
        this.baseURI = baseURI;
    }

    get(path) {
        if (isRelative(path))
            path = `${this.baseURI}${path}`;
        return request.get(path)
            .ok(res => res.status < 500)
    }

    getImage(path, filename) {
        if (isRelative(path))
            path = `${this.baseURI}${path}`;
        return request.get(path)
            .pipe(fs.createWriteStream(`__tmp/${filename}.png`));
    }
}