const mysql = require('mysql')

export const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Kannan@123',
  database: 'bookingtaxi'
});
