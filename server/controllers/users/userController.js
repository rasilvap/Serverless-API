const admin = require("firebase-admin");
let serviceAccount = require("../../serviceKey/serviceAccountKey.json");
const jwt = require("jsonwebtoken");

/*admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});*/

const db = admin.firestore();

exports.create = function (req, res) {
  console.log("Create Userssssss");
  (async () => {
    try {
      let id = db.collection("users").doc().id;
      console.log("Iddsssss:", id);
      console.log("req.body.user:", req.body.user);
      await db.collection("users").doc(id).set(req.body.user);
      return res.status(200).send(req.body.user);
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
};

exports.findUser = function (req, res) {
  (async () => {
    try {
      var query = db
        .collection("users")
        .where("user", "==", req.query.user)
        .where("password", "==", req.query.password);
      query.get().then(function (querySnapshot) {
        if (querySnapshot.size > 0) {
          const accessToken = generateAccessToken({ name: req.query.user });
          res.json({ accessToken: accessToken });
        } else {
          return res.status(500).send("User doesn't exist:");
        }
      });
    } catch {
      return res.status(500).send(error);
    }
  })();
};

exports.findUserOne = function (req, res) {
  const auth = async (req, res, next) => {
    try {
      const user = await db
        .collection("users")
        .where("user", "==", req.query.user)
        .where("password", "==", req.query.password);
      if (!user) {
        throw new Error();
      }
      req.user = user;
      next();
    } catch (e) {
      res.status(401).send({ error: "Please authenticate." });
    }
  };
};

exports.login = function (req, res) {
  const accessToken = "";

  res.status(201).send({ token: accessToken });
};

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 1440 });
}

exports.userExist = function (req, res, next) {
  (async () => {
    try {
      var query = db
        .collection("users")
        .where("user", "==", req.query.user)
        .where("password", "==", req.query.password);
      query.get().then(function (querySnapshot) {
        if (querySnapshot.size > 0) {
          res.json(true);
          next();
        } else {
          res.json(false);
          next();
        }
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
};
