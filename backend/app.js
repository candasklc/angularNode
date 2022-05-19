const express = require("express");

const app = express();

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
  const post = req.body;
  console.log(post);
  return res.status(201).json({
    message: "Added successfully.",
  });
});

app.use("/posts", (req, res, next) => {
  const posts = [
    {
      id: "ajksgad78as290434",
      title: "From the server.",
      content: "First content.",
    },
    {
      id: "asdasfgg290434",
      title: "From the server.",
      content: "Second content.",
    },
  ];
  console.log("Endpoint is hit.");
  return res.status(200).json({
    message: "Fetched successfully.",
    posts: posts,
  });
});

module.exports = app;
