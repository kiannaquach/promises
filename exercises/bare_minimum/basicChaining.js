/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var promisification = require('./promisification');
var promiseConstructor = require('./promiseConstructor');
var Promise = require('bluebird');
var writeFile = Promise.promisify(fs.writeFile);


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
  .then(promisification.getGitHubProfileAsync
  ).then(function(body) {
    var obj = JSON.stringify(body)
    return writeFile(writeFilePath, obj)
  })
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};

// module.exports = {
//   getGitHubProfileAsync: getGitHubProfileAsync,
//   generateRandomTokenAsync: generateRandomTokenAsync,
//   readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
// };