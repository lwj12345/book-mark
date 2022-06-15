const mysql = require('mysql')
var connection = mysql.createConnection({
    host     : '120.76.44.187',
    user     : 'root',
    password : 'xu123..123',
    database : 'book_change',
     multipleStatements: true
});
  connection.connect();

  exports.connection = connection;
   