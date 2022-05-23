const express = require("express");
const Post = require("./models/post");
const mongoose = require("mongoose");
const dbConnection = require("./config/db");

const app = express();

app.use(express.json()); // for parsing the request body.

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  next();
});

app.post("/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();
  return res.status(201).json({
    message: "Added successfully.",
  });
});

app.get("/posts", (req, res, next) => {
  Post.find().then((posts) => {
    res.status(200).json({
      message: "Fetched successfully.",
      posts: posts,
    });
  });
});

app.delete("/posts/:id", (req, res, next) => {
  const id = req.params.id;
  Post.deleteOne({ _id: id }).then((result) => {
    res.status(200).json({
      message: "Deleted successfully.",
      id: id,
    });
  });
});

module.exports = app;
