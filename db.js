var mysql = require("mysql");
var connection;

var localData = {
  connectionLimit: 50,
  host: "localhost",
  user: "root",
  password: "chiragshahklc",
  database: "kbsweb"
};

var herokuData = {
  connectionLimit: 10,
  host: "eu-cdbr-west-01.cleardb.com",
  user: "b911682d6c699f",
  password: "40e42724",
  database: "heroku_737b750af8ca434"
};

connection = mysql.createPool(herokuData);

module.exports = connection;
