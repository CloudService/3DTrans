
/**
 * Module dependencies.
 */
var express = require('express')
  , everyauth = require('everyauth')
  , conf = require('./lib/conf')
  , request = require('request');


// Configure everyauth
everyauth.debug = true;

var usersById = {};
var nextUserId = 0;

// This is called by the box.js to save the user
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

var usersByBoxId = {};

everyauth.everymodule
  .findUserById( function (id, callback) {
    callback(null, usersById[id]);
  });

everyauth.box
  .apiKey(conf.box.apiKey)
  .findOrCreateUser( function (sess, authToken, boxUser) {
    return usersByBoxId[boxUser.user_id] ||
      (usersByBoxId[boxUser.user_id] = addUser('box', boxUser));
  })
  .redirectPath('/');


// Configure express
var app = express();
app.use(express.static(__dirname + '/public'))
  .use(express.bodyParser())
  .use(express.cookieParser('htuayreve'))
  .use(express.session())
  .use(everyauth.middleware(app));

// Configurations
app.set('port', process.env.PORT || 3000); // Configure the listening port
app.set('views', __dirname + '/views'); // The folder for the views, such as .html. The folder is <website>/views/
app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

// routers
app.get('/', function(req, res, next){
	var amessage = "";
	
	var aobject = {
 		handler: "translator"
 		, action: "openFileDialog"
		, data: {id: "hello"}
		};
 				
 	amessage = JSON.stringify(aobject);
 			
   res.render('index'
   	, {
    	locals: { "amessage": amessage }
   	 });
   	 
   	 
});

app.get('/login', function (req, res)
{
    res.render('login');
});

app.listen(app.get('port'));
console.log('Listening on port ' + app.get('port'));