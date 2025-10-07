const express = require('express');
const app = express();
const port = 3000;
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};
const mysql = require('mysql2');
const connection = mysql.createConnection(config);

connection.query(`CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255)
    )`);
connection.query(`INSERT INTO people(name) VALUES ('Natãn')`);
connection.end();

app.get('/', (req, res) => {
  const con = mysql.createConnection(config);
  con.query('SELECT name FROM people', (err, results) => {
    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <br/> 
      <ul>
        ${results.map(person => `<li>${person.name}</li>`).join('')}
      </ul>
    `);
  })
  con.end();
})

app.listen(port, '0.0.0.0', () => {
  console.log('Running on http://localhost:' + port);
})
