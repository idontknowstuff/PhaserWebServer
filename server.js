const path = require('path');
const express = require('express');

const app = express();
const DIST_DIR = path.join(__dirname, '/dist');
const HTML_GAME_FILE = path.join(DIST_DIR, 'index.html');
const HTML_LOGIN_FILE = path.join(DIST_DIR, 'login.html');
const HTML_MAIN_PAGE = path.join(DIST_DIR, 'titlepage.html')

app.use(express.static(DIST_DIR));

app.get('/', (req, res) => {
  res.sendFile(HTML_MAIN_PAGE);
})

app.get('/login', (req, res) => {
  res.sendFile(HTML_LOGIN_FILE);
});

app.get('/game', (req, res) => {
  res.sendFile(HTML_GAME_FILE);
});


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running at http:/` + PORT);
});
