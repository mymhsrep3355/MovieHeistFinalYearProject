import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
const TVitems = ({ show }) => {
  console.log(show);
  // const { backdrop_path, poster_path, release_date } = show;

  const [like, setLike] = useState(null);

  useEffect(() => {
    if (localStorage.getItem(show?.id)) {
      setLike(true);
    }
    else{
      setLike(false);
    }
  }, [show?.id]);

    
    const handleLike = async () => {

      if (like) {
      localStorage.removeItem(show?.id);
      setLike(false);
    } else {
      localStorage.setItem(show?.id,JSON.stringify(show));
      setLike(true);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      layout
      className= "inline-block overflow-hidden cursor-pointer m-3 rounded-lg relative w-[150px] sm:w-[200px] md:w-[250px] lg:w-[280px]"
    >
      <button className="absolute bg-black text-white p-2 z-20 right-0 m-3 rounded-full text-xl" onClick={()=>handleLike(show?.id)}>
        {" "}
        {like ? <AiFillStar /> : <AiOutlineStar />}
      </button>

      <div className="absolute bottom-0 w-full flex justify-between items-end p-3 z-20">
        <h1 className="text-white text-xl font-semibold  break-normal break-words">
         {show?.name} 
        </h1>

        {(show?.vote_average || 0) > 7 ? (
          <h1 className="font-bold text-green-500 p-2 bg-zinc-900 rounded-full">
            {(show?.vote_average || 0).toFixed(1)}
          </h1>
        ) : (show?.vote_average || 0) > 5.5 ? (
          <h1 className="font-bold text-orange-400 p-2 bg-zinc-900 rounded-full">
            {(show?.vote_average || 0).toFixed(1)}
          </h1>
        ) : (
          <h1 className="font-bold text-red-600 p-2 bg-zinc-900 rounded-full">
            {(show?.vote_average || 0).toFixed(1)}
          </h1>
        )}
      </div>

      <Link
        to={`/tv-details/${show?.id}`}
        className="h-full w-full shadow absolute z-10"
      ></Link>

      <div>
        {show?.poster_path === null ? (
          <img className="img object-cover" src="" />
        ) : (
          <LazyLoadImage
            className="img object-cover"
            src={"https://image.tmdb.org/t/p/w500" + show?.backdrop_path}
          />
        )}
      </div>
    </motion.div>
    );
  };

export default TVitems;



