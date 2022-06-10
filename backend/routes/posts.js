const express = require("express");

const Post = require("./models/post");

const router = express.Router();

router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  // Saving the object in the db, then getting the id of the object to use in the frontend
  post.save().then((result) => {
    return res.status(201).json({
      message: "Added successfully.",
      postId: result._id,
    });
  });
});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    res.status(200).json({ message: "Updated successfully" });
  });
});

router.get("", (req, res, next) => {
  Post.find().then((posts) => {
    res.status(200).json({
      message: "Fetched successfully.",
      posts: posts,
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json({
        message: `Successfully fetched the post with given id:${req.params.id}`,
        post: post,
      });
    } else {
      res.status(404).json({
        message: "The item not found.",
      });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Post.deleteOne({ _id: id }).then((result) => {
    res.status(200).json({
      message: "Deleted successfully.",
      id: id,
    });
  });
});

module.exports = router;
