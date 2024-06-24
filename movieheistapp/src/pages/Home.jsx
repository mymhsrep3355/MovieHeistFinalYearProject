import React from "react";
import AppNavigation from "../components/AppNavigation";
import MovieSection from "../components/Movies/MovieSection";
import Rows from "../components/Movies/Rows";
import endpoints from "../utils/FetchMovies";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
  return (
    <>
      <AppNavigation></AppNavigation>
      <MovieSection></MovieSection>
      <Rows title="Popular" url={endpoints.popular}></Rows>
      <Rows title="Upcoming" url={endpoints.upcoming}></Rows>
      <Rows title="Action" url={endpoints.action}></Rows>
      <Rows title="Top Rated" url={endpoints.topRated}></Rows>
      <Rows title="Trending" url={endpoints.trending}></Rows>
      <Rows title="Horror" url={endpoints.horror}></Rows>

      <ToastContainer />
    </>
  );
};

export default Home;
