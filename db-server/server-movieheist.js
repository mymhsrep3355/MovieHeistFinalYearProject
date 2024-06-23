const express = require("express"); //to init express app
const cors = require("cors"); //cross origin to connect between two different server running ports
const mongoose = require("mongoose");
const port = 5005;

const app = express(); //express app initizield

app.use(cors()); //middleware of cors
app.use(express.json()); //middleware to parse data coming or going in json format

//server page text
app.get("/", (req, res) => {
  res.send("Welcome to Movie Heist Server!");
});

//connection to mongo
mongoose
  .connect("mongodb://0.0.0.0/movieheist", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  }).catch((error) => {
    console.error('MongoDB connection error:', error);
  });

//starting express app on defined port
app.listen(port, () => {
  try {
    console.log(`Movie Heist Server Running on Port ${port} `);
  } catch (error) {
    console.log(error.message);
  }
});
