const express = require("express");
const jwt = require("jsonwebtoken");
const key = process.env.KEY || require("../../secrets").key;

const router = express.Router();

const User = require("../protected_routes/userModel");

router.post("/register", (req, res) => {
  console.log(`Looking for user ${req.body.username}`);
  User.findOne({ username: req.body.username }, async (err, userExists) => {
    console.log("finished searching for username");
    if (err) return res.status(500).send(err);
    if (userExists) return res.status(400).send("username already exists");
    console.log("creating user");
    const user = await User.signup(
      req.body.username,
      req.body.password,
      req.body.email,
      req.body.firstName,
      req.body.lastName
    );
    res.status(201).send(user.sanitize());
  });
});

module.exports = router;
