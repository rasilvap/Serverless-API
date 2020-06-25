//ar config = require('./config');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
 
require('./routes/routes.js')(app);
 //console.log(config)
// Create a Server
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
 
})
