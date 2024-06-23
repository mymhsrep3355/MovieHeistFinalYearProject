import AppNavigation from '../components/AppNavigation'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HiChevronLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import RecommendedMovies from '../components/RecommendedMovies';

const Recommendations = () => {
  // const [recommendedMovies, setRecommendedMovies] = useState([]);

  // useEffect(() => {
  //   // Fetch recommended movies from Flask backend
  //   axios.post('http://localhost:5000/recommend_movies', {
  //     user_movies: [] // Pass user preferences here if needed
  //   })
  //   .then(response => {
  //     setRecommendedMovies(response.data.recommended_movies);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching recommended movies:', error);
  //   });
  // }, []);

  return (
    <div>
      <RecommendedMovies></RecommendedMovies>
    </div>
  );
};


export default Recommendations

// rough codes

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import AppNavigation from '../components/AppNavigation';
// // import { backdrops } from '../../../utils/APIendpoints';
// import { backdrops } from '../utils/FetchMovies.js';

// const Recommendations = () => {
//   const [recommendedMovies, setRecommendedMovies] = useState([]);

//   useEffect(() => {
//     axios.post('http://localhost:5000/recommend_movies', {
//       user_movies: []
//     })
//     .then(response => {
//       setRecommendedMovies(response.data.recommended_movies);
//     })
//     .catch(error => {
//       console.error('Error fetching recommended movies:', error);
//     });
//   }, []);

//   return (
//     <div>
//       <AppNavigation />
//       <div className="container mx-auto px-4 py-8">
//         <h2 className="text-3xl font-bold mb-4">Recommended Movies</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {recommendedMovies.map(movie => (
//             <div key={movie} className="bg-white rounded-lg overflow-hidden shadow-lg">
//               <img src={backdrops(movie, 'w500')} alt={movie.title} className="w-full h-56 object-cover" />
//               <div className="p-4">
//                 <h3 className="text-xl font-bold mb-2">{movie}</h3>
//                 <p className="text-sm text-gray-600">Release Date: {movie.release_date}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Recommendations;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import AppNavigation from '../components/AppNavigation';
// import { fetchMovieDetails, backdrops } from '../utils/FetchMovies'; 

// const Recommendations = () => {
//   const [recommendedMovies, setRecommendedMovies] = useState([]);

//   useEffect(() => {
//     axios.post('http://localhost:5000/recommend_movies', {
//       user_movies: []
//     })
//     .then(response => {
//       setRecommendedMovies(response.data.recommended_movies);
//     })
//     .catch(error => {
//       console.error('Error fetching recommended movies:', error);
//     });
//   }, []);

//   return (
//     <div>
//       <AppNavigation />
//       <div className="mx-auto px-4 py-8">
//         <h2 className="text-3xl font-bold mb-4 mt-24">Recommended Movies</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {recommendedMovies.map(movieName => (
//             <MovieCard key={movieName} movieName={movieName} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // customized movie card component to display movie details
// const MovieCard = ({ movieName }) => {
//   const [movieDetails, setMovieDetails] = useState(null);

//   useEffect(() => {
    
//     fetchMovieDetails(movieName)
//       .then(details => {
//         setMovieDetails(details);
//       })
//       .catch(error => {
//         console.error(`Error fetching details for ${movieName}:`, error);
//       });
//   }, [movieName]);

//   if (!movieDetails) {
//     return null;
//   }

//   return (
//     <div className=" mt-9 rounded-lg overflow-hidden ">
//       <img src={movieDetails.poster} className="w-full h-20 object-cover" />
//       <div className="p-4">
//         <h3 className="text-xl font-bold mb-2">{movieDetails.title}</h3>
//         <p className="text-sm text-gray-600">Release Date: {movieDetails.releaseDate}</p>
//       </div>
//     </div>
//   );
// };

// export default Recommendations;


















