const rimraf = require('rimraf');
const prompt = require('prompt');

const tmpDirPath = '__tmp';
const outputDirPath = '__output';

const question = `All contents of "${tmpDirPath}" and "${outputDirPath}" will be cleaned. ('Y' - to confirm, 'n' - to skip)\n[Y/n]?`;

prompt.start();
prompt.get([{
    name: question,
    required: true,
    conform: function (value) {
        return value === 'Y' || value === 'n';
    },
    message: "Invalid input. Answer 'Y' or 'n'"
}], function(err, result) {
    if (err) throw err;

    if (result[question] === 'Y') {
        rimraf(`${tmpDirPath}/*`, function() { console.log(`"${tmpDirPath}" is cleaned.`) });
        rimraf(`${outputDirPath}/*`, function() { console.log(`"${outputDirPath}" is cleaned.`) });
    } else {
        console.log('Clean aborted.');
    }
});
