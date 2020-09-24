const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Profile = require("../modal/Profile");
const User = require("../modal/User");
const Post = require("../modal/Post");
const axios = require("axios");
const { check, validationResult, body } = require("express-validator");
const config = require("config");

//get user proile
router.get("/getProfile", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

//get user by id
router.get("/getProfile/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

// if user is exist update profile or  create   profile

router.post(
  "/createProfile",
  [
    auth,
    [
      check("status", "Status is Required").not().isEmpty(),
      check("skills", "skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    let profileFeilds = {};
    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      facebook,
      youtube,
      linkedin,
    } = req.body;

    profileFeilds.user = req.user.id;

    if (company) profileFeilds.company = company;
    if (website) {
      profileFeilds.website = website;
    }
    if (location) {
      profileFeilds.location = location;
    }
    if (status) {
      profileFeilds.status = status;
    }
    if (skills) {
      profileFeilds.skills = skills.split(",").map((skill) => skill.trim());
    }
    if (bio) {
      profileFeilds.bio = bio;
    }
    if (githubusername) {
      profileFeilds.githubusername = githubusername;
    }
    profileFeilds.social = {};
    if (facebook) {
      profileFeilds.social.facebook = facebook;
    }
    if (youtube) {
      profileFeilds.social.youtube = youtube;
    }
    if (linkedin) {
      profileFeilds.social.linkedin = linkedin;
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // update the profile
        let profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFeilds },
          { new: true }
        );
        return res.json(profile);
      }
      //create profile;
      profile = new Profile(profileFeilds);
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).send("server error");
    }
  }
);
//get all profile
router.get("/getProfiles", async (req, res) => {
  try {
    let profile = await Profile.find().populate("user", ["name", "avatar"]);
    if (!profile) {
      res.status(400).json("There is no any profile");
    }
    res.send(profile);
  } catch (error) {
    res.status(500).send("server error");
  }
});
//delete profile and users
router.delete("/deleteUserProfile", auth, async (req, res) => {
  try {
    let profile = await Profile.findOneAndRemove({ user: req.user._id });
    let user = await User.findByIdAndRemove({ _id: req.user._id });
    let post = await Post.deleteMany({ user: req.user._id });
    if (profile && user && post) {
      res.status(202).json("User and profile successfully deleted");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
//update the profile experence
router.patch(
  "/updateExperince",
  [
    auth,
    check("title", "Title field is required").not().isEmpty(),
    check("company", "company is required feild ").not().isEmpty(),
    check("location", "location is requied ").not().isEmpty(),
    check("from", "from date is requied").not().isEmpty(),
  ],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty) {
      res.status(400).json({ errors: errors.array() });
    }
    try {
      const {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      } = req.body;

      const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      };

      let profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.status(201).json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).json("server error");
    }
  }
);

//delete user exp
router.delete("/deleteExp/:id", auth, async (req, res) => {
  let id = req.params.id;
  if (!id) {
    res.status(401).json("Invalid Profile Id ");
  }
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    let removeIdex = profile.experience.map((exp) => exp.id).indexOf(id);
    profile.experience.splice(removeIdex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(400).json("Server Error");
  }
});

//update profile education
router.patch(
  "/updateEducation",
  [
    auth,
    [
      check("school", "school is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("from", "from date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { school, degree, from, to, current, description } = req.body;
    try {
      const updatedDegreeField = {
        school,
        degree,
        from,
        to,
        current,
        description,
      };

      let profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(updatedDegreeField);
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).json("Server Error");
    }
  }
);
//delete profile education
router.delete("/deleteEdu/:id", auth, async (req, res) => {
  let id = req.params.id;
  if (!id) {
    res.status(401).json("Invalid Profile Id ");
  }
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    let removeIdex = profile.education.map((exp) => exp.id).indexOf(id);
    profile.education.splice(removeIdex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(400).json("Server Error");
  }
});

//fetch github data
router.get("/github/:username", async (req, res) => {
  try {
    axios
      .get(
        `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=%202114fa3530ee72bd287f&client_secret=0aad262fb15cd547815516021a8fa84e90a366f4`
      )
      .then((response) => res.json(response))
      .catch((err) => res.json(err.response));
  } catch (error) {
    res.status(500).json("server error");
  }
});
module.exports = router;
