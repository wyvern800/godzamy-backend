var express = require("express");
var router = express.Router();

var session_controller = require("../controllers/authController");

// POST send the login.
router.post("/", session_controller.send_login);

// POST commands.
//router.post("/add", command_controller.commands_create);
// PUT commands.
//router.put("/edit/:id", command_controller.commands_update);
// DELETE commands.
//router.delete("/delete/:id", command_controller.commands_delete);

module.exports = router;
