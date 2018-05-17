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



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
  .then(function(user) {
    console.log(user);
    return promisification.getGitHubProfileAsync(user)
  }).then(function(body) {
    console.log(body);
    var obj = JSON.stringify(body);
    return fs.writeFile(writeFilePath, obj, 'utf8', function(err, res) {
      if (err) console.log(err)
    })
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