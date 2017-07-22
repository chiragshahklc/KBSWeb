var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'chiragshahklc',
  database : 'kbsweb'
});

module.exports = connection;