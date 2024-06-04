import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const allPost = new Array();

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.get("/listPost", (req, res) => {
  res.render("index.ejs", { posts: allPost });
});
app.get("/delete", (req,res)=>{
    allPost.pop();
    res.render("index.ejs", { posts: allPost });
});
app.post("/submit", (req, res) => {
  const text = req.body["post-text"];
  console.log("Ricevuto ora vedo" + text);
  allPost.push(text);
  res.render("index.ejs", { posts: allPost });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
