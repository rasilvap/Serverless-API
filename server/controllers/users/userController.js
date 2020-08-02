const admin = require("firebase-admin");
let serviceAccount = require("../../serviceKey/serviceAccountKey.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

/*admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});*/

const db = admin.firestore();

async function create(req, res) {
  try {
    let user = req.body.user;

    let userExist = await findUserByUserName(user.user);
    if (userExist) {
      res.status(401).send("User already exist....");
    }
    user.password = encryptPassword(user.password);
    let id = db.collection("users").doc().id;

    await db.collection("users").doc(id).set(req.body.user);
    return res.status(200).send(req.body.user);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function findUser(req, res) {
  try {
    var query = db
      .collection("users")
      .where("user", "==", req.query.user)
      .where("password", "==", req.query.password);
    const querySnapshot = await query.get();
    if (querySnapshot.size > 0) {
      const accessToken = generateAccessToken({ name: req.query.user });
      res.json({ accessToken: accessToken });
    } else {
      return res.status(500).send("User doesn't exist.");
    }
  } catch {
    return res.status(500).send(error);
  }
}

async function findUserByUserName(userName) {
  try {
    let query = buildQueryFindByUser(userName);
    const querySnapshot = await query.get();
    if (!querySnapshot.empty) {
      // assume the query only returns 1 user?
      let rta = querySnapshot.docs[0].data();
      return rta;
    } else {
      return;
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function findUserByUserNamePassword(user, password) {
  console.log("Primera:", user);
  query = buildQueryFindByUser(user);
  const querySnapshot = await query.get();
  console.log("Segunda:", password);
  if (!querySnapshot.empty) {
    console.log("Tercera");
    // assume the query only returns 1 user?
    let rta = querySnapshot.docs[0].data();
    let validation = bcrypt.compareSync(password, rta.password);
    console.log("rta.pass:", rta.password);
    console.log("validation3333::::", validation);
    if (!validation) {
      return;
    }
    return rta;
  } else {
    return;
  }
}

function login(req, res) {
  res.status(201).send({ token: req.accessToken });
}

async function verifyUser(req, res, next) {
  // body o header
  let user = req.query.user;
  let password = req.query.password;
  console.log("password2:", password);
  // if no username or password then send
  if (!user || !password) {
    res.status(400).send("You need a username and password");
    return;
  }
  try {
    let userExist = await findUserByUserNamePassword(user, password); //revisar variable
    if (!userExist) {
      res.status(401).send("Wrong user or password.");
    } else {
      const accessToken = generateAccessToken(userExist);
      req.accessToken = accessToken;
      next();
      return;
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 1440 });
}

function buildQueryFindByUserAndPassword(user, password) {
  var query = db
    .collection("users")
    .where("user", "==", user)
    .where("password", "==", password);
  return query;
}

function buildQueryFindByUser(user) {
  var query = db.collection("users").where("user", "==", user);
  return query;
}

function encryptPassword(plainTextPword) {
  if (!plainTextPword) {
    return "";
  } else {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainTextPword, salt);
  }
}

module.exports = {
  verifyUser,
  create,
  findUser,
  login,
};

/*
hacer un endpoint que reciba ese token crearcomentario enviar token en el header auth
validar el token con la lib verify token invaido 403
valido pasa y crea comment con id de usuario
decodificar token y guardarlo en var request.decodedUser
decoded user para tomar el id y crear comment

joi validar schemas
*/
