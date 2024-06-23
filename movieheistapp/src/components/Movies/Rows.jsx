import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import MovieItems from "./MovieItems";


const Rows = ({ title, url }) => {
  const [movies, setMovies] = useState({});
  useEffect(() => {
    axios.get(url).then((response) => setMovies(response.data.results));
  }, [url]);
  // console.log(movies);
  return (
    <>
      <h1 className=" text-xl font-sans md:text-xl p-4 capitalize">{title}</h1>
      <div className="relative flex items-center">
        <div
          id={`scroll-slider`}
          className="w-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {Array.isArray(movies) &&
            movies.map((movie) => (
              // <h1 key={movie.id}>{movie.title}</h1>
              <MovieItems key={movie.id} movie={movie}></MovieItems>
            ))}
        </div>
      </div>
    </>
  );
};

export default Rows;
