const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./Schema/User");
const Posts = require("./Schema/Posts");
const PORT = process.env.PORT || 4500;
const app = express();
app.use(express.json());

const corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));

//IMPORTANT INFO:
// mongodb password: Produhacks2023
// mongodb connection link: mongodb+srv://nicholasfong1120:Produhacks2023@user.ld8woyw.mongodb.net/?retryWrites=true&w=majority

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Initilization
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
mongoose
  .connect(
    "mongodb+srv://nicholasfong1120:Produhacks2023@user.ld8woyw.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(console.log("mongodbatlas connected"))
  .catch((err) => console.log(err));

//Port checker
app.listen(PORT, () => console.log(`Listening at ${PORT}`));

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

//Register User Functinality creates user, name, password, with no friends
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const friends = [];
  const videos = [];
  try {
    const userDoc = await User.create({
      username,
      password,
      friends,
      videos,
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post("/initPost", async (req, res) => {
  const { username, video } = req.body;
  const comments = [];
  try {
    const userPosts = await Posts.create({
      video,
      username,
      comments,
    });
    res.json(userPosts);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

//get user by username from data base

// Get user by username
app.get("/users/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(userDoc);
    }
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

//create a new post
app.post("/api/posts", async (req, res) => {
  const { media, userId } = req.body;
  try {
    const post = await Post.create({ media, userId });
    res.json(post);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

//login function
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username, password });
    if (!userDoc) {
      res.status(401).json({ message: "Invalid credentials" });
    } else {
      res.json(userDoc);
    }
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post("/users/addfriend", async (req, res) => {
  const { friendUsername, username } = req.body;
  try {
    const userDoc = await User.findOneAndUpdate(
      { username },
      { $addToSet: { friends: friendUsername } },
      { new: true }
    );

    const userDoc2 = await User.findOneAndUpdate(
      { friendUsername },
      { $addToSet: { friends: username } },
      { new: true }
    );

    if (!userDoc) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(userDoc);
    }
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});
