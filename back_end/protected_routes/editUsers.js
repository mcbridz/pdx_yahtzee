const express = require("express");
const jwt = require("jsonwebtoken");
const key = process.env.KEY || require("../../secrets").key;

const router = express.Router();

const User = require("../protected_routes/userModel");

router.get("/:username", function (req, res) {
  const authorization = req.header("Authorization") || "";
  const [type, token] = authorization.split(" ");

  if (type === "Bearer" && jwt.verify(token, key)) {
    const payload = jwt.decode(token, key);
    User.find({ username: req.params.username }),
      (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(400).send("not a valid user");
        console.log("////////////////", user);
        res.json(user);
      };
  } else {
    return res.status(400).send("unauthorized");
  }
});
module.exports = router;
