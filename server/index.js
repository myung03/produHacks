const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT | 6000;
const app = express();
app.use(express.json());

app.listen(4500);

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
