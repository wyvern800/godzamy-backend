var express = require("express");
var router = express.Router();

var command_controller = require("../controllers/commandController");

// GET commands list.
router.get("/", command_controller.commands_list);
// POST commands.
router.post("/add", command_controller.commands_create);
// PUT commands.
router.put("/edit/:id", command_controller.commands_update);
// DELETE commands.
router.delete("/delete/:id", command_controller.commands_delete);

module.exports = router;
