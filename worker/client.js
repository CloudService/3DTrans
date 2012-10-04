var io = require('socket.io-client');

var server = 'http://localhost:8081';

socket = io.connect(server);

socket.on('connect', function () {
		console.log("Socket is connected to server: " + server); 
	});

socket.on('dispatchTask', function (data) {
		console.log("New task: ");
    	console.log(data);
  	});

socket.on('disconnect', function (data) {
		console.log("Socket is disconnected from server.");
  	});