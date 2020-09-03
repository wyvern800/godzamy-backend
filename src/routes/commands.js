var express = require("express");
var router = express.Router();
const app = require("../app");
const jwt = require("jsonwebtoken");

var command_controller = require("../controllers/commandController");
var auth_controller = require("../controllers/authController");

// GET commands list.
router.get("/", command_controller.commands_list);
// POST commands.
router.post("/", authenticateToken, command_controller.commands_create);
// PUT commands.
router.put("/:id", authenticateToken, command_controller.commands_update);
// DELETE commands.
router.delete("/:id", authenticateToken, command_controller.commands_delete);

function authenticateToken(request, response, next) {
  // Gather the jwt access token from the request header
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return response.sendStatus(401); // if there isn't any token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return response.sendStatus(403);
    request.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
}

module.exports = router;
