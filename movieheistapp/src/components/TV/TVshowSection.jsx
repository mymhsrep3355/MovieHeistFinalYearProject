import React, { useEffect, useState } from "react";
import APIendpoints, { backdrops } from "../../utils/FetchMovies.js";
import axios from "axios";
import { FaPlay } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { AiOutlineInfo } from "react-icons/ai";

const TVshowSection = () => {
  const [TVshows, setTVshows] = useState({});
  useEffect(() => {
    axios.get(APIendpoints.TVtrending).then((res) => {
      console.log(res);
      const TVshows = res.data.results;
      const fetchRandom = TVshows[Math.floor(Math.random() * TVshows.length)];
      // console.log(fetchRandom.title);
      setTVshows(fetchRandom);
    });
  }, []);

  const cutText = (str, length) => {
    if (!str) return "";
    return str.length > length ? str.slice(0, length) + '...' : str;
};

  if (!TVshows)
    return (
      <>
        <p>fetching.....</p>
      </>
    );

  const { name, first_air_date, overview, backdrop_path } = TVshows;

  return (
    <div className="w-full h-[550px] lg:h-[850px]">
      <div className="w-full h-full">
        <div className=" absolute w-full h-[550px] lg:h-[850px] bg-gradient-to-r from-black" />
        <img
          src={backdrops(backdrop_path, "original")}
          alt={name}
          className=" w-full h-full object-cover object-top"
        />
        <div className=" absolute w-full  top-[35%] lg:top-[55%] p-5 md:p-4">
          <h1 className=" text-4xl md:text-6xl font-sans-bold ">{name}</h1>
          <div className="mt-8 mb-6 flex justify-between w-4/12">
            <button class="capitalize border bg-neutral-600 border-gray-200 py-3 px-7 ml-3 flex items-center justify-between gap-2 hover:bg-gray-500 hover:text-white">
              <FaPlay class="hover:text-black hover:bg-gray-500"></FaPlay>Play
            </button>

            <button class="capitalize border border-gray-200 py-3 px-7 ml-3 flex items-center justify-between gap-2 hover:bg-red-500 hover:text-white">
              <MdFavoriteBorder class="hover:text-black hover:bg-red-500" />
              Like
            </button>
            <button class="capitalize border border-gray-200 py-3 px-7 ml-3 flex items-center justify-between gap-2 hover:bg-red-500 hover:text-white">
              <AiOutlineInfo class="hover:text-black hover:bg-red-500"></AiOutlineInfo>
              Info
            </button>
          </div>

          <p className="text-gray-400 text-sm ml-3">{first_air_date}</p>
          <p className=" mt-5 w-full md:max-w-[70%] lg:max-w-[35%] text-gray-200 ml-3">{cutText(overview, 250)}</p>
        </div>
      </div>
    </div>
  );
};

export default TVshowSection;
