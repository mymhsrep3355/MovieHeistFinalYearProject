import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HiChevronLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { RootURL, key } from '../utils/FetchMovies';
import Loader from './Loaders/Loader';

const RecommendedMovies = () => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favMovies, setFavMovies] = useState([]);

  useEffect(() => {
    fetchUserLikedMovies();
  }, []);

  const fetchUserLikedMovies = async () => {
    try {
      const userToken = localStorage.getItem('token');
      const response = await axios.get('http://localhost:7676/api/auth/likes', {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      const userLikedMovieIds = response.data; // Assuming it's an array of movie IDs

      fetchMovieDetails(userLikedMovieIds);
    } catch (error) {
      console.error('Error fetching user liked movies:', error);
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (movieIds) => {
    try {
      const promises = movieIds.map(async (id) => {
        const response = await axios.get(
          `${RootURL}/movie/${id}?api_key=${key}&language=en-US`
        );
        return response.data; // Returns the movie details object
      });

      const movies = await Promise.all(promises);
      setFavMovies(movies);
      fetchRecommendedMovies(movies);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setLoading(false);
    }
  };

  const fetchRecommendedMovies = async (favMovies) => {
    try {
      const response = await axios.post('http://localhost:5000/recommend_movies', {
        user_movies: favMovies.map(movie => movie.title) // Example user_movies input
      });

      const recommendedMoviesData = response.data.recommended_movies;
      const moviesArray = Object.values(recommendedMoviesData)[0].results;

      setRecommendedMovies(moviesArray);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recommended movies:', error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#000000] md:p-10 mb-20 md:mb-0">
      <Link
        to="/"
        className="fixed z-3 text-4xl text-white bg-red-600 m-3 md:m-5 rounded-full mt"
      >
        <HiChevronLeft />
      </Link>
      <h2 className="text-center font-bold text-white text-2xl mb-6 mt-12">Recommended Movies</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {loading ? (

          <Loader></Loader>
        ) : recommendedMovies.length === 0 ? (
          <p className="text-xl text-white">No recommendations found.</p>
        ) : (
          recommendedMovies.map(movie => (
            <div key={movie.id} className="inline-block overflow-hidden cursor-pointer m-3 rounded-lg relative w-[150px] sm:w-[200px] md:w-[250px] lg:w-[280px]">
              <div className="relative">
                <img
                  className="img object-cover"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="absolute bg-black text-white p-2 z-20 right-0 m-3 rounded-full text-xl">
                  {movie.title}
                </div>
              </div>
              <div className="absolute bottom-0 w-full flex justify-between items-end p-3 z-20">
                <h1 className="text-white text-xl font-semibold break-normal break-words">{movie.title}</h1>
                <h1 className="font-bold text-green-500 p-2 bg-zinc-900 rounded-full">{movie.vote_average.toFixed(1)}</h1>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecommendedMovies;
