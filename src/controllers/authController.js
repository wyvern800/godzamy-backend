//const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hash = "$2a$10$Wjj4CAPpR.ZVVOp0hicQyebfw.Z3bNpgB2.ypVrd1IQ4EUVcTbQ2u";
const saltRounds = 10;

exports.send_login = function (request, response, cb) {
  var connection = request.connection;

  var username = request.body.username;
  var password = request.body.password;

  if (username && password) {
    connection.query(
      "SELECT * FROM users WHERE username = ? AND password = ? AND role >= 2",
      [username, password],
      function (error, results, fields) {
        if (results.length > 0) {
          const token = generateAccessToken({
            username: request.body.username,
          });
          response.json(token);
          request.session.loggedin = true;
          request.session.username = username;
          //response.redirect("/home");
        } else {
          response.send("Incorrect Username and/or Password!");
        }
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
};

/*async function getPasswordHash(password) {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      throw err;
    } else {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          throw err;
        } else {
          return hash;
        }
      });
    }
  });
}*/

exports.send_home = function (request, response) {
  if (request.session.loggedin) {
    response.send("Welcome back, " + request.session.username + "!");
  } else {
    response.send("Please login to view this page!");
  }
  response.end();
};

// username is in the form { username: "my cool username" }
// ^^the above object structure is completely arbitrary
function generateAccessToken(username) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}
