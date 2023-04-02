const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  media: String,
  caption: String,
  comments: [],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
