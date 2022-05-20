const mongoose = require("mongoose");
const dotenv = require("dotenv");

const options = {
  dbName: process.env.DB_NAME,
};

dotenv.config();

mongoose.connect(process.env.DB_CONNECTION, options, (err) => {
  if (!err) {
    console.log("Connected to the db.");
  } else {
    console.log("Error was raised while connecting to the db :" + err);
  }
});

module.exports = mongoose;
