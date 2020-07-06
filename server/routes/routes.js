const controllers = require("../controllers/deletion/controller.js");
const userController = require("../controllers/users/userController.js");
const jwt = require("jsonwebtoken");

/*const rutasProtegidas = express.Router();
rutasProtegidas.use((req, res, next) => {
  const token = req.headers["access-token"];

  if (token) {
    jwt.verify(token, app.get("llave"), (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválida" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      mensaje: "Token no proveída.",
    });
  }
});*/

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
    (req, res, next) => {
      console.log("This is another Middelware");
      next();
    },
    controllers.findAll
  );
  app.post("/authenticate", (req, res) => {
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

  app.post("/createUser/", userController.create);
};
