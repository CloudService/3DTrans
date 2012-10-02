var express = require('express')
  , everyauth = require('everyauth')
  , conf = require('./conf')
  , everyauthRoot = __dirname + '/..';

everyauth.debug = true;

var usersById = {};
var nextUserId = 0;

function addUser (source, sourceUser) {
  var user;
  if (arguments.length === 1) { // password-based
    user = sourceUser = source;
    user.id = ++nextUserId;
    return usersById[nextUserId] = user;
  } else { // non-password-based
    user = usersById[++nextUserId] = {id: nextUserId};
    user[source] = sourceUser;
  }
  return user;
}

var usersByVimeoId = {};
var usersByJustintvId = {};
var usersBy37signalsId = {};
var usersByTumblrName = {};
var usersByDropboxId = {};
var usersByFbId = {};
var usersByTwitId = {};
var usersByGhId = {};
var usersByInstagramId = {};
var usersByFoursquareId = {};
var usersByGowallaId = {};
var usersByLinkedinId = {};
var usersByGoogleId = {};
var usersByAngelListId = {};
var usersByYahooId = {};
var usersByGoogleHybridId = {};
var usersByReadabilityId = {};
var usersByBoxId = {};
var usersByOpenId = {};
var usersByDwollaId = {};
var usersByVkId = {};
var usersBySkyrockId = {};
var usersByEvernoteId = {};
var usersByAzureAcs = {};
var usersByTripIt = {};
var usersBy500pxId = {};
var usersBySoundCloudId = {};
var usersByMailchimpId = {};
var usersMailruId = {};
var usersByMendeleyId = {};
var usersByLogin = {
  'brian@example.com': addUser({ login: 'brian@example.com', password: 'password'})
};

everyauth.everymodule
  .findUserById( function (id, callback) {
    callback(null, usersById[id]);
  });


everyauth.box
  .apiKey(conf.box.apiKey)
  .findOrCreateUser( function (sess, authToken, boxUser) {
    return usersByBoxId[boxUser.user_id] ||
      (usersByDropboxId[boxUser.user_id] = addUser('box', boxUser));
  })
  .redirectPath('/');


var app = express();
app.use(express.static(__dirname + '/public'))
  .use(express.bodyParser())
  .use(express.cookieParser('htuayreve'))
  .use(express.session())
  .use(everyauth.middleware(app));

app.get('/debug', function (req, res) {
  res.send(__dirname);
});

app.listen(3000);

console.log('Go to http://local.host:3000');

module.exports = app;
