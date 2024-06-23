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
      <Rows title="YEARS"></Rows>
      <Rows title="2010" url={endpoints.movies2010}></Rows>
      <Rows title="2011" url={endpoints.movies2011}></Rows>
      <Rows title="2012" url={endpoints.movies2012}></Rows>
      <Rows title="2013" url={endpoints.movies2013}></Rows>
      <Rows title="2014" url={endpoints.movies2014}></Rows>
      <Rows title="2015" url={endpoints.movies2015}></Rows>
      <Rows title="2016" url={endpoints.movies2016}></Rows>
      <Rows title="2017" url={endpoints.movies2017}></Rows>
      <Rows title="2018" url={endpoints.movies2018}></Rows>
      <Rows title="2019" url={endpoints.movies2019}></Rows>
      <ToastContainer />
    </>
  );
};

export default Home;
