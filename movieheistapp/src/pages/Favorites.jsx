import React, { useContext, useEffect, useState } from "react";
import Context from "../state/Context.js";
import MovieItems from "../components/Movies/MovieItems";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
import Share from "../components/Share.jsx";
import axios from "axios";
import { key, RootURL } from "../utils/FetchMovies.js";
import Loader from "../components/Loaders/Loader.jsx";

const Favorites = () => {
  const { getUserLiked } = useContext(Context);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetchFavoriteMovies();
  }, []);

  const fetchMovieDetails = async (movieIds) => {
    try {
      const promises = movieIds.map(async (id) => {
        const response = await axios.get(
          `${RootURL}/movie/${id}?api_key=${key}&language=en-US`
        );
        return response.data; // Returns the movie details object
      });

      const movies = await Promise.all(promises);
      return movies;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      toast.error("Error fetching likes")
      return []; // Handle error state or return default value
    }
  };

  const fetchFavoriteMovies = async () => {
    const userToken = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:7676/api/auth/likes", {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      const movieIds = response.data; // Assuming response.data is an array of movie IDs
      const moviesDetails = await fetchMovieDetails(movieIds);
      setFavoriteMovies(moviesDetails);
    } catch (error) {
      console.error("Error fetching favorite movies:", error);
      // Handle error state or logging as needed
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  return (
    <div className="w-full bg-[#000000] md:p-10 mb-20 md:mb-0">
      <Link
        to="/movies"
        className="fixed z-3 text-4xl text-white bg-red-600 m-3 md:m-5 rounded-full"
      >
        <HiChevronLeft />
      </Link>
      <h1 className="text-center font-bold mr-auto text-white text-2xl mb-6">
        Favorite Movies
      </h1>
      {loading ? ( // Show loader while loading
        <Loader />
      ) : (
        <>
          <Share movies={favoriteMovies} />
          <motion.div
            layout
            className="w-full md:p-2 flex flex-wrap relative md:justify-around justify-evenly mt-14"
          >
            <AnimatePresence>
              {favoriteMovies.length === 0 ? (
                <p className="text-xl text-white">No Favorites Yet!</p>
              ) : (
                favoriteMovies.map((movie, index) => (
                  <MovieItems key={movie.id} movie={movie} />
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Favorites;
