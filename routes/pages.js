const express = require('express');
const path = require('path');
const router = express.Router();

const DIST_DIR = path.join(__dirname, '../dist');
const HTML_MAIN_FILE = path.join(DIST_DIR, 'index.html');
const HTML_LOGIN_FILE = path.join(DIST_DIR, 'login.ejs');
const HTML_REGISTER_FILE = path.join(DIST_DIR, 'register.ejs');
const HTML_GAME_FILE = path.join(DIST_DIR, 'game.html');


router.get('/', (req,res) => {
    res.sendFile(HTML_MAIN_FILE);
});

router.get('/register', (req, res) => {
    const errorMessage = req.flash('errorMessage');
    res.render(HTML_REGISTER_FILE);
});

router.get('/login', (req,res) => {
    res.render(HTML_LOGIN_FILE);
});

module.exports = router;