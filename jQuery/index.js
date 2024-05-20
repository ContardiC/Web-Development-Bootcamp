// selecting Elements
$("h1"); // an element
$("button"); // all elements

// Manipulating Styles

$("h1").css("color", "green"); //setter
console.log($("h1").css("color")); //getter
$("h1").css("font-size", "5rem");
// Add a CSS class
$("h1").addClass("big-title");
// add more CSS class
$("h1").addClass("bit-title margin-50");
// conoscere se c'e' una specifica classe
var isFind = $("h1").hasClass("margin-50");

// Manipulating Text

$("button").text("Wow"); // cambio il testo a tutti gli elementi con il tag button

$("#description").html("<p>New Paragraph</p>");

// Manipulating Attributes

console.log($("img").attr("src")); // getter
$("a").attr("href","https://www.yahoo.com"); // setter

// Adding Event Listeners 

$("button").click(function(){
    $("h1").css("color","pink");
});

$(document).keydown(function(event){
    alert("Hain premuto :" +event.key);
});

$("img").on("click",function(){
    $("h1").css("color","red");
});

