const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const uuid = require('uuid');

dotenv.config({path: './.env'});

const app = express();
const DIST_DIR = path.join(__dirname, '/dist');
const HTML_MAIN_FILE = path.join(DIST_DIR, 'index.html');
const HTML_LOGIN_FILE = path.join(DIST_DIR, 'login.html');
const HTML_REGISTER_FILE = path.join(DIST_DIR, 'register.html');
const HTML_GAME_FILE = path.join(DIST_DIR, 'game.html');

const hardcodedusers = [
  {email: "user@one.com", password: "abc"},
  {email: "user@two.com", password: "def"}
];

var con = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  // var sql = "";
  // con.query(sql, function (err, result) {
    // if (err) throw err;
    // console.log("Table created");
  // });
});

// TODO: Username and password verification

app.use(cookieParser());
app.use(express.static(DIST_DIR));
// Parse URL-encoded bodied (as sent by HTML forms)
app.use(express.urlencoded({extended: false}));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

function validateCookie(req, res, next) {
  const { cookies } = req;
  if ('email' in cookies) {

    if (cookies.email != '') {
      next();
    }
    else {
      res.status(403).send({msg: 'Not Authenticated'});
    }
  }
  else {
    res.status(403).send({msg: 'Not Authenticated'});
  }
}

// define routes

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.get('/game', (req, res) => {
  res.sendFile(HTML_GAME_FILE);
})

// makes cookies 
app.post('/auth/login', (req, res) => {
  res.cookie('email', req.body.email);
  res.redirect('/game');
});

app.post('/api/auth/login', (req, res) => {
  let body = req.body;
  console.log(body.email);
  console.log(body.password);
  res.cookie('sessionID', uuid.v4());
  // always return failure for testing purposes
  let responseData = {
    success: true,
    // error: "wrongPassword"
  }
  res.json(responseData);
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running at http:/` + PORT);
});
