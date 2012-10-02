
$(document).ready(function(){
	$("#start-button").button();
	$("#start-button").click( function(e){
		alert("Welcome to use the free translation service. We are working in progress!");
	});
	
   $(".provider-icon").click(function(event){
     openDialog();
   });
 });