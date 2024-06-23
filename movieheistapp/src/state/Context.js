import { createContext, useEffect, useState } from "react";
import { RootURL , key} from "../utils/FetchMovies"; 
const Context = createContext();

export function DataProvider({ child }) {
  const [activegenre, setActiveGenre] = useState(28);
  const [allPage, setAllPage] = useState(null)
  const [header, setHeader] = useState("");
  const [pageSet, setPageSet] = useState(1);
  const [genres, setGenres] = useState([]);
  const [typespace, setTypeSpace] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [pageback, setPageback] = useState(false);
  const [searchloader, setsearchLoader] = useState(true);
  const fetchGenre = async () => {
    const data = await fetch(
      `${RootURL}/genre/movie/list?api_key=${key}&with_origin_country=IN&&with_origin_country=IN&language=en-US&include_adult=false`
    );
    const gen = await data.json();
    setGenres(gen.genres);
  }
  const genreFilter = async () =>{
    const data = await fetch(
      `${RootURL}/discover/movie?api_key=${key}&with_genres=${activegenre}&api_key=${key}&with_origin_country=US&with_origin_country=IN&language=en-US&include_adult=false`
    );
    const genre = await data.json();
    setMovies(movies.concat(genre.results));
    setAllPage(genre.total_pages);
    setsearchLoader(false);
    setHeader("Genres");
    // setAllPage(searchedMovies.total_pages);
    // setTypeSpace("Genres")
  }

  const getSearch = async (search) => {
    const data = await fetch(
      `${RootURL}/search/movie?api_key=${key}&query=${search}&api_key=${key}&with_origin_country=US&language=en-US&include_adult=false`
    );
    const searchedMovies = await data.json();
    setSearchedMovies(searchedMovies.results);
    setTypeSpace(`results for the ${search}`); //displaying the search results as text
  }

  const getUserLiked = () =>{
    setHeader("User Favorites");
  }
  //sets the page to 1 if it goes below 1
  useEffect(() => {
    if (pageSet < 1) {
      setPageSet(1) 
    }
  }, [pageSet]);
  return(
    <Context.Provider
    value={{
        fetchGenre,
        genres,
        getUserLiked,
        setActiveGenre,
        activegenre,
        genreFilter,
        getSearch,
        searchedMovies,
        typespace,
        pageback,
        movies,
        setMovies,
        searchloader,
        setsearchLoader,
        setPageSet,
        pageSet,
        allPage,
        header,
        setHeader,
        setAllPage
    }}>
        {child}
    </Context.Provider>
  );
}



export default Context
