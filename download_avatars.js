var request = require('request');

var GITHUB_USER = 'cwkosman';
var GITHUB_TOKEN = 'c29cfb18893c4c4b647d69cba86ce90b6975bdcc';

console.log('Welcome to the Github Avatar Downloader!');

function callback (err, response, body) {
  if (err) { throw err; }
  console.log(response.statusCode);
  console.log(body);
}

function getRepoContributors(repoOwner, repoName, cb) {
  var requestOptions = {
    url: 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'cwkosman'
    }
  };
  request(requestOptions, cb);
  console.log(cb);
}

getRepoContributors("jquery", "jquery", callback);
