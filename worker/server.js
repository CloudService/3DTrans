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

var server = 'http://localhost:8081';

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