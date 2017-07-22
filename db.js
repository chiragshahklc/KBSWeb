var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'chiragshahklc',
  database : 'kbsweb'
});

var herokucon = mysql.createConnection({
  host     : 'eu-cdbr-west-01.cleardb.com',
  user     : 'b911682d6c699f',
  password : '40e42724',
  database : 'heroku_737b750af8ca434'
})

module.exports = connection;
module.exports = herokucon;