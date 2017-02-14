var request = require('request');
var fs = require('fs');

var GITHUB_USER = 'cwkosman';

console.log('Welcome to the Github Avatar Downloader!');

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath))
    .on('finish', function () {
      console.log(`Downloaded ${filePath}`);
    });
}

function callback (err, response, body) {
  if (!err && response.statusCode === 200) {
    var contributors = JSON.parse(body);
    //TODO : Loop over all pages of reponse - by default GitHub returns 30 per page
    //var pageArray = response.headers.link.split(',');
    //var pageNumberMatch = /page=(.*?)>/g;
    //var pageNumber = pageNumberMatch.exec(pageArray[1])[1];
    //console.log(pageNumber);
    contributors.forEach((contributor) => {
      //TODO - Get file extension of avatar as saved on Github, rather than appending .jpg
      //'login' and 'avatar_url' are keys on the returned GitHub API objects.
      downloadImageByURL(contributor.avatar_url, `./avatars/${contributor.login}.jpg`);
    });
  } else if (err) {
    throw (err);
  }
}

function getRepoContributors(repoOwner, repoName, cb) {
  if (!repoOwner || !repoName) {
    console.log("Input both a repository owner and repository name, e.g., node download_avatars.js jquery jquery");
    return;
  }
  var requestOptions = {
    url: 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    //Required for authentication to GitHub API, specified here as username
    //https://developer.github.com/v3/#user-agent-required
    headers: {
      'User-Agent': 'cwkosman'
    }
  };
  request(requestOptions, cb);
}

getRepoContributors(process.argv[2], process.argv[3], callback);
