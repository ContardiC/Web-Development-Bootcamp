import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "root",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// let items = [
//   { id: 1, title: "Buy milk" },
//   { id: 2, title: "Finish homework" },
// ];

let items = [];

async function getTodos() {
  const result = await db.query("SELECT * FROM items");
  return result.rows;
}

app.get("/", async (req, res) => {
  items = await getTodos();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  // TODO: insert a new todo
  const item = req.body.newItem;
  try {
    await db.query("INSERT INTO items(title) VALUES ($1)", [item]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
  // items.push({ title: item });
});

app.post("/edit", (req, res) => {});

app.post("/delete", (req, res) => {});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
