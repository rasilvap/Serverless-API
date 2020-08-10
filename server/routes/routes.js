const controllers = require("../controllers/deletion/controller.js");
const userController = require("../controllers/users/userController.js");
const commentsController = require("../controllers/comments/commentsController.js");
const jwt = require("jsonwebtoken");
const verifyUser = require("./../controllers/users/userController.js")
  .verifyUser;
const verifyToken = require("../controllers/comments/commentsController.js")
  .verifyToken;
const validateUser = require("./../controllers/users/userController.js")
  .validateUser;

module.exports = function (app) {
  app.delete("/firestore/", controllers.delete);
  app.get("/firestore/", controllers.findAll);
  app.post("/authenticate", (req, res) => {
    const test = controllers.findAll;
    if (req.body.user === "asfo" && req.body.password === "helloworld") {
      const payload = {
        check: true,
      };
      const token = jwt.sign(payload, app.get("key"), {
        expiresIn: 1440,
      });
      res.json({
        mensaje: "Autenticación correcta",
        token: token,
      });
    } else {
      res.json({ mensaje: "Usuario o contraseña incorrectos" });
    }
  });

  app.post("/createUser/", validateUser, userController.create);
  // app.get("/findUserUser/", userController.findUser);
  app.get("/login/", verifyUser, userController.login);
  app.post("/comment/", verifyToken, commentsController.create);
};
