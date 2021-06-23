const express = require("express");
const jwt = require("jsonwebtoken");
const key = process.env.KEY || require("../../secrets").key;

const router = express.Router();

const User = require("./userModel");

router.get("/:username", async function (req, res) {
  const authorization = req.header("Authorization") || "";
  const [type, token] = authorization.split(" ");
  console.log(req.params.username);

  if (type === "Bearer" && jwt.verify(token, key)) {
    const payload = jwt.decode(token, key);
    console.log(payload)
    const user = await User.findById(payload._id)
    console.log(user)
    console.log("////////////////", user);
    res.status(200).send(user);
      
      
  } else {
    return res.status(400).send("unauthorized");
  }
});
module.exports = router;
