const bcrypt = require("bcryptjs");

//const password = "newwindow159";
const saltRounds = 10;

function getEncryptedPass(password) {
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
}

module.exports = getEncryptedPass();
