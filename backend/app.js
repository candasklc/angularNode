const express = require("express");
const mongoose = require("mongoose");
const dbConnection = require("./config/db");
const postsRoute = require("./routes/posts");

const app = express();

app.use(express.json()); // for parsing the request body.

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/posts", postsRoute);

module.exports = app;
