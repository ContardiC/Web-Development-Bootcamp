import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import bodyParser from "body-parser";
const app = express();
const port = 3000;

var bandName = "";
// Middleware bodyparser per primo !!! se si cambia l'ordine si generano errori
app.use(bodyParser.urlencoded({extended:true}));

// preprocessing Middleware
function bandNameGenerator(req,res,next){
  console.log(req.body);
  bandName = req.body["street"] + req.body["pet"];
  next();
}
 app.use(bandNameGenerator);

app.get("/",(req,res)=>{
  res.sendFile(__dirname + "/public/index.html");
});
app.post("/submit",(req,res)=>{
  console.log(req.body);
  res.send(`<h1>Your band name is: </h1><h2>${bandName}</h2>🚀`);
  //res.send(req.body);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
