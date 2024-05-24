// CommonJS import
// var genereteName = require("sillyname");
// ECMAScript 6 import
import generateName from "sillyname";
import superheroes from "superheroes";

var sillyName = generateName();
var superheroName = superheroes.random();
// uso l'interpolazione delle stringhe di js usando ${variabile_stringa}
// IMPORTANTE usare ` ` per racchiudere le stringhe
console.log(`My name is ${sillyName}.`);
console.log(`My name is ${superheroName}!`);
