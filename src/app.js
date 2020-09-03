const express = require("express");
const cors = require("cors");
var commandsRouter = require("./routes/commands");
var categoriesRouter = require("./routes/categories");
var sessionRouter = require("./routes/session");
var connection = require("./db/database.js");

var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");

const jwt = require("jsonwebtoken");

const app = express();

/**
 * Let's add the connection to all our routes
 */
app.use(function (request, response, next) {
  request.connection = connection;
  next();
});

// Authorization
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json()); // enable json format for our responses
app.use(cors()); // enable cors to project
app.use(logRequests); // enable middleware to log

/**
 * Routes declaring
 */
app.use("/commands", commandsRouter);
app.use("/categories", categoriesRouter);
app.use("/session", sessionRouter);

/**
 * Middlewares declaring
 */
//app.use("/categories/:id", checkSession);
//app.use("/commands/:id", checkSession);

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname + "/login.html"));
});

app.get("/home", function (request, response) {
  if (request.session.loggedin) {
    response.send("Welcome back, " + request.session.username + "!");
  } else {
    response.send("Please login to view this page!");
  }
  response.end();
});

function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
}

module.exports = app;
