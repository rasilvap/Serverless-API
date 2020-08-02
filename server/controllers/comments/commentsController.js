const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");

let serviceAccount = require("../../serviceKey/serviceAccountKey.json");

const db = admin.firestore();

async function create(req, res) {
  try {
    const token = req.headers["access-token"];
    let comments = req.body.comments;
    comments.userName = req.decoded.userName;
    console.log("token:" + token);
    console.log("decodedToken:", req.decoded);

    let id = db.collection("comments").doc().id;

    await db.collection("comments").doc(id).set(req.body.comments);
    return res.status(200).send(req.body.comments);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function verifyToken(req, res, next) {
  const tokenHeader = req.headers["access-token"];
  const token = tokenHeader.split(" ")[1];
  console.log("tokenVerify:", tokenHeader.split(" ")[1]);
  console.log("tokenn:", token);

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log("Error:", err);
        return res.json({ mensaje: "Invalid Token." });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      mensaje: "No provided token.",
    });
  }
}

module.exports = {
  create,
  verifyToken,
};
