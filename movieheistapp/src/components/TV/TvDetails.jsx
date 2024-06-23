import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
import { FaPlay } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { key, RootURL, backdrops } from "../../utils/FetchMovies";

const TvDetails = () => {
  const { id } = useParams();

  const [moviedetail, setMoviedetail] = useState([]);
  const [castdata, setCastdata] = useState([]);
  const [moviegenres, setMoviegenres] = useState([]);
  const [video, setVideo] = useState([]);

  const fetchMovie = async () => {
    const data = await fetch(
      `${RootURL}/tv/${id}?api_key=${key}&language=en-US&include_adult=false`
    );
    const movie_detail = await data.json();
    setMoviedetail(movie_detail);
    console.log(moviedetail);
    setMoviegenres(movie_detail.genres);
  };

  const fetchCast = async () => {
    const castdata = await fetch(
      `${RootURL}/tv/${id}/credits?api_key=${key}&language&include_adult=false`
    );
    const castdetail = await castdata.json();
    setCastdata(castdetail.cast);
    // console.log(castdetail);
  };

  const fetchVideo = async () => {
    const data = await fetch(
      `${RootURL}/tv/${id}/videos?api_key=${key}&language=en-US`
    );
    const videodata = await data.json();
    setVideo(videodata.results);
    // console.log(videodata.results);
  };

  useEffect(() => {
    fetchMovie();
    fetchCast();
    fetchVideo();
  }, []);

  return (
    <>
      <Link
        to="/tv"
        className="fixed z-10 text-4xl text-white bg-red-600 m-3 md:m-5 rounded-full"
      >
        <HiChevronLeft />
      </Link>

      <div className="relative h-auto md:h-[82vh] flex justify-center">
        <div className=" absolute w-full h-[550px] lg:h-[850px] bg-gradient-to-r from-black/30" />
        <h1 className="text-white absolute bottom-0 p-10 text-2xl md:text-6xl font-bold text-center">
          {moviedetail.name}
        </h1>
        {moviedetail.backdrop_path === null ? (
          <img src={""} className="h-full w-full object-cover" />
        ) : (
          <img
            src={
              "https://image.tmdb.org/t/p/original/" + moviedetail.backdrop_path
            }
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <h2 className="text-white text-center pt-5 px-3 md:px-60 font-Roboto text-[18px]">
        {moviedetail.overview}
      </h2>

      <div className="text-blue-100 font-semibold my-3 flex justify-center">
        <h2 className="bg-gray-600/30 border-2 border-red-700 py-2 px-3 rounded-full">
          Release Date : {moviedetail.first_air_date}
        </h2>
      </div>
      <div className="flex justify-center flex-wrap">
        {moviegenres.map((genreTag) => (
          <>
            <div
              key={genreTag.id}
              className="text-white font-semibold bg-red-700 rounded-full px-4 py-1 m-2"
            >
              {genreTag.name}
            </div>
          </>
        ))}
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-5xl text-slate-300 font-semibold text-center p-2">
          Cast
        </h1>

        <div className="md:px-5 flex flex-row my-5 max-w-full flex-start overflow-x-auto relative scrollbar-hide md:pb-3">
          {castdata.map((cast) => (
            <>
              {cast.profile_path !== null ? (
                <>
                  <div className="flex min-w-[9rem] md:min-w-[10rem] max-w-[9rem] md:max-w-[10rem] h-full items-center text-center flex-col mx-1 scrollbar-hide">
                    <LazyLoadImage
                      effect="blur"
                      src={
                        "https://image.tmdb.org/t/p/w500" + cast.profile_path
                      }
                      className="w-full h-full rounded-xl"
                    />
                    <p className="text-white">{cast.name}</p>
                    <p className="text-blue-300">({cast.character})</p>
                  </div>
                </>
              ) : null}
            </>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center mb-10 gap-5 flex-wrap">
        {video.length > 0 ? (
          video
            .filter(
              (trailer) => trailer.type === "Clip" || trailer.type === "Trailer"
            )
            .map((trailer, index) => (
              <a
                key={trailer.id}
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex border-2 border-red-600 bg-red-600 p-3 items-center justify-center gap-2 text-xl font-semibold rounded-full text-white"
              >
                <FaPlay />
                Watch trailer {video.length > 1 ? index + 1 : ""}
              </a>
            ))
        ) : (
          <h2 className="text-xl font-semibold text-white">
            No trailer available
          </h2>
        )}
      </div>
    </>
  );
};

export default TvDetails;
