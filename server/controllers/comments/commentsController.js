const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");

let serviceAccount = require("../../serviceKey/serviceAccountKey.json");

const db = admin.firestore();

async function create(req, res) {
  try {
    const token = req.headers["access-token"];
    console.log("token:" + token);
    console.log("decodedToken:", req.decoded);
    return res.status(200).send(req.body.comments);
  } catch (error) {}
}

async function verifyToken(req, res, next) {
  const token = req.headers["access-token"];
  console.log("tokenVerify:", token.split(" ")[1]);

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
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
