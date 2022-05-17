const http = require("http");
const express = require("express");

const server = http.createServer((req, res) => {
  res.end("First response...");
});

server.listen(process.env.PORT || 3000);
