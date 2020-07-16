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

exports.userExist = async function (req, res, next) {
  try {
    var query = db
      .collection("users")
      .where("user", "==", req.query.user)
      .where("password", "==", req.query.password);

    const querySnapshot = await query.get();
    if (querySnapshot.size > 0) {
      // assume the query only returns 1 user?
      req.userObj = querySnapshot.docs[0].data();
    }

    next();
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.findUseByEmailAndPassword = async function (user, password) {
  try {
    var query = await db
      .collection("users")
      .where("user", "==", user)
      .where("password", "==", password);
    const querySnapshot = await query.get();
    if (querySnapshot.size > 0) {
      // assume the query only returns 1 user?
      let rta = querySnapshot.docs[0].data();
      return rta;
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.login = function (req, res) {
  const accessToken = "";

  res.status(201).send({ token: accessToken });
};

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 1440 });
}

exports.userExist = function (req, res, next) {
  console.log("starting");
  res.status(201).send({ token: "a(ver" });
};
