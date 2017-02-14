var request = require('request');

var GITHUB_USER = 'cwkosman';
var GITHUB_TOKEN = 'c29cfb18893c4c4b647d69cba86ce90b6975bdcc';

console.log('Welcome to the Github Avatar Downloader!');

function callback (err, response, body) {
  if (err) { throw err; }
  var contributors = JSON.parse(body);
  //TODO : Loop over all pages of reponse - by default GitHub returns 30 per page
  //var pageArray = response.headers.link.split(',');
  //var pageNumberMatch = /page=(.*?)>/g;
  //var pageNumber = pageNumberMatch.exec(pageArray[1])[1];
  //console.log(pageNumber);

  contributors.forEach((contributor) => {
    console.log(contributor.avatar_url);
  });
}

function getRepoContributors(repoOwner, repoName, cb) {
  var requestOptions = {
    url: 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'cwkosman'
    }
  };
  request(requestOptions, cb);
}

getRepoContributors("jquery", "jquery", callback);
