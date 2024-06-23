import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/signup";
import ForgotPassword from "./components/ForgotPassword";
import Recommendations from "./pages/Recommendations";
import { ToastContainer } from "react-toastify";
import { DataProvider } from "./state/Context";
import Genres from "./components/Genres";
import Help from "./pages/help_user/Help";
import TVshows from "./pages/TVshows";
import MovieDetails from "./components/Movies/MovieDetails.jsx";
import TvDetails from "./components/TV/TvDetails.jsx";
import SearchField from "./components/SearchField.jsx";
import Search from "./pages/Search.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import Favorites from "./pages/Favorites.jsx";
import MoviePlayer from "./pages/MoviePlayer.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import Quiz from "./pages/Quiz.jsx";
import Reviews from "./pages/Reviews.jsx";
import AppFooter from "./components/Footer.jsx";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.jsx";
const App = () => {
  return (
    <>
    <LoadingScreen/>
    <div className="flex flex-col min-h-screen">
      <DataProvider
        child={
          <div className="flex-grow">
          <Routes>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Home></Home>} />
            <Route path="/movie-details/:id" element={<MovieDetails />} />
            <Route path="/tv" element={<TVshows></TVshows>} />
            <Route path="/tv-details/:id" element={<TvDetails></TvDetails>}/>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
            <Route path="/preference" element={<Genres></Genres>}></Route>
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/recommended" element={<Recommendations />} />
            <Route path="/help" element={<Help></Help>}></Route>
            <Route path="/search/:search" element={<SearchPage></SearchPage>}></Route>
            <Route path="/search" element={<SearchPage></SearchPage>}></Route>
            <Route path="/player/:id/:title" element={<MoviePlayer />} />
            <Route path="/movie-player/:id" element={<MoviePlayer></MoviePlayer>}></Route>
            <Route path="/Quiz" element={<Quiz/>}></Route>
          </Routes>
          </div>  
        }
      ></DataProvider>
      <AppFooter></AppFooter>
    </div>
    </>
  );
};
export default App;
