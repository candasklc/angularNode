const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: { type: String, default: "" },
    content: { type: String, default: "" },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Post", postSchema);
