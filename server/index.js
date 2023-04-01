const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./Schema/User");
const PORT = process.env.PORT | 6000;
const app = express();
app.use(express.json());

//IMPORTANT INFO:
// mongodb password: Produhacks2023
// mongodb connection link: mongodb+srv://nicholasfong1120:Produhacks2023@user.ld8woyw.mongodb.net/?retryWrites=true&w=majority

//Initilization
app.listen(4500);
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
mongoose
  .connect(
    "mongodb+srv://nicholasfong1120:Produhacks2023@user.ld8woyw.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(console.log("mongodbatlas connected"))
  .catch((err) => console.log(err));

//Port checker
app.listen(PORT, () => console.log(`Listening at ${PORT}`));

//Register User Functinality creates user, name, password, with no friends
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const friends = [];
  try {
    const userDoc = await User.create({
      username,
      password,
      friends,
    });
    res.json(userDoc);
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
