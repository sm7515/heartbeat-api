const express = require("express");
const router = express.Router();

const firebase = require("firebase/app");
const firestore = require("firebase/firestore");
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "xindongzhinanzhen.firebaseapp.com",
  databaseURL: "https://xindongzhinanzhen.firebaseio.com",
  projectId: "xindongzhinanzhen",
  storageBucket: "xindongzhinanzhen.appspot.com",
  messagingSenderId: "1076288910086",
  appId: "1:1076288910086:web:8ba03c3320b2932e6b6487"
};
const firebaseapp = firebase.initializeApp(firebaseConfig);
const db = firebaseapp.firestore();

router.post("/", (req, res) => {
  console.log("netid: ", req.body.netid, ", pwd: ", req.body.pwd);
  const netid = req.body.netid;
  const pwd = req.body.pwd;

  db.collection("admins")
    .doc(netid)
    .get()
    .then(doc => {
      // validate password
      if (doc.exists) {
        if (pwd === doc.data().pwd) {
          console.log(`${netid} is a valid user!`);
          res.status(200).send(`successfully signed ${netid} in`);
        } else {
          console.log(`${netid} is not a valid user!`);
          res.status(401).send(`wrong password`);
        }
      } else {
        res
          .status(401)
          .send(
            `you are not allowed to signin if you are not a group manager.`
          );
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
});

module.exports = router;
module.exports.firebaseapp = firebaseapp;
module.exports.db = db;
