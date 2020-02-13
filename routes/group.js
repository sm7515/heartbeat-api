const express = require("express");
const router = express.Router();
const db = require("../routes/signin").db;

router.get("/getGroups", (req, res) => {
  const data = [];
  db.collection("groups")
    .orderBy("id", "asc")
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        data.push(doc.data());
        // console.log(doc.id, " => ", doc.data());
      });
      res.status(200).send(data);
    });
});

router.get("/getByRank", (req, res) => {
  let data = [];
  db.collection("groups")
    .orderBy("score", "desc")
    .get()
    .then(async function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // let curScore = doc.data().score;
        data.push(doc.data());
        // console.log(doc.id, " => ", doc.data());
      });
      data = await handleData(data);
      await res.status(200).send(data);
    });
});

const handleData = async function(data) {
  let count = 0;
  let prevScore = data[0].score;
  let result = [];
  let length = 0;
  for (let i = 0; i < data.length; i++) {
    // console.log(data[i].score, prevScore);
    if (data[i].score !== prevScore) {
      count += length;
      length = 1;
      prevScore = data[i].score;
    } else {
      length += 1;
    }
    result.push(data[i]);
    result[i].rank = count + 1;
  }
  return result;
};

router.get("/getGroup", (req, res) => {
  console.log(`group number is ${req.query.No}`);
  const id = req.query.No;
  db.collection("groups")
    .doc(id)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        const data = doc.data();
        console.log(`Successfully sent profile of group ${id}!`);
        res.status(200).send(data);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
});

router.post("/updateGroupName", (req, res) => {
  console.log("group name: ", req.body.val);
  const name = req.body.val;
  const id = req.body.number + "";
  db.collection("groups")
    .doc(id)
    .update({ groupName: name })
    .then(() => {
      console.log(`successfully update group${id} name to ${name}`);
      res.status(200).send("ok");
    })
    .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
});

router.post("/updateGroupImage", (req, res) => {
  console.log("group number: ", req.body.number);
  const image = req.body.profileimg;
  const id = req.body.number + "";
  db.collection("groups")
    .doc(id)
    .update({ profileImg: image })
    .then(() => {
      console.log(`successfully update group${id}'s image`);
      res.status(200).send("ok");
    })
    .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
});

router.post("/updateGroupScore", (req, res) => {
  const score = req.body.val;
  const id = req.body.id + "";
  db.collection("groups")
    .doc(id)
    .update({ score: parseInt(score) })
    .then(() => {
      console.log(`successfully update group${id}'s score to ${score}`);
      res.status(200).send("ok");
    })
    .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
});

module.exports = router;
