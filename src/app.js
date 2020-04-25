const express = require("express");
const cors = require("cors");
var commandsRouter = require("./routes/commands");
var categoriesRouter = require("./routes/categories");
var connection = require("./db/database.js");

const app = express();

/**
 * Let's add the connection to all our routes
 */
app.use(function (request, response, next) {
  request.connection = connection;
  next();
});

app.use(express.json()); // enable json format for our responses
app.use(cors()); // enable cors to project
app.use(logRequests); // enable middleware to log

/**
 * Routes declaring
 */
app.use("/commands", commandsRouter);
app.use("/categories", categoriesRouter);

function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
}

module.exports = app;
