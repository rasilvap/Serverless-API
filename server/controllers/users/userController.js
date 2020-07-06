const admin = require("firebase-admin");
let serviceAccount = require("../../serviceKey/serviceAccountKey.json");

/*admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});*/

exports.create = function (req, res) {
  (async () => {
    try {
      let db = admin.firestore();
      await db
        .collection("users")
        .doc("/" + req.body.id + "/")
        .create({ user: req.body.user });
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
};
