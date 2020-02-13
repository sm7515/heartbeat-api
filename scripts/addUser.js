const db = require("../routes/signin").db;

db.collection("admins")
  .doc(netid)
  .set({
    netid: netid,
    pwd: pwd
  })
  .then(function() {
    console.log(`successfully saved ${netid} to database`);
  })
  .catch(function(error) {
    console.error(`Error saving ${netid}: `, error);
  });
