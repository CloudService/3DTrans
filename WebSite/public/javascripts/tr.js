
$(document).ready(function(){
	$("#start-button").button();
	$("#start-button").click( function(e){
		alert("Welcome to use the free translation service. We are working in progress!");
	});
	
	var messageSolver = actionMessage.getMessageSolver(); 
	messageSolver.register("translator", new service.trans.translator());
	
	// Check the action message from the parent.
	
	var astring = parent.getAction();
	if(astring && astring != "")
		messageSolver.evaluate(astring);
	
   $("#box").click(function(event){
	
     parent.location.href='/auth/box';
   });
   
	var showWipMessage = function(){
		alert("The box storage provider is supported. The support for your selection is working in progress. ^_^");
	}
    $("#dropbox").click(function(event){
     showWipMessage();
   });
   $("#baidu").click(function(event){
     showWipMessage();
   });
   $("#a360").click(function(event){
     showWipMessage();
   });
   $("#qq").click(function(event){
     showWipMessage();
   });
   
 });
 
var service = service || {};
service.trans = service.trans || {};

service.trans.translator = function (){
	this.openFileDialog = function(data){
		openDialog();
	}
}