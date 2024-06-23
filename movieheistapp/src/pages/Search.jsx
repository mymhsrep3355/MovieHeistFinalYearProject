import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Context from "../state/Context";
import MovieItems from "../components/Movies/MovieItems";
import { AnimatePresence, motion } from "framer-motion";
import { HiChevronLeft } from "react-icons/hi";

const Search = () => {
  const {
    activegenre,
    setMovies,
    genreFilter,
    getSearch,
    searchedMovies,
    typespace,
    searchloader,
  } = useContext(Context);
  const { search } = useParams();
  
  useEffect(() => {
    getSearch(search);
  }, [search]); //execute only once if search or fetch change
  return (
    <>      
      <Link
        to="/"
        className="fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full"
      >
        <HiChevronLeft />
      </Link>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        layout
        className="flex flex-wrap relative justify-evenly md:justify-around"
      >
        <div className="w-full p-5">
          <h1 className="text-white text-2xl font-bold text-center">{typespace}</h1>
          <AnimatePresence>
            {searchedMovies.map((movie) => (
              <MovieItems key={movie.id} movie={movie} />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

export default Search;












{/* <Link
        to="/"
        className="fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full"
      >
        <HiChevronLeft />
      </Link>
      <div className="w-full bg-[#10141e] md:p-10 mb-20 md:mb-0">
        <h1 className="text-white text-2xl font-bold ml-32">{typespace}</h1>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        layout
        className="flex flex-wrap relative justify-evenly md:justify-around"
      >
        <AnimatePresence>
          {searchedMovies.map((movie) => (
            <MovieItems key={movie.id} movie={movie} />
          ))}
        </AnimatePresence>
      </motion.div> */}