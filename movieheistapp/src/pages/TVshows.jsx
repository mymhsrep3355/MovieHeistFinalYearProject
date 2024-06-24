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
  
    </div>
  );
};

export default TVshows;
