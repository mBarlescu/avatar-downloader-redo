var request = require('request');

function getRepoContributors(repoOwner, repoName, cb){
  let url = `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`
  request(url, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors()