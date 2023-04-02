const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  video: String,
  username: String,
  comments: [],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
