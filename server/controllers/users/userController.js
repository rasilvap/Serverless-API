const admin = require("firebase-admin");
let serviceAccount = require("../../serviceKey/serviceAccountKey.json");
const jwt = require("jsonwebtoken");

/*admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});*/

const db = admin.firestore();

exports.create = function (req, res) {
  (async () => {
    try {
      let id = db.collection("users").doc().id;
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
        .where("user", "==", req.user.user)
        .where("password", "==", req.user.password);
      query.get().then(function (querySnapshot) {
        if (querySnapshot.size > 0) {
          const accessToken = generateAccessToken({ name: req.user.user });
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

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 1440 });
}
