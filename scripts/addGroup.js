const db = require("../routes/signin").db;

for (let i = 1; i <= 20; i++) {
  const groupName = `💓 No. ${i}`;
  db.collection("groups")
    .doc(`${i}`)
    .set({
      id: i,
      groupName: groupName,
      profileImg: "",
      score: 0
    })
    .then(function() {
      console.log(`successfully saved ${groupName} to database`);
    })
    .catch(function(error) {
      console.error(`Error saving ${groupName}: `, error);
    });
}
