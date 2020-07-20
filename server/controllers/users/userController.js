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
      console.log("Arranca...");
      let user = req.body.use;
      let password = user.password;
      query = buildQueryFindByUser(user.user);
      let userExist = await findUseByEmailAndPassword(query);
      if (userExist) {
        res.status(401).send("User already exist....");
      }
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

async function findUseByEmailAndPassword(query) {
  try {
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

exports.login = function (req, res) {
  res.status(201).send({ token: req.accessToken });
};

async function verifyUser(req, res, next) {
  let user = req.query.user;
  let password = req.query.password;

  // if no username or password then send
  if (!user || !password) {
    res.status(400).send("You need a username and password");
    return;
  }

  const query = buildQueryFindByUserAndPassword(user, password);
  let userExist = await findUseByEmailAndPassword(query);
  if (!userExist) {
    res.status(401).send("No user with the given username");
  } else {
    const accessToken = authenticate();
    req.accessToken = accessToken;
    next();
  }
  console.log("user eneddd");
  // next();
}

module.exports.verifyUser = verifyUser;

function generateAccessToken(user) {
  const token = jwt.sign(payload, app.get("key"), {
    expiresIn: 1440,
  });

  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 1440 });
}

function authenticate() {
  const payload = {
    check: true,
  };
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 1440,
  });

  return token;
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
