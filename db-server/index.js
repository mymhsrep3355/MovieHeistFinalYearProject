const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const connectDB = require("./config/db");

dotenv.config(); //env setup
const app = express();
const port = process.env.PORT || 7000;


//middlewares

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true 
}));

app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Movie Heist Server!");
});
//connection to db
connectDB();

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});





