const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const DIST_DIR = path.join(__dirname, '/dist');
const HTML_MAIN_FILE = path.join(DIST_DIR, 'index.html');
const HTML_LOGIN_FILE = path.join(DIST_DIR, 'login.html');
const HTML_GAME_FILE = path.join(DIST_DIR, 'game.html');

const hardcodedusers = [
  {email: "user@one.com", password: "abc"},
  {email: "user@two.com", password: "def"}
];

app.use(cookieParser());
app.use(express.static(DIST_DIR));
app.use(express.urlencoded());

function validateCookie(req, res, next) {
  const { cookies } = req;
  if ('email' in cookies) {
    console.log('email Exists');
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

app.get('/', (req, res) => {
  res.sendFile(HTML_MAIN_FILE);
})

app.get('/login', (req, res) => {
  res.sendFile(HTML_LOGIN_FILE);
});

app.get('/game', validateCookie, (req, res) => {
  res.sendFile(HTML_GAME_FILE);
});

// makes cookies 
app.post('/login', (req, res) => {
  res.cookie('email', req.body.email);
  res.cookie('password', req.body.password);
  res.redirect('/game');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running at http:/` + PORT);
});
