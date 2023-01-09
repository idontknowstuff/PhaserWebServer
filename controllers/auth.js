const mysql = require('mysql2');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
  });


  
exports.register = (req, res) => {
    console.log(req.body);

    const { username, email, password, passwordConfirm } = req.body;

    const DIST_DIR = path.join(__dirname, '../dist');
    const HTML_MAIN_FILE = path.join(DIST_DIR, 'index.html');
    const HTML_LOGIN_FILE = path.join(DIST_DIR, 'login.ejs');
    const HTML_REGISTER_FILE = path.join(DIST_DIR, 'register.ejs');
    const HTML_GAME_FILE = path.join(DIST_DIR, 'game.html');
    

    con.query('SELECT email FROM accounts WHERE email =?', [email], async (error, result) => {
        if (error) {
            console.log(error);
        }

        //TODO: Make message show in html
        if (result.length > 0){
            console.log("HShss");
            const errorMessage = req.flash('errorMessage');
            req.flash('errorMessage', 'That email is already in use');
            return res.render(HTML_REGISTER_FILE, { errorMessage });
        
        } else if (password !== passwordConfirm) {
            console.log("HShss2");
            const errorMessage = req.flash('errorMessage');
            req.flash('errorMessage', 'Passwords do not match');
            return res.render(HTML_REGISTER_FILE, { errorMessage });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        con.query('INSERT INTO accounts SET ? ', {username: username, email: email, password: hashedPassword}, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                console.log(result)
                const successMessage = req.flash('successMessage');
                req.flash('successMessage', 'Account Successfully Created');
                return res.render(HTML_REGISTER_FILE, { successMessage });
            }
        })

    })
}