import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";

const MovieItems = ({ movie }) => {
  const { title, backdrop_path, poster_path, release_date } = movie;
  const [like, setLike] = useState(false);
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchLikes = async () => {
      if (userToken) {
        try {
          const response = await axios.get("http://localhost:7676/api/auth/likes", {
            headers: { Authorization: `Bearer ${userToken}` }
          });
          const currentLikes = response.data;
          setLike(currentLikes.includes(movie.id));
        } catch (error) {
          console.error("Error fetching likes:", error);
          // toast.error("Error fetching likes")
        }
      }
    };
    fetchLikes();
  }, [movie.id, userToken]);

  const handleLike = async () => {
    if (!userToken) {
      toast.error("Please login to like movies");
      console.error("Please login to like movies");
      return;
    }

    try {
      const response = await axios.get("http://localhost:7676/api/auth/likes", {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      const currentLikes = response.data;

      let updatedLikes;
      if (like) {
        updatedLikes = currentLikes.filter(id => id !== movie.id);
      } else {
        updatedLikes = [...currentLikes, movie.id];
      }

      const updateResponse = await axios.post(
        "http://localhost:7676/api/auth/likes",
        { movieId: movie.id },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      const { user } = updateResponse.data;
      if (user && user.likedMovies) {
        setLike(user.likedMovies.includes(movie.id));
        if (like) {
          toast.info("Movie removed from favorites")
          console.info("Movie removed from favorites");
        } else {
          toast.info("Movie added to favorites")
          console.info("Movie added to favorites");
        }
      } else {
        throw new Error("Invalid user data");
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      layout
      className="inline-block overflow-hidden cursor-pointer m-3 rounded-lg relative w-[150px] sm:w-[200px] md:w-[250px] lg:w-[280px]"
    >
      <button
        className="absolute bg-black text-white p-2 z-20 right-0 m-3 rounded-full text-xl"
        onClick={handleLike}
      >
        {like ? <AiFillStar /> : <AiOutlineStar />}
      </button>

      <div className="absolute bottom-0 w-full flex justify-between items-end p-3 z-20">
        <h1 className="text-white text-xl font-semibold break-normal break-words">
          {movie.title || movie.name}
        </h1>

        {(movie.vote_average || 0) > 7 ? (
          <h1 className="font-bold text-green-500 p-2 bg-zinc-900 rounded-full">
            {(movie.vote_average || 0).toFixed(1)}
          </h1>
        ) : (movie.vote_average || 0) > 5.5 ? (
          <h1 className="font-bold text-orange-400 p-2 bg-zinc-900 rounded-full">
            {(movie.vote_average || 0).toFixed(1)}
          </h1>
        ) : (
          <h1 className="font-bold text-red-600 p-2 bg-zinc-900 rounded-full">
            {(movie.vote_average || 0).toFixed(1)}
          </h1>
        )}
      </div>

      <Link
        to={`/movie-details/${movie.id}`}
        className="h-full w-full shadow absolute z-10"
      ></Link>

      <div>
        {movie.poster_path === null ? (
          <img className="img object-cover" src="" />
        ) : (
          <LazyLoadImage
            className="img object-cover"
            src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
          />
        )}
      </div>
      <ToastContainer></ToastContainer>
    </motion.div>
  );
};

export default MovieItems;
