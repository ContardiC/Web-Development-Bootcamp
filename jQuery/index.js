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
$("a").attr("href", "https://www.yahoo.com"); // setter

// Adding Event Listeners

$("button").click(function () {
  $("h1").css("color", "pink");
});

$(document).keydown(function (event) {
  alert("Hain premuto :" + event.key);
});

$("img").on("click", function () {
  $("h1").css("color", "red");
});

// Adding and Remove Elements

$("h1").before("<button>Before Button</button>"); // aggiunge prima dell'elemento h1
$("h1").after("<button>After Button</button>"); // aggiunge dopo l'elemento h1
$("h1").prepend("<button>Before Button</button>"); // aggiunge prima del contenuto dell'elemento h1
$("h1").append("<button>After Button</button>"); // aggiunge dopo il contenuto dell'elemento h1

// Adding Animations

$("#btn").on("click", function () {
  // $("h1").hide(); //nasconde
  // $("h1").fadeOut(); // dissolvenza in uscita
  // $("h1").fadeToggle(); // dissolvenza e possibilita di ricliccare per riavere l'elemento
  // $("h1").slideUp(); // scilova verso l'alto
  // $("h1").slideToggle(); // scivola e possibilita di riavere l'elemento
  // $("h1").animate({opacity: 0.5});
  // $("h1").animate({margin:"20%" });
  $("h1").slideUp().slideDown().animate({ opacity: 0.5 });
});
