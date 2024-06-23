import React, { useEffect, useState } from "react";
import APIendpoints, { backdrops } from "../../utils/FetchMovies";
import axios from "axios";
import { FaPlay } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { AiOutlineInfo } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const MovieSection = () => {
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(APIendpoints.trending).then((res) => {
      // console.log(res);
      const movies = res.data.results;
      const fetchRandom = movies[Math.floor(Math.random() * movies.length)];
      // console.log(fetchRandom.title);
      setMovie(fetchRandom);
    });
  }, []);

  const cutText = (str, length) => {
    if (!str) return "";
    return str.length > length ? str.slice(0, length) + "..." : str;
  };

  if (!movie)
    return (
      <>
        <p>fetching.....</p>
      </>
    );

  const featuredDetails = () => {
    navigate(`/movie-details/${movie.id}`);
  };

  const { title, release_date, overview, backdrop_path } = movie;

  return (
    <div className="w-full h-[550px] lg:h-[850px]">
      <div className="w-full h-full">
        <div className=" absolute w-full h-[550px] lg:h-[850px] bg-gradient-to-r from-black" />
        <img
          src={backdrops(backdrop_path, "original")}
          alt={title}
          className=" w-full h-full object-cover object-top"
        />
        <div className=" absolute w-full  top-[35%] lg:top-[55%] p-5 md:p-4">
          <h1 className=" text-4xl md:text-6xl font-sans-bold ">{title}</h1>
          <div className="mt-8 mb-6 flex justify-between w-4/12">
            <button class="capitalize border bg-neutral-600 border-gray-200 py-3 px-7 ml-3 flex items-center justify-between gap-2 hover:bg-gray-500 hover:text-white">
              <FaPlay class="hover:text-black hover:bg-gray-500"></FaPlay>Play
            </button>

            <button class="capitalize border border-gray-200 py-3 px-7 ml-3 flex items-center justify-between gap-2 hover:bg-red-500 hover:text-white">
              <MdFavoriteBorder class="hover:text-black hover:bg-red-500" />
              Like
            </button>
            <button
              onClick={featuredDetails}
              class="capitalize border border-gray-200 py-3 px-7 ml-3 flex items-center justify-between gap-2 hover:bg-red-500 hover:text-white"
            >
              <AiOutlineInfo class="hover:text-black hover:bg-red-500"></AiOutlineInfo>
              Info
            </button>
          </div>

          <p className="text-gray-400 text-sm ml-3">{release_date}</p>
          <p className=" mt-5 w-full md:max-w-[70%] lg:max-w-[35%] text-gray-200 ml-3">
            {cutText(overview, 250)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieSection;
