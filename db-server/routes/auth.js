const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const { User } = require("../models/User-Model");
const {Review} = require('../models/Review-Model')
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
//signup route
router.post("/signup", async (req, res) => {
  const { userName, firstName, lastName, email, password, preferences } = req.body;
  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, userName, email, password: hashedPassword, preferences });

    // Save the user
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

//login
router.post("/login", async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    //checking if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials User Not Found" });
    }
    //checking if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials Password" });
    }
    //creating a token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/forgot-password', (req, res) => {
  const {email} = req.body;
  User.findOne({email: email})
  .then(user => {
      if(!user) {
          return res.send({Status: "User not existed"})
      } 
      const token = jwt.sign({id: user._id}, "jwt_secret_key", {expiresIn: "1h"})
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth:{
            user: 'Movieheistsite@gmail.com',
            pass: 'bdzo lktd ggvo oodi'
          }
          
        });
        
        var mailOptions = {
          from: 'movieheist@info.com',
          to: req.body.email,
          subject: 'Reset Password Link ',
          text: `http://localhost:3000/reset-password/${user._id}/${token}`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            return res.send({Status: "Success"})
          }
        });
  })
})

router.post('/reset-password/:id/:token', (req, res) => {
  const {id, token} = req.params
  const {password} = req.body

  jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if(err) {
          return res.json({Status: "Error with token"})
      } else {
          bcrypt.hash(password, 10)
          .then(hash => {
              User.findByIdAndUpdate({_id: id}, {password: hash})
              .then(u => res.send({Status: "Success"}))
              .catch(err => res.send({Status: err}))
          })
          .catch(err => res.send({Status: err}))
      }
  })
})

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const tokenString = token.split(" ")[1]; // Extract the token part from "Bearer <token>"

  jwt.verify(tokenString, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    
    req.user = decoded;
    next();
  });
};

router.post('/likes', verifyToken, async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let likedMovies = user.likedMovies || [];
    const index = likedMovies.indexOf(movieId);

    if (index !== -1) {
      // Movie ID exists in likedMovies, remove it (dislike)
      likedMovies.splice(index, 1);
    } else {
      // Movie ID doesn't exist in likedMovies, add it (like)
      likedMovies.push(movieId);
    }

    user.likedMovies = likedMovies;
    await user.save();

    res.status(200).json({ message: "Likes updated successfully", user });
  } catch (error) {
    console.error("Error updating likes:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


router.get('/likes', verifyToken, async (req, res) => {
  try {
      const userId = req.user.id;

      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user.likedMovies);
  } catch (error) {
      console.error("Error fetching likes:", error);
      res.status(500).json({ error: "Something went wrong" });
  }
});


// to post a review
router.post('/addReview', verifyToken, async (req, res) => {
  try {
      const { review, movie_id, sentiment, score } = req.body;  // Updated to receive new fields
      const userId = req.user.id;

      // Create a new review document including the new fields
      const newReview = new Review({
          userId: userId,
          movieId: movie_id,
          review: review,
          sentiment: sentiment, // now storing sentiment
          score: score         // now storing score
      });

      // Save the new review to the database
      const savedReview = await newReview.save();

      res.status(201).json({ message: 'Review added successfully', review: savedReview });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Get reviews for a movie
router.get('/reviews/:movie_id', async (req, res) => {
  try {
      const { movie_id } = req.params;
      const reviews = await Review.find({ movieId: movie_id }).populate('userId', '-password');
      res.status(200).json(reviews);
  } catch (error) {
      console.error(error);
      res.status(500).json(
        { message: 'Internal Server Error' });
  }
});
    

// to get user reviews
router.get('/reviews', verifyToken, async (req, res) => {
  try {
      const userId = req.user.id;

      const reviews = await Review.find({ userId: userId }).populate('movieId', 'title -_id');

      if (reviews.length === 0) {
          return res.status(404).json({ message: 'No reviews found for this user.' });
      }

      res.status(200).json(reviews);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Delete a review
router.delete('/review/:reviewId', verifyToken, async (req, res) => {
  try {
      const userId = req.user.id; 
      const reviewId = req.params.reviewId; 
      const review = await Review.findById(reviewId);
      if (!review) {
          return res.status(404).json({ message: 'Review not found.' });
      }
      if (review.userId.toString() !== userId) {
          return res.status(403).json({ message: 'You can only delete your own reviews.' });
      }

      await Review.deleteOne({ _id: reviewId });
      res.status(200).json({ message: 'Review deleted successfully.' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
