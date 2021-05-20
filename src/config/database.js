const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'school',
  insecureAuth: true,
});

connection.query('select 1', (err) => {
  if (err) {
    console.error('Error to connect database');
    process.exit(1);
  } else {
    console.log('Database connected');
  }
});

module.exports = connection;
