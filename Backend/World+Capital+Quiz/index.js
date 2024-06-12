import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// setup dati del database
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "root",
  port: "5433",
});
// connessione al database
db.connect();
// query per popolare il nostro array quiz
db.query("SELECT * FROM capitals", (err, res) => {
  if (err) {
    console.log("Error Execting query", err.stack);
  } else {
    quiz = res.rows; // popolo l'arry con tutte le tuple restituite dall query
  }
  db.end(); // chiudo la connessione al db
});

let quiz = [
  { country: "France", capital: "Paris" },
  { country: "United Kingdom", capital: "London" },
  { country: "United States of America", capital: "New York" },
];

let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // per ottenere i dati dai form
app.use(express.static("public")); // per utilizzare risorse statiche

let currentQuestion = {};

// GET home page
app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  // trim() per togliere gli spazi prima e dopo la stringa
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }
  // preparo la prossima domanda con la funzione asincrona nextQuestion()
  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
  // passo a index.ejs i valori per settare: domanda(question) - button (wasCorrect) - totalScore
});

async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];

  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
