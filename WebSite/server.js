
/**
 * Module dependencies.
 */
var express = require('express')
  , everyauth = require('everyauth')
  , request = require('request')
  , sio = require('socket.io');
var log4js = require('log4js');
var http = require('http');

/**********************************************************************/
// Configure logger
/**********************************************************************/

log4js.configure({
    appenders: [
        { type: "console" }
    ],
    replaceConsole: true
});

var logger = log4js.getLogger();

/**********************************************************************/
// Configure everyauth
/**********************************************************************/
everyauth.debug = true;
var build = process.env.BUILD || "production"; 
var conf = require('./lib/conf')[build];

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

/**********************************************************************/
// Configure express
/**********************************************************************/
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
	
	var auth = req.session.auth;
	var boxAuth = auth ? auth.box : null;
	if(boxAuth)
		renderWithFileDialog(req, res, next);
	else
   	 	renderDefaultPage(req, res, next);
   	 
   	function renderDefaultPage(req, res, next){
   	
		var amessage = "";
				
	   res.render('index'
		, {
			locals: { "amessage": amessage }
		 });
   	}
   	 
   	function renderWithFileDialog(req, res, next){
   	
		// Get root folder
		var url = 'https://www.box.com/api/2.0/folders/0';
		var apiKey = conf.box.apiKey;
		var access_token = req.session.auth.box.authToken;//"gymnnxkbxikj0jm6rz25cq4kwe8go808";
		var headers = {Authorization: "BoxAuth api_key=" + apiKey + "&auth_token=" + access_token};
	
		/*
		The format of the return value is like.
		"{
			"type": "folder",
			"id": "0",
			"sequence_id": null,
			"name": "AllFiles",
			"created_at": null,
			"modified_at": null,
			"description": null,
			"size": 0,
			"created_by": {
				"type": "user",
				"id": "185684932",
				"name": "transMr",
				"login": "3dcadtrans@gmail.com"
			},
			"modified_by": {
				"type": "user",
				"id": "185684932",
				"name": "transMr",
				"login": "3dcadtrans@gmail.com"
			},
			"owned_by": {
				"type": "user",
				"id": "185684932",
				"name": "transMr",
				"login": "3dcadtrans@gmail.com"
			},
			"shared_link": null,
			"parent": null,
			"item_status": "active",
			"item_collection": {
				"total_count": 2,
				"entries": [
					{
						"type": "folder",
						"id": "419345934",
						"sequence_id": "0",
						"name": "Web"
					},
					{
						"type": "folder",
						"id": "419345748",
						"sequence_id": "0",
						"name": "Robot"
					}
				]
			}
		}"
		*/
		request.get({url:url, headers:headers}, function (e, r, body) {	
			var boxFolderInfo = JSON.parse(body);
			var boxFileList = boxFolderInfo.item_collection.entries;
			
			var subFiles = [];
			var length = boxFileList.length;
			for(var i = 0; i < length; ++i){
				var entry = boxFileList[i];
				var file = {};
				file.name=entry.name;
				file.isFolder = entry.type === "folder" ? true : false;
				file.id = entry.id;
				file.size = "-"; // Todo get the correct value;
				file.moddate = "2012-10-4 9:45"; // Todo get the correct value;
				subFiles.push(file);
			}
			
			var aobject = {
				handler: "translator"
				, action: "openFileDialog"
				, data: {files: subFiles}
				};
						
			var amessage = JSON.stringify(aobject);
			logger.info(amessage);
					
		   res.render('index'
			, {
				locals: { "amessage": amessage }
			 });
		});
   		
   	
   	}
   	
   	 
   	 
});

app.get('/login', function (req, res)
{
    res.render('login');
});

  
/**********************************************************************/
// Configure http server.
/**********************************************************************/
var listeningPort = app.get('port');
var httpApp = http.createServer(app).listen(listeningPort);

/**********************************************************************/
// socket.io.  Listens on the same port as http
/**********************************************************************/
var io = sio.listen(httpApp);
io.set('log level', 1); // reduce logging
var workerSockets = [];
io.sockets.on('connection', function (socket) {
		workerSockets.push(socket);
		logger.info("New client is connected.");
		
  		socket.emit('dispatchTask', { hello: 'world' });
  		
  		socket.on('disconnect', function () {
  			logger.info("Client is disconnected.");
    		
    		var length = workerSockets.length;
    		for(var i = 0; i < length; i++){
    			if(workerSockets[i] == socket){
    				workerSockets.splice(i, 1);
    				break;
    			}
    		}
  		});
  		
	});
	
//**********************************************************************/
// Done! log the system information
/**********************************************************************/
logger.info('BUILD=' + build + " (development/production) [Run 'BUILD=development node server.js' for local server.]");
logger.info('Web site is listening on port ' + listeningPort);
logger.info('Socket is listening on port ' + listeningPort);