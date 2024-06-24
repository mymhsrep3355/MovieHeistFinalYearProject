const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const { User } = require("../models/User-Model");
const {Review} = require('../models/Review-Model')
const {Movie} = require('../models/Movie-Model')
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

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/totalUsers", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(200).json({ totalUsers });
  } catch (error) {
    console.error("Error fetching total users:", error);
    res.status(500).json({ message: "Something went wrong" });
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

router.get('/genres', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const fetchGenres = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=b93a64480573ce5248c28b200d79d029&language=en-US', {
      method: 'GET',
    });

    if (!fetchGenres.ok) {
      return res.status(fetchGenres.status).json({ error: "Failed to fetch genres" });
    }

    const genresData = await fetchGenres.json();
    const genres = genresData.genres || [];

    // Get user's preferred genre IDs
    const userGenres = user.preferences || [];

    // Map genre IDs to their names
    const userPreferredGenres = userGenres.map(genreId => {
      const genre = genres.find(g => g.id === genreId);
      return genre ? genre.name : null;
    }).filter(genreName => genreName !== null);

    return res.status(200).json(userPreferredGenres);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post('/addMovie', async (req, res) => {
  try {
      const { name, description, genre, director, releaseDate, rating } = req.body;

      if (!name || !description || !genre || !director || !releaseDate || !rating) {
          return res.status(400).json({ message: 'All fields are required' });
      }

      const newMovie = new Movie({
          name,
          description,
          genre,
          director,
          releaseDate,
          rating
      });

      // Save the new movie to the database
      const savedMovie = await newMovie.save();
      res.status(201).json({ message: 'Movie added successfully', movie: savedMovie });
  } catch (error) {
      console.error('Error adding movie:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


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
    

router.get("/totalReviews", async (req, res) => {
  try {
    const totalReviews = await Review.countDocuments();
    res.status(200).json({ totalReviews });
  } catch (error) {
    console.error("Error fetching total reviews:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get("/topReviewers", async (req, res) => {
  try {
    // Aggregate to find users with the most reviews
    const topReviewers = await Review.aggregate([
      { $group: { _id: "$userId", reviewCount: { $sum: 1 } } },
      { $sort: { reviewCount: -1 } },
      { $limit: 10 }  // Change this number to limit how many top reviewers you want
    ]);

    if (topReviewers.length === 0) {
      return res.status(404).json({ message: "No reviewers found" });
    }

    // Fetch the user details for the top reviewers
    const topReviewersDetails = await Promise.all(
      topReviewers.map(async (reviewer) => {
        const user = await User.findById(reviewer._id).select("username email");
        if (user) {
          return {
            email: user.email,
            userName: user.userName,
            reviewCount: reviewer.reviewCount
          };
        } else {
          return null; // Handle case where user is not found
        }
      })
    );

    // Filter out null values (users not found)
    const filteredReviewersDetails = topReviewersDetails.filter(reviewer => reviewer !== null);

    // Respond with the top reviewers' details
    res.status(200).json(filteredReviewersDetails);
  } catch (error) {
    console.error("Error fetching top reviewers:", error);
    res.status(500).json({ message: "Internal Server Error" });
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
