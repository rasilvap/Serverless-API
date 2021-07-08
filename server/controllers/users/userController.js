const admin = require("firebase-admin");
let serviceAccount = require("../../serviceKey/serviceAccountKey.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const saltRounds = 10;

/*admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});*/

const db = admin.firestore();

async function create(req, res) {
  try {
    let user = req.body.user;

    let userExist = await findUserByUserName(user.userName);
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
  let userName = req.query.userName;
  let password = req.query.password;
  console.log("password2:", password);
  // if no username or password then send
  if (!userName || !password) {
    res.status(400).send("You need a username and password");
    return;
  }
  try {
    let user = await findUserByUserNamePassword(userName, password); //revisar variable
    if (!user) {
      res.status(401).send("Wrong user or password.");
    } else {
      const accessToken = generateAccessToken(user);
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
    .where("userName", "==", user)
    .where("password", "==", password);
  return query;
}

function buildQueryFindByUser(user) {
  var query = db.collection("users").where("userName", "==", user);
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

function validateUser(req, res, next) {
  const user = req.body.user;
  const JoiSchema = Joi.object({
    userName: Joi.string().min(5).max(30).required(),
    password: Joi.string().min(5).max(30).required(),
    firstName: Joi.string().min(5).max(30).required(),
    lastName: Joi.string().min(5).max(30).required(),
    gender: Joi.string().min(1).max(1).required(),
    age: Joi.number().integer().required(),
    email: Joi.string().email().min(5).max(50).optional(),
    address: Joi.object({
      streetAddress: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      postalCode: Joi.string().required(),
    }),
  }).options({ abortEarly: false });

  const response =  JoiSchema.validate(user);
    if (response.error) {
      res.status(500).send(response.error.details);
    } else {
      console.log("Validated Data");
    }
}

module.exports = {
  verifyUser,
  create,
  findUser,
  login,
  validateUser,
};
