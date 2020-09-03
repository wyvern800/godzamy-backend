var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");

var categories_controller = require("../controllers/categoriesController");

// GET commands list.
router.get("/:id", categories_controller.get_category);
// POST commands.
//router.post("/add", categories_controller.commandsQD_create);
// PUT commands.
//router.put("/edit/:id", categories_controller.commands_update);
// DELETE commands.
//router.delete("/delete/:id", categories_controller.commands_delete);

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
