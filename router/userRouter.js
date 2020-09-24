const express = require("express");
const router = new express.Router();
const User = require("../modal/User");
const { body, validationResult, check } = require("express-validator");
const gravatar = require("gravatar");
const auth = require("../middleware/auth");

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),

    check("email", "please enter a valid email").isEmail(),

    check(
      "password",
      "Please provide a password 6 or more charector"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let isUserExist = await User.findOne({ email });
      if (isUserExist) {
        res.status(401).json({ error: [{ msg: "user already exist" }] });
      }
      let avatar = gravatar.url({
        email,
        s: "250",
        r: "pg",
        d: "mm",
      });
      let user = new User({ name, email, password, avatar });

      //generate auth token
      let token = await user.generateAuthToken();
      await user.save();
      res.status(201).send({ user, token });
    } catch (error) {
      res.status(401).send(error.message);
    }
  }
);

//get user
router.get("/getUser", auth, (req, res) => {
  res.send(req.user);
});

//login user route
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await User.findByCredentials(email, password);
    let token = await user.generateAuthToken();
    if (!user) {
      throw new Error();
    }
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
