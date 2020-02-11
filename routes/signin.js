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

module.exports = { firebaseapp, db };
