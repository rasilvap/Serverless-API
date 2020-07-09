const controllers = require("../controllers/deletion/controller.js");
const userController = require("../controllers/users/userController.js");
const jwt = require("jsonwebtoken");

let verifyUser = function (req, res, next) {
  console.log("Midd 1");
  userController.findUser(req.body, res);
  console.log("Rta:");
  next();
};

module.exports = function (app) {
  app.delete("/firestore/", controllers.delete);
  app.get(
    "/firestore/",
    (req, res, next) => {
      console.log("This is another Middelware");
      next();
    },
    (req, res, next) => {
      console.log("This is another Middelware");
      next();
    },
    controllers.findAll
  );
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

  app.use(verifyUser);
  app.post("/createUser/", userController.create);
  app.post("/findUserUser/", userController.findUser);
};
