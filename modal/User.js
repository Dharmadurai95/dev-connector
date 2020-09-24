const mongoose = require("mongoose");
const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
    },
    tokens: [
      {
        token: {
          type: String,
          require: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
//find user when login time use credentials
UserSchema.statics.findByCredentials = async (email, password) => {
  //check is valid  email
  let user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Email Address");
  }
  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid Password");
  }
  return user;
};
//filtered fields to show user
UserSchema.methods.toJSON = function () {
  const users = this;
  let user = users.toObject();
  delete user.password;
  delete user.tokens;
  return user;
};
//generate auth toke
UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  let token = await jwt.sign({ id: user.id }, config.get("SECRET_KEY"), {
    expiresIn: "1500m",
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
//hash password
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    //let salt = bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
