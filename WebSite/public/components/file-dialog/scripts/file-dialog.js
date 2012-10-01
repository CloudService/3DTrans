
$(document).ready(function() {
		$( "button").button();
		$("button").click(function() { $( "#dialog" ).dialog("open") });
		
		initDialog();
	});
	
	var initDialog = function() {
		var dialogHandle = $( "#dialog" );
		
		// Set the dialog options
		dialogHandle.dialog(
		{ 
			buttons: 
    		{
        		"Ok": function() { $(this).dialog("close"); } 
        		, "Cancel" : function() { $(this).dialog("close"); } 
    		}
    		, title: "Select the source file"
			, width: 800
			, height: 600
			, draggable: false
			, modal: true
			, resizable: false 
			, autoOpen: false
		});	
	};