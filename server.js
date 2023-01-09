const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const mysql = require('mysql2');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const passport = require('passport');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: './.env'});
}

const app = express();
const DIST_DIR = path.join(__dirname, '/dist');
const HTML_MAIN_FILE = path.join(DIST_DIR, 'index.html');
const HTML_LOGIN_FILE = path.join(DIST_DIR, 'login.ejs');
const HTML_REGISTER_FILE = path.join(DIST_DIR, 'register.ejs');
const HTML_GAME_FILE = path.join(DIST_DIR, 'game.html');

app.set('view-engine', 'ejs');
app.use(express.urlencoded( {extended: false }));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize())
app.use(passport.session())

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
// Parse URL-encoded bodied (as sent by HTML forms) (not anymore changed)
app.use(express.urlencoded({extended: true}));
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

// routes

// define routes

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


// makes cookies 
app.post('/login', (req, res) => {
  res.cookie('email', req.body.email);
  res.cookie('password', req.body.password);
  res.redirect('/game');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running at http://` + PORT);
});
