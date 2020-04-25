//require("dotenv").config();

// DataBase
var mysql = require("mysql");

var db_config = {
  host: "us-cdbr-iron-east-01.cleardb.net",
  //port: process.env.DB_PORT,
  user: "b0f6e3eafa00a8",
  password: "d0e7be5d",
  database: "heroku_6cf5ef346353132",
  connectTimeout: 10000, //The milliseconds before a timeout occurs during
  connectionLimit: 10,
  //the initial connection to the MySQL server.
};

var pool = mysql.createPool(db_config); // creates a pool

// try to connect with pool
pool.getConnection(function (err, connection) {
  if (err) {
    return console.log("Error connecting to database. Error: " + err.code);
  } else {
    return console.log("Connection to database established");
  }
});

pool.on("error", function (err) {
  console.log(err.code);
});

/**
 * MySQL connection declaration
 */
/*var connection = mysql.createConnection({
  host: "localhost",
  port: 3308,
  user: "root",
  password: "",
  database: "godzamy",
});*/

// starts the connection
/*function connect(request, response, next) {
  connection.connect(function (err) {
    if (err) {
      console.log("Error connecting to Db");
      return;
    }
    console.log("Connection to DB established");
  });
  next();
}*/

//module.exports = this;
module.exports = pool;
