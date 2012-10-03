	
var component = component || {};
component.ui = component.ui || {};
component.ui.fileDialog = component.ui.fileDialog || {};

/** Constructor
*/
component.ui.fileDialog.dialog = function (){

	/** @type {HTMLDivElement} the outmost div of the dialog*/
	_dialog = {};
	
	/** @type {component.ui.fileDialog.fileObject} the root directory*/
	_rootDirectory = null; 
	
	/** @type {bool} */
	_isInitialized = false;
	
	/** Constructor
	*@this {component.ui.fileDialog}
	*@api public
	@rootName {string} the name of the root directory
	@rootId {string} the id of the root directory
	*@return this for chain.
	*/
	this.init = function(rootName, rootId){
		
		// Entry check.
		if(_isInitialized)
		{
			console.log("The dialog can't be initialized more than once.");
			return this;
		}
		_isInitialized = true;
		
		
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
		
		// Create root folder.
		_rootDirectory = new component.ui.fileDialog.fileObject();
		_rootDirectory.setName(rootName ? rootName : "root")
			.setIsFolder(true)
			.setIsChildrenPopulated(false);
		
		_dialog.dialog("open");
		
		return this;
	}
	
	/** Constructor
	*@this {component.ui.fileDialog}
	*@api public
	*@parentId {string} The id of the parent.
	*@files {Array} the file list.
	*@return this for chain.
	*/
	this.appendFiles = function(parentId, files){
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
	this._id = "id";
	
	/**@type {string} */
	this._name = "folder";
	
	/**@type {bool} */
	this._isFolder = true;
	
	/**@type {string} */
	this._size = "-";
	
	/**@type {sting} */
	this._moddate = "unknown";
	
	/**@type {Array} */
	this._children = [];
	
	/**@type {bool} */
	this._isChildrenPopulated = false;
	
	/** Set function
	*@this {component.ui.fileDialog.fileObject}
	*@api public
	*@id {string}
	*@return this for chain.
	*/
	this.setId = function(id){
		this._id = id;
		return this;
	}
	
	/** Set function
	*@this {component.ui.fileDialog.fileObject}
	*@api public
	*@name {string}
	*@return this for chain.
	*/
	this.setName = function(name){
		this._name = name;
		return this;
	}
	
	/** Set function
	*@this {component.ui.fileDialog.fileObject}
	*@api public
	*@isFolder {bool}
	*@return this for chain.
	*/
	this.setIsFolder = function(isFolder){
		this._isFolder = isFolder;
		return this;
	}
	
	/** Set function
	*@this {component.ui.fileDialog.fileObject}
	*@api public
	*@isChildrenPopulated {bool}
	*@return this for chain.
	*/
	this.setIsChildrenPopulated = function(isChildrenPopulated){
		this._isChildrenPopulated = isChildrenPopulated;
		return this;
	}
}