
var openDialog = function(files, onCloseCallback){
	var dia = new component.ui.fileDialog.dialog()
	dia.init("box", "root"); 		
	dia.appendFiles("root", files);
	dia.bind("dialogclose", onCloseCallback)
}