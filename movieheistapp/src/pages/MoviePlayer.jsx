import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Context from "../state/Context";
import { getSmashyStreamUrl, get2embedAPIUrl } from "../PlayerMovies";
import { key, RootURL } from "../utils/FetchMovies";
import { HiChevronLeft } from "react-icons/hi";

const MoviePlayer = () => {
  const { setHeader } = useContext(Context);
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState([]);

  const getMovieInfo = async () => {
    const data = await fetch(
      `${RootURL}/movie/${id}?api_key=${key}&language=en-US`
    );
    const movie = await data.json();
    setMovieInfo(movie);
  };

  useEffect(() => {
    getMovieInfo();
    setHeader("Movie Player");
    setHeader(movie.title);
  }, []);


  return (
    <>
      <Link
        to="/movies"
        className="fixed mt-20 text-4xl text-white bg-red-600 m-3 md:m-5 rounded-full"
      >
        <HiChevronLeft />
      </Link>
      <iframe
        allowFullScreen
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
        }}
        src={get2embedAPIUrl(id)}
      ></iframe>
    </>
  );
};

export default MoviePlayer;
