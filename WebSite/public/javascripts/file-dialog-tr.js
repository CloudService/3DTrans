
var openDialog = function(files){
	var dia = new component.ui.fileDialog.dialog()
	dia.init("box", "root"); 		
	dia.appendFiles("root", files);
	//dia.updateFileNavigator([{"name":"box2", "id":""}, {"name":"web", "id":""}])
}