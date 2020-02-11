const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;
const signinRoute = require("./routes/signin");

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(function(req, res, next) {
  // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/signin", signinRoute);

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
