const controllers = require("../controllers/controller.js");

module.exports = function (app) {
  // Delete a Document with parameters
  app.use((req, res, next) => {
    console.log("This is a Middelware");
    next();
  });
  app.delete("/firestore/", controllers.delete);
  app.get(
    "/firestore/",
    (req, res, next) => {
      console.log("This is another Middelware");
      next();
    },
    controllers.findAll
  );
};
