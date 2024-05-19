// con document ready controlliamo se la libreria jQuery è stata letta ed è pronta per essere usata
// oppure includere gli script prima della chiusura del tag body
/*
$(document).ready(function(){
    
});
*/
console.log($("h1").css("color"));
console.log($("h1").css("font-size"));
$("h1").css("color","red");
$("h1").addClass("big-title");