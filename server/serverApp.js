const express = require("express"),
  bodyParser = require("body-parser"),
  jwt = require("jsonwebtoken"),
  config = require("./configs/config");
var app = express();
var cors = require("cors");
app.use(bodyParser.json());
app.use(cors());
require("dotenv").config();
require("./routes/routes.js")(app);
app.set("key", config.key);
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(
  process.env.BACKEND_PORT !== undefined
    ? process.env.BACKEND_PORT
    : process.env.BACKEND_DEFAULT_PORT,
  function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
  }
);
