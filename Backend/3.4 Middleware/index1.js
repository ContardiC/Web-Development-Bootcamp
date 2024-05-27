// RUN npm install to install all dependecies
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended:true}));
// /submit e' l'endopoint a cui punta l'action del form   <form action="/submit" method="POST">
app.post("/submit",(req,res)=>{
  console.log(req.body);
});

app.get("/", (req, res) => {
  //nel caso il sito sia ospitato su un cloud non basta il percorso locale del file
  // ma dobbiamo importare dirname e fileURLToPath
  // console.log(__dirname + "/public/index.html")
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
