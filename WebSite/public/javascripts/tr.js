
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
	
	var files = [];
	
	var fileList = data.files;
	var length = fileList.length;
	for(var i = 0; i < length; i++){
		var fileInfo = fileList[i];
		var file = new component.ui.fileDialog.fileObject();
		
		file.id = fileInfo.id;
		file.name = fileInfo.name;
		file.isFolder = fileInfo.isFolder;
		file.size = fileInfo.size;
		file.moddate = fileInfo.moddate;
		
		files.push(file);
	}
	
		openDialog(files, _onOK);
	}
	
	_onOK = function (event){
		var dialog = event.data.dialog;
		var selections = dialog.getSelections();
		if(selections.length > 0){
			var fileFullName = selections[0].fullName();
			$("#srcFile").val(fileFullName);
			
			var ext = $('input:radio[name=format]:checked').val();
			var destName = fileFullName + "." + ext;
			$("#destFile").val(destName);
		}
	}
}