import React, { useContext, useEffect } from "react";
import Context from "../state/Context.js";

const FilterGenres = () => {
  const {
    fetchGenre,
    activegenre,
    setActiveGenre,
    genres,
    setMovies,
    genreFilter,
    movies,
  } = useContext(Context);


  useEffect(() => {
    fetchGenre();
  }, []);

  // const handleGenreClick = (genreId) => {
  //   setActiveGenre(genreId);
  //   const filteredMovies = movies.filter((movie) =>
  //     movie.genre_ids.includes(genreId)
  //   );
  //   setMovies(filteredMovies);
  //   genreFilter();
  // };

  return (
    <>
      <h1 className="text-center font-bold mr-auto text-white text-2xl mb-6 ">
        Genre Filter
      </h1>
      <div className="flex flex-wrap justify-center px-3">
        {genres.map((genre) => (
          <div key={genre.id} className="relative">
            <button
              onClick={() => {
                setActiveGenre(genre.id);
                // handleGenreClick(genre.id);
                // setMovies([]);
                // genreFilter();
              }}
              className={
                activegenre === genre.id
                  ? "active px-4 py-2 m-2 text-[15px] text-white font-semibold rounded-3xl bg-red-600"
                  : "px-4 py-2 m-2 text-[15px] bg-slate-800 text-white font-semibold rounded-3xl"
              }
              key={genre.id}
            >
              {genre.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default FilterGenres;
