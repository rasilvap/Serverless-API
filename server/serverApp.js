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
// 1
app.set("key", config.key);
// 2
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(process.env.BACKEND_PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});
