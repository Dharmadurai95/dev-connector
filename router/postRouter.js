const express = require("express");
const router = new express.Router();
const Profile = require("../modal/Profile");
const Post = require("../modal/Post");
const User = require("../modal/User");
const auth = require("../middleware/auth");
const { check, validationResult, body } = require("express-validator");

router.post(
  "/createPost",
  [auth, [check("text", "Text fields is requred").not().isEmpty()]],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await await User.findById({ _id: req.user.id });
      let newPost = await new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error.message);
      res.status(500).json("Server Error");
    }
  }
);
//get all post

router.get("/getAllPost", auth, async (req, res) => {
  try {
    const post = await Post.find().sort({ data: -1 });
    res.json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("server error");
  }
});

// get single post

router.get("/getSinglePost/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    if (!post) {
      res.status(404).json("Post not found");
    }
    res.json(post);
  } catch (error) {
    console.log(error.message);
    if (error.kind === "ObjectId") {
      res.status(404).json("Post not found");
    }
    res.status(500).json("server error");
  }
});

//remove post only remove own post
router.delete("/deletePost/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    if (!post) {
      res.status(404).json("Post not found");
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unathorized to delete post" });
    }
    await post.remove();
    res.json(post);
  } catch (error) {
    console.log(error.message);
    if (error.kind === "ObjectId") {
      res.status(404).json("Post not found");
    }
    res.status(500).json("server error");
  }
});

//like post
router.patch("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    if (!post) {
      res.status(404).json("Post not found");
    }
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post alredy liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(error.message);
    if (error.kind === "ObjectId") {
      res.status(404).json("Post not found");
    }
    res.status(500).json(error.message);
  }
});

//dislike
router.patch("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });

    if (!post) {
      res.status(404).json("Post not found");
    }

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post not yet liked" });
    }
    let index = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(index, 1);

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(error.message);
    if (error.kind === "ObjectId") {
      res.status(404).json("Post not found");
    }
    res.status(500).json("server error");
  }
});

//add commands
router.post("/postCommant/:id", auth, async (req, res) => {
  try {
    let user = await User.findById({ _id: req.user.id });
    let post = await Post.findById({ _id: req.params.id });
    let newCmt = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };
    post.comments.unshift(newCmt);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    res.status(500).json("server error");
  }
});

//delete comments
router.delete("/deleteCommant/:id/:command_id", auth, async (req, res) => {
  try {
    let post = await Post.findById({ _id: req.params.id });
    let command = post.comments.find((cmt) => cmt.id === req.params.command_id);
    if (!command) {
      res.status(404).json("Command not exist");
    }
    if (command.user.toString() !== req.user.id) {
      res.status(401).json({ msg: "User  Unathorized " });
    }
    let index = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(index, 1);

    await post.save();
    res.json(post.comments);
  } catch (error) {
    res.status(500).json("server error");
  }
});
module.exports = router;
