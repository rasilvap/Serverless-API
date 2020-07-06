const admin = require("firebase-admin");
let serviceAccount = require("../../serviceKey/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.delete = function (req, res) {
  let db = admin.firestore();
  var query = db
    .collection(req.query.collection)
    .where(req.query.field, "==", req.query.value);
  query.get().then(function (querySnapshot) {
    let sizeQuery = querySnapshot.size;
    querySnapshot.forEach(function (doc) {
      doc.ref.delete();
    });
    res.end("Number of registers Deleted:" + sizeQuery);
  });
};

exports.findAll = function (req, res) {
  let db = admin.firestore();
  var query = db
    .collection(req.query.collection)
    .where(req.query.field, "==", req.query.value);
  query.get().then(function (querySnapshot) {
    let sizeQuery = querySnapshot.size;
    res.end("Number of registers:" + sizeQuery);
  });
};
