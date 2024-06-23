import React, { useContext, useEffect } from "react";
import Rows from "../components/Movies/Rows";
// import Context from "../Context";
import SearchField from "../components/SearchField";
import Search from "../pages/Search.jsx";
import { Link, useParams } from "react-router-dom";
import GenreLoad from "../components/GenreLoad.jsx";
import { HiChevronLeft } from "react-icons/hi";

const SearchPage = () => {
//   const { setMovies } = useContext(Context);
  const { search } = useParams();

  return (
    <>
      <SearchField />
      {search ? <Search search={search}/> : <GenreLoad />}
    </>
  );
};

export default SearchPage;
