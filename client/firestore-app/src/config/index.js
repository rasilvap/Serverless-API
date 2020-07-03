let config = require("./dev.js");

if (process.env.REACT_APP_STAGE === "prod") {
  config = require("./prod.js");
}
module.exports = config;
