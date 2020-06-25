const admin = require("firebase-admin");
let serviceAccount = require("../serviceKey/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.delete = function (req, res) {
  console.log("Entrando delete server...");
  let db = admin.firestore();
  console.log(req.query.collection);
  console.log(req.query.field);
  console.log(req.query.value);
  var query = db
    .collection(req.query.collection)
    .where(req.query.field, "==", req.query.value);
  console.log("Query:" + query);
  // let sizeQuery;   Como acceder a variables fuera de la promesa??????
  query.get().then(function (querySnapshot) {
    let sizeQuery = querySnapshot.size;
    console.log("Query:" + querySnapshot.query);

    querySnapshot.forEach(function (doc) {
      doc.ref.delete();
    });

    console.log("Number of registers Deleted:" + sizeQuery);
    res.end("Number of registers Deleted:" + sizeQuery);
  });
};

exports.findAll = function (req, res) {
  console.log("Entrando findAll...");
  let db = admin.firestore();
  console.log(req.query.collection);
  console.log(req.query.field);
  console.log(req.query.value);
  console.log("variables:", process.env);
  var query = db
    .collection(req.query.collection)
    .where(req.query.field, "==", req.query.value);
  console.log("Query:" + query);
  // let sizeQuery;   Como acceder a variables fuera de la promesa??????
  query.get().then(function (querySnapshot) {
    let sizeQuery = querySnapshot.size;
    console.log("Query:" + querySnapshot.query);
    console.log("Number of registers Deleted:" + sizeQuery);
    res.end("Number of registers:" + sizeQuery);
  });
};
