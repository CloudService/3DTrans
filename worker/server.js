/**
 * Module dependencies.
 */
var io = require('socket.io-client');
var log4js = require('log4js');

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
// Configure socket.io
/**********************************************************************/

var build = process.env.BUILD || "production"; 

var serverConf = {
	"development": {"server": 'http://localhost:3000'}
	, "production": {"server": 'http://sw.ap01.aws.af.cm:80'}
};
var server = serverConf[build].server;

logger.info('BUILD=' + build + " (development/production) [Run 'BUILD=development node server.js' for local server.]");
logger.info("Trying to connect socket " + server);
socket = io.connect(server);

socket.on('connect', function () {
		logger.info("Socket is connected to server: " + server); 
	});

socket.on('dispatchTask', function (data) {
		logger.info("New task: ");
    	logger.info(data);
  	});

socket.on('disconnect', function (data) {
		logger.info("Socket is disconnected from server.");
  	});