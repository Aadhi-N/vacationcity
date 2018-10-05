//Install express server
const express = require('express');
const path = require('path');

const app = express();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

console.log('server start')

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/vacationcity'));

app.get('/', function(req,res) {
res.sendFile(path.join(__dirname + '/dist/vacationcity/index.html'));
});


app.get('/api/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM test_table');
    const results = { 'results': (result) ? result.rows : null};
    // res.render('pages/db', results );
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err); 
  }
})

console.log('server 2')

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8000);
console.log('server 3')