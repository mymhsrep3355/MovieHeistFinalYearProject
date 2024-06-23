import React, { useContext, useEffect } from "react";
import Context from "../state/Context";
import FilterGenres from "./FilterGenres";
import { motion, AnimatePresence } from "framer-motion";
import MovieItems from "./Movies/MovieItems";
import InfiniteScroll from 'react-infinite-scroll-component';


const GenreLoad = () => {
  const {
    fetchGenre,
    activegenre,
    setActiveGenre,
    genres,
    allPage,
    setAllPage,
    setMovies,
    genreFilter,
    movies,
    setPageSet,
    pageSet,
    searchloader,
  } = useContext(Context);

  useEffect(() => {
    setPageSet(1); // Reset Page to 1 on initial render.
  }, []);

  useEffect(() => {
    setMovies([]);
    setPageSet(0);
  }, [activegenre]);


  useEffect(() => {
    if (pageSet > 0) {
      genreFilter();
    }
  }, [pageSet]);

  return (
    <div className=" w-full border-l-gray-800/5 md:p-8 mb-20 md:mb-0">
      <FilterGenres />
      <motion.div
        layout
        className="flex flex-wrap relative justify-evenly md:justify-around"
      >
        <AnimatePresence>
          {searchloader ? (
            <span className="searchloader m-10"></span>
          ) : (
            <>
              <InfiniteScroll
                className="w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around"
                dataLength={movies.length}
                next={() => setPageSet(setPageSet + 1)}
                hasMore={setPageSet < allPage}
                searchloader={<span className="loader m-10"></span>}
                scrollThreshol={0.9}
                style={{ overflow: "hidden" }}
              >
                {movies.map((movie) => (
                  <MovieItems key={movie.id} movie={movie}></MovieItems>
                ))}
              </InfiniteScroll>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default GenreLoad;
