import React from "react";
import TVshowSection from "../components/TV/TVshowSection";
import AppNavigation from "../components/AppNavigation";
import endpoints from "../utils/FetchMovies";
import TVrows from "../components/TV/TVrows";

const TVshows = () => {
  return (
    <div>
      <AppNavigation></AppNavigation>
      <TVshowSection></TVshowSection>
      
      <TVrows title="Popular" url={endpoints.TVpopular}></TVrows>
      <TVrows title="Upcoming" url={endpoints.TVupcoming}></TVrows>
      <TVrows title="Action" url={endpoints.TVaction}></TVrows>
      <TVrows title="Top Rated" url={endpoints.TVtopRated}></TVrows>
      <TVrows title="Trending" url={endpoints.TVtrending}></TVrows>
      <TVrows title="Horror" url={endpoints.TVhorror}></TVrows>
      <TVrows title="Documentaries" url={endpoints.TVdocumentaries}></TVrows>
      <TVrows title="YEARS"></TVrows>
      <TVrows title="2010" url={endpoints.TV2010}></TVrows>
      <TVrows title="2011" url={endpoints.TV2011}></TVrows>
      <TVrows title="2012" url={endpoints.TV2012}></TVrows>
      <TVrows title="2013" url={endpoints.TV2013}></TVrows>
      <TVrows title="2014" url={endpoints.TV2014}></TVrows>
      <TVrows title="2015" url={endpoints.TV2015}></TVrows>
      <TVrows title="2016" url={endpoints.TV2016}></TVrows>
      <TVrows title="2017" url={endpoints.TV2017}></TVrows>
      <TVrows title="2018" url={endpoints.TV2018}></TVrows>
      <TVrows title="2019" url={endpoints.TV2019}></TVrows>
    </div>
  );
};

export default TVshows;
