var request = require('request');
var fs = require('fs');

var GITHUB_USER = 'cwkosman';
var GITHUB_TOKEN = 'c29cfb18893c4c4b647d69cba86ce90b6975bdcc';

console.log('Welcome to the Github Avatar Downloader!');

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath))
    .on('finish', function () {
      console.log('Download complete!');
    });
}

function callback (err, response, body) {
  if (err) { throw err; }
  var contributors = JSON.parse(body);
  //TODO : Loop over all pages of reponse - by default GitHub returns 30 per page
  //var pageArray = response.headers.link.split(',');
  //var pageNumberMatch = /page=(.*?)>/g;
  //var pageNumber = pageNumberMatch.exec(pageArray[1])[1];
  //console.log(pageNumber);
  contributors.forEach((contributor) => {
    //TODO - Get file extension of avatar as saved on Github, rather than appending .jpg
    var filePath = `./avatars/${contributor.login}.jpg`;
    downloadImageByURL(contributor.avatar_url, filePath);
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

getRepoContributors(process.argv[2], process.argv[3], callback);
