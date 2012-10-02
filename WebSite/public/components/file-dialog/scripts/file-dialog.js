	
var component = component || {};
component.ui = component.ui || {};
component.ui.fileDialog = component.ui.fileDialog || {};

/** Constructor
*/
component.ui.fileDialog.dialog = function (){

	/** @type {HTMLDivElement} the outmost div of the dialog*/
	_dialog = {};
	
	/** Constructor
	*@this {component.ui.fileDialog}
	*@api public
	*@return this for chain.
	*/
	this.init = function(){
		
		var dialogHtml = component.ui.fileDialog.template.filedialog();
		_dialog = $(dialogHtml);
		// Add to document
		$("body").append(_dialog);
		
		// Set the dialog options
		_dialog.dialog(
		{ 
			buttons: 
    		{
        		"Ok": function() { $(this).dialog("close"); } 
        		, "Cancel" : function() { $(this).dialog("close"); } 
    		}
    		, title: "Select file"
			, width: 800
			, height: 600
			, draggable: false
			, modal: true
			, resizable: false 
			, autoOpen: false
		});	

		
		_dialog.dialog("open");
		
		return this;
	}
	
	/** Constructor
	*@this {component.ui.fileDialog}
	*@api public
	*@files {Array} the file list.
	*@return this for chain.
	*/
	this.appendFiles = function(files){
		var fileList = $("#file-list", _dialog);
		
		var length = files.length;
		for(var i = 0; i < length; i++){
			var file = files[i];
			
			var args = {
				"thumbnail": file["_isFolder"] ? "file-icon-folder" : "file-icon-image"
				, "name" : file["_name"]
				, "size": file["_size"]
				, "moddate": file["_moddate"]
			}
			
			var fileHtml = component.ui.fileDialog.template.filerow(args);
			
			fileList.append($(fileHtml));
		}
	
	}

}

/** 
*@Constructor
*/
component.ui.fileDialog.fileObject = function(){
	/**@type {string} */
	this._name = "file";
	
	/**@type {bool} */
	this._isFolder = false;
	
	/**@type {string} */
	this._size = "30k";
	
	/**@type {sting} */
	this._moddate = "2012-9-13 8:45";
	
	/**@type {Array} */
	this._children = [];
	
	/**@type {bool} */
	this._isChildrenPopulated = false;
}