const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    unique: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
});

userSchema.statics.signup = async function (userObj) {
  const user = new this();
  console.log(userObj);
  user.username = userObj.username;
  user.firstName = userObj.firstName;
  user.lastName = userObj.lastName;
  user.emailAddress = userObj.email;
  await user.hashPassword(userObj.password);
  await user.save();
  return user;
};

userSchema.methods.sanitize = function () {
  return {
    ...this._doc,
    password: undefined,
  };
};

userSchema.methods.hashPassword = function (plainTextPassword) {
  const user = this;
  let randomSalt = Math.floor(Math.random() * 4 + 2);
  return bcrypt.hash(plainTextPassword, randomSalt).then((hash) => {
    user.password = hash;
  });
};

userSchema.methods.comparePassword = function (plainTextPassword) {
  const user = this;
  return bcrypt.compare(plainTextPassword, user.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
