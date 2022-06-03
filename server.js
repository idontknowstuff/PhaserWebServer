const path = require('path');
const express = require('express');

const app = express();
const DIST_DIR = path.join(__dirname, '/dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.static(DIST_DIR));
app.get('*', (req, res) => {
  res.sendFile(HTML_FILE);
});
app.get('/times', (req, res) => res.send(showTimes()))

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM test_table');
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/db', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running at http:/` + PORT);
});

showTimes = () => {
  let result = '';
  const times = process.env.TIMES || 5;
  for (i = 0; i < times; i++){
    result += i + ' ';
  }
  return result;
}