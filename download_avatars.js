let token = require('./secrets')
var request = require('request');
var fs = require('fs');

var myargs = process.argv.slice(2);

function getRepoContributors(repoOwner, repoName, cb){
  let options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request',
      authentication: token.GITHUB_TOKEN,
    }
  }
  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors(myargs[0], myargs[1], function(err, result) {
  let images = []
  console.log("Errors:", err);
  console.log("Result:", JSON.parse(result).map(function(each) {
    images.push(each.avatar_url)
    downloadImageByURL(each.avatar_url, `./avatars/${each.login}.jpg`)
  }));
  console.log('images', images)
});

function downloadImageByURL(url, filePath){
  request.get(url)               // Note 1
   .on('error', function (err) {                                   // Note 2
     throw err;
   })
   .on('response', function (response) {                           // Note 3
     console.log('Response Status Code: ', response.statusCode);
   })
   .pipe(fs.createWriteStream(filePath));
}