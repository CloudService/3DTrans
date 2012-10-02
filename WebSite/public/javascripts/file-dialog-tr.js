
var openDialog = function(){
	var dia = new component.ui.fileDialog.dialog()
	dia.init(); 
			
	var folder = new component.ui.fileDialog.fileObject();
	folder._name = "Folder 1";
	folder._isFolder = true;
	folder._size = "-";
	folder._moddate="2012-10-4 10:59";
			
	var file = new component.ui.fileDialog.fileObject();
	file._name = "File 1";
	file._isFolder = false;
	file._size = "30k";
	file._moddate="2012-10-4 10:59";
			
	var files = [folder, file];
			
	dia.appendFiles(files);
}