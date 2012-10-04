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

var options = {};

socket = io.connect(server, options);

socket.on('connect', function () {
		logger.info("Socket is connected to server: " + server); 
	});
	
socket.on('connecting', function (transport_type) {
		logger.debug("connecting transport: " + transport_type); 
	});
	
socket.on('connect_failed', function () {
		logger.debug("connect_failed event is fired."); 
	});

socket.on('close', function () {
		logger.debug("close event is fired."); 
	});
	
socket.on('disconnect', function (data) {
		logger.info("Socket is disconnected from server.");
  	});

socket.on('reconnect', function (transport_type) {
		logger.debug("reconnect event is fired with transport : " + transport_type); 
	});
	
socket.on('reconnecting', function (transport_type) {
		logger.debug("reconnecting transport: " + transport_type); 
	});
	
socket.on('reconnect_failed', function () {
		logger.debug("reconnect_failed event is fired."); 
	});

// Listen for customer event.
socket.on('dispatchTask', function (t) {
		logger.info("==> New task <==");
    	logger.info(t);
    	
    	//var t = JSON.parse(data);
    	
    	downloadFile(t, function(){ 
    		doTranslation(t, function(){
    			uploadFile(t, function(){
    				sendMailNotification(t);
    				})
    			})
    		});
    	
  	});
  	
var downloadFile = function(t, cb){

	// ToDo download file from box
	
	logger.info("File [" + t["srcFileName"] + "] download completed.");
	cb();

}

var doTranslation = function(t, cb){

	logger.info("File [" + t["destFileName"] + "] translation completed.");
	cb();
}

var uploadFile = function(t, cb){
	logger.info("File [" + t["destFileName"] + "] upload completed.");
	cb();
}

var sendMailNotification = function(t){
	logger.info("Mail [" + t["email"] + "] notification completed.");

}