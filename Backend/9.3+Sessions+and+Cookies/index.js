import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session"; //permette di impostare una nuova sessione e salvare le sessioni di login deglli utenti
import passport from "passport";
import { Strategy } from "passport-local"; // strategia locale

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "TOPSECRETWORD", // e' come una chiave e nella prossima lezione la registremo nelle variabili d'ambiente che e' il modo piu' sicuro
    resave: false, // si puo' usare una sessione Express con un archivio Postgres
    saveUninitialized: true, // se si vuole forzare o meno il salvataggio di una sessione nell'archivio
    // lo impostiamo a true in modo da memorizzare le sessioni non inizializzate nella memoria del server
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // impostiamo la scadenza del cookie a 24 ore
    }
  })
);
// usare passport dopo l'inizializzazione della sessione !!!

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "root",
  port: 5432,
});
db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/secrets", (req, res) => {
  console.log(req.user);
  if (req.isAuthenticated()) {
    //metodo che arriva da passport
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  }
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", hash);
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err)=>{
            console.log(err);
            res.redirect("/secrets");
          }); // aggiungiamo l'utente appena registrato alla sessione 
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
); // useremo passport come middleware

// scrivere la strategia prima della fine del codice e prima di app.listen
passport.use(
  new Strategy(async function verify(username, password, cb) {
    // username e password vengono automaticamente presi dal form e quindi fa implicitamente il seguente codice
    //const usename = req.body.username;
    // const password = req.body.password;
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, result) => {
          if (err) {
            return cb(err); // resituiamo l'errore
          } else {
            if (result) {
              return cb(null, user); // in caso di esito positivo inviamo callback
              //con primo parametro (quello per gli errori) null in quanto l'esito e' positivo e
              //come secondo parametro i dati dell'utente che sappiamo essere quello corretto
            } else {
              return cb(null, false); //null nel campo per gli errori perche' non si tratta di un vero e proprio errore
              // in questo caso il secondo campo lo impostiamo a false perche' l'utente non e' autenticato
            }
          }
        });
      } else {
        return cb("User not found"); // Restituiamo la stringa User not found come errore
      }
    } catch (err) {
      return cb(err);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
