var express = require("express");
var router = express.Router();

var categories_controller = require("../controllers/categoriesController");

// GET commands list.
router.get("/:id", categories_controller.get_category);
// POST commands.
//router.post("/add", categories_controller.commandsQD_create);
// PUT commands.
//router.put("/edit/:id", categories_controller.commands_update);
// DELETE commands.
//router.delete("/delete/:id", categories_controller.commands_delete);

module.exports = router;
