import React from 'react';
import './QuizLoader.css'; 

const Loader = () => {
  return (
    <>
    <h1>Quiz Data Loading ...</h1>
    <div className="loadingspinner">
      <div id="square1"></div>
      <div id="square2"></div>
      <div id="square3"></div>
      <div id="square4"></div>
      <div id="square5"></div>
    </div>
    </>
  );
};

export default Loader;
