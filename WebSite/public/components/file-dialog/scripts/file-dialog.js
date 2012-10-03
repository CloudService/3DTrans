	
var component = component || {};
component.ui = component.ui || {};
component.ui.fileDialog = component.ui.fileDialog || {};

/** Constructor
*/
component.ui.fileDialog.dialog = function (){

	/** @type {HTMLDivElement} the outmost div of the dialog*/
	_dialogElement = {};
	
	/** @type {HTMLDivElement} the folder navigator element*/
	_folderNavigatorElement = null;
	
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
		
		// Create root folder.
		_rootDirectory = new component.ui.fileDialog.fileObject();
		_rootDirectory.setId(rootId)
			.setName(rootName ? rootName : "root")
			.setIsFolder(true)
			.setIsChildrenPopulated(false);
			
		
		var dialogHtml = component.ui.fileDialog.template.filedialog();
		_dialogElement = $(dialogHtml);
		
		_folderNavigatorElement = $("#file-navigator", _dialogElement);
		// Add to document
		$("body").append(_dialogElement);
		
		// Set the dialog options
		_dialogElement.dialog(
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
		
		this.updateFileNavigator([{name: _rootDirectory._name, id: _rootDirectory._id}]);

		
		_dialogElement.dialog("open");
		
		return this;
	}
	
	/** Append files
	*@this {component.ui.fileDialog}
	*@api public
	*@parentId {string} The id of the parent.
	*@files {Array} the file list.
	*@return this for chain.
	*/
	this.appendFiles = function(parentId, files){
		var fileList = $("#file-list", _dialogElement);
		
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
	
	/** Append files
	*@this {component.ui.fileDialog}
	*@api public
	*@path {Array} The array of object {"name":"", "id":""}.
	*@return this for chain.
	*/
	this.updateFileNavigator = function(path){
		
		if(_folderNavigatorElement){
			_folderNavigatorElement.html(''); // remove the current navigator.
			
			var args = {folderPath:path};
			var naviHTML = component.ui.fileDialog.template.navigator(args);
			_folderNavigatorElement.append($(naviHTML));
		}
		
		return this;
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