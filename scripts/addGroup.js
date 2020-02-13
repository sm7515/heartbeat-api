const db = require("../routes/signin").db;

for (let i = 1; i <= 30; i++) {
  let score = Math.floor(Math.random(0, 1) * 20);
  const groupName = `💓 No. ${i}`;
  db.collection("groups")
    .doc(`${i}`)
    .set({
      id: i,
      groupName: groupName,
      profileImg: "",
      score: score
    })
    .then(function() {
      console.log(`successfully saved ${groupName} to database`);
    })
    .catch(function(error) {
      console.error(`Error saving ${groupName}: `, error);
    });
}
