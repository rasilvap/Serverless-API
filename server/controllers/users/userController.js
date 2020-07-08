const admin = require("firebase-admin");
let serviceAccount = require("../../serviceKey/serviceAccountKey.json");

/*admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});*/

exports.create = function (req, res) {
  (async () => {
    try {
      let db = admin.firestore();
      let id = db.collection("users").doc().id;
      await db.collection("users").doc(id).set(req.body.user);
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
};

exports.findUser = function (req, res) {
  let db = admin.firestore();
  var query = db
    .collection("users")
    .where("user", "==", req.user.id)
    .where("password", "==", req.user.password);
  query.get().then(function (querySnapshot) {
    if (querySnapshot.size > 0) {
      console.log("User exist:");
      res.end("User exist:", req.user.id);
    } else {
      console.log("User doesn't exist:");
      res.end("User doesn't exist:", false);
    }
  });
};
