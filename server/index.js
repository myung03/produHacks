const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./Schema/User");
const Posts = require("./Schema/Posts");
const Post = require("./Schema/Posts");
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
app.listen(PORT, () => console.log(`Listening at ${PORT}`));

app.get("/", (req, res) => {
  res.send("Produhacks!");
});

// GET user by username
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

//Get all of a user's friends
app.get("/users/:username/friends", async (req, res) => {
  const { username } = req.params;
  try {
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(userDoc.friends);
    }
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

//Get user's post
app.get("/posts/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const postDoc = await Post.find({ username });
    if (!postDoc) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.json(postDoc);
    }
  } catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
});

//PUT new exercise for the day/login
app.put("/users/:username/exercise", async (req, res) => {
  const { username } = req.params;

  try {
    const userDoc = await User.findOneAndUpdate(
      { username: username }, // filter for the user you want to update
      { dailyExercise: getRandomExercise() }, // update the dailyExercise field
      { new: true } // return the updated document
    );

    if (!userDoc) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(userDoc);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error updating user exercise" });
  }
});

const exercises = [
  "Do 10 jumping jacks while holding your breath",
  "Crawl backwards for 30 seconds",
  "Hop on one foot for 20 seconds",
  "Do a handstand against the wall for 10 seconds",
  "Spin around in circles 5 times and then do a cartwheel",
  "Pretend you're a kangaroo and hop around the room for 30 seconds",
  "Do 10 pushups with your eyes closed",
  "Sing a song while doing jumping jacks",
  "Jump up and down like a pogo stick for 20 seconds",
  "Do the worm for 10 seconds",
];

//Temporary
const getRandomExercise = () => {
  const randomIndex = Math.floor(Math.random() * exercises.length);
  return exercises[randomIndex];
};

//POST new user with username, password, and no friends
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

//POST new video post
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

//POST new friend connection for user
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

//Login
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
