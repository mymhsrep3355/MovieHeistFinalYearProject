import axios from 'axios';
export const key = "b93a64480573ce5248c28b200d79d029"; //API KEY

export const RootURL = "https://api.themoviedb.org/3";

// MOVIES
const year = 2018;
const APIendpoints = {
  popular: `${RootURL}/movie/popular?api_key=${key}&include_adult=false`,
  topRated: `${RootURL}/movie/top_rated?api_key=${key}&include_adult=false&language=en-US&page=1`,
  trending: `${RootURL}/movie/popular?api_key=${key}&language=en-US&page=2&include_adult=false`,
  comedy: `${RootURL}/search/movie?api_key=${key}&language=en-US&query=comedy&page=1&include_adult=false`,
  upcoming: `${RootURL}/movie/upcoming?api_key=${key}&include_adult=false`,
  action: `${RootURL}/discover/movie?api_key=${key}&language=en-US&with_genres=18&include_adult=false`,
  horror: `${RootURL}/discover/movie?api_key=${key}&language=en-US&with_genres=27&include_adult=false`,
  romance: `${RootURL}/discover/movie?api_key=${key}&language=en-US&with_genres=10749&include_adult=false`,
  documentaries: `${RootURL}/discover/movie?api_key=${key}&language=en-US&with_genres=99&include_adult=false`,

  // TV SHOWS

  TVpopular: `${RootURL}/tv/popular?api_key=${key}&language=en-US&page=1&include_adult=false`,
  TVtopRated: `${RootURL}/tv/top_rated?api_key=${key}&language=en-US&page=3&include_adult=false`,
  TVtrending: `${RootURL}/trending/tv/week?api_key=${key}&include_adult=false`, // Trending TV shows
  TVcomedy: `${RootURL}/search/tv?api_key=${key}&language=en-US&query=comedy&page=1&include_adult=false`,
  TVupcoming: `${RootURL}/tv/on_the_air?api_key=${key}&language=en-US&page=2&include_adult=false`,
  TVaction: `${RootURL}/discover/tv?api_key=${key}&language=en-US&with_genres=18&include_adult=false`, // Action TV shows
  TVhorror: `${RootURL}/discover/tv?api_key=${key}&language=en-US&with_genres=18&include_adult=false`, // Horror TV shows
  TVromance: `${RootURL}/discover/tv?api_key=${key}&language=en-US&with_genres=10749&include_adult=false`, // Romance TV shows
  TVdocumentaries: `${RootURL}/discover/tv?api_key=${key}&language=en-US&with_genres=99&include_adult=false`, // Documentary TV shows

  movies2010: `${RootURL}/discover/movie?api_key=${key}&language=en-US&year=2010&include_adult=false`,
  movies2011: `${RootURL}/discover/movie?api_key=${key}&language=en-US&year=2011&include_adult=false`,
  movies2012: `${RootURL}/discover/movie?api_key=${key}&language=en-US&year=2012&include_adult=false`,
  movies2013: `${RootURL}/discover/movie?api_key=${key}&language=en-US&year=2013&include_adult=false`,
  movies2014: `${RootURL}/discover/movie?api_key=${key}&language=en-US&year=2014&include_adult=false`,
  movies2015: `${RootURL}/discover/movie?api_key=${key}&language=en-US&year=2015&include_adult=false`,
  movies2016: `${RootURL}/discover/movie?api_key=${key}&language=en-US&year=2016&include_adult=false`,
  movies2017: `${RootURL}/discover/movie?api_key=${key}&language=en-US&year=2017&include_adult=false`,
  movies2018: `${RootURL}/discover/movie?api_key=${key}&language=en-US&year=2018&include_adult=false`,
  movies2019: `${RootURL}/discover/movie?api_key=${key}&language=en-US&year=2019&include_adult=false`,



  TV2010: `${RootURL}/discover/tv?api_key=${key}&language=en-US&first_air_date_year=2010&include_adult=false`,
  TV2011: `${RootURL}/discover/tv?api_key=${key}&language=en-US&first_air_date_year=2011&include_adult=false`,
  TV2012: `${RootURL}/discover/tv?api_key=${key}&language=en-US&first_air_date_year=2012&include_adult=false`,
  TV2013: `${RootURL}/discover/tv?api_key=${key}&language=en-US&first_air_date_year=2013&include_adult=false`,
  TV2014: `${RootURL}/discover/tv?api_key=${key}&language=en-US&first_air_date_year=2014&include_adult=false`,
  TV2015: `${RootURL}/discover/tv?api_key=${key}&language=en-US&first_air_date_year=2015&include_adult=false`,
  TV2016: `${RootURL}/discover/tv?api_key=${key}&language=en-US&first_air_date_year=2016&include_adult=false`,
  TV2017: `${RootURL}/discover/tv?api_key=${key}&language=en-US&first_air_date_year=2017&include_adult=false`,
  TV2018: `${RootURL}/discover/tv?api_key=${key}&language=en-US&first_air_date_year=2018&include_adult=false`,
  TV2019: `${RootURL}/discover/tv?api_key=${key}&language=en-US&first_air_date_year=2019&include_adult=false`



};

// export const TVshowsEndpoints = {
//   popular: `${RootURL}/tv/popular?api_key=${key}&language=en-US&page=1`,
//   topRated: `${RootURL}/tv/top_rated?api_key=${key}&language=en-US&page=1`,
//   trending: `${RootURL}/trending/tv/week?api_key=${key}`, // Trending TV shows
//   comedy: `${RootURL}/search/tv?api_key=${key}&language=en-US&query=comedy&page=1&include_adult=false`,
//   upcoming: `${RootURL}/tv/on_the_air?api_key=${key}&language=en-US&page=1`,
//   action: `${RootURL}/discover/tv?api_key=${key}&language=en-US&with_genres=18`, // Action TV shows
//   horror: `${RootURL}/discover/tv?api_key=${key}&language=en-US&with_genres=27`, // Horror TV shows
//   romance: `${RootURL}/discover/tv?api_key=${key}&language=en-US&with_genres=10749`, // Romance TV shows
//   documentaries: `${RootURL}/discover/tv?api_key=${key}&language=en-US&with_genres=99`, // Documentary TV shows
// };

export function backdrops(file, size) {
  return `https://image.tmdb.org/t/p/${size}/${file}`; //for posters of movies
}

export default APIendpoints;

