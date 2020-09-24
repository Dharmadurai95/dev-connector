const jwt = require("jsonwebtoken");
const User = require("../modal/User");
const config = require("config");

const auth = async (req, res, next) => {
  try {
    //get token
    let token = req.header("Authorization").replace("Bearer ", "");
    let decode = jwt.verify(token, config.get("SECRET_KEY"));
    let user = await User.findOne({ _id: decode.id, "tokens.token": token });
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(404).send("Unauthorized User");
  }
};
module.exports = auth;
