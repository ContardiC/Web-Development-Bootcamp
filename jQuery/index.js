// con document ready controlliamo se la libreria jQuery è stata letta ed è pronta per essere usata
// oppure includere gli script prima della chiusura del tag body
/*
$(document).ready(function(){
    
});
*/
// MODIFICARE LO STILE
console.log($("h1").css("color"));
console.log($("h1").css("font-size"));
//$("h1").css("color","red");
// Meglio separare lo stile e usare le classi nel seguente modo
$("h1").addClass("big-title");
$("h1").removeClass("big-tile");
//per aggiungere più classi separarle con lo spazio
$("h1").addClass("bit-title margin-50 ");
// per sapere se ha una classe
console.log($("h1").hasClass("margin-50"));

// MODIFICARE IL TESTO 