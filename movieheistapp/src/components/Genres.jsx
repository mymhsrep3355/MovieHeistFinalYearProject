import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../state/Context.js";
import { MdOutlineCancel } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { HiChevronDoubleLeft } from "react-icons/hi";

const Genres = () => {
  const navigate = useNavigate();
  const { fetchGenre, activegenre, setActiveGenre, genres } =
    useContext(Context);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const location = useLocation();
  const email = location.state?.email;
  const password = location.state?.password;
  const userName = location.state?.userName;
  const firstName = location.state?.firstName;
  const lastName = location.state?.lastName;
  useEffect(() => {
    fetchGenre();
  }, []);


  const toggleGenre = (genreId) => {
    setSelectedGenres((prevSelectedGenres) => {
      const isSelected = prevSelectedGenres.includes(genreId);
      if (isSelected) {
        return prevSelectedGenres.filter((id) => id !== genreId);
      } else {
        return [...prevSelectedGenres, genreId];
      }
    });

    const selectedGenreNames = genres
      .filter((genre) => selectedGenres.includes(genre.id))
      .map((genre) => genre?.name);
    console.log("Selected genres:", selectedGenreNames);
  };
  const handleSaveAndNavigate = async () => {
    if (selectedGenres.length < 5) {
      toast.info("Please select at least 5 genres.");
    } else {
      try {
        //saving the preferences of user
        const response = await axios.post(
          `http://localhost:7676/api/auth/signup`,
          {
            firstName: firstName,
            lastName: lastName,
            email: email,
            userName: userName,
            password: password,
            preferences: selectedGenres,
          }
        );
        console.log(response.data);
        navigate("/");
      } catch (error) {
        console.error("Error saving preferences:", error.message);
        toast.info(
          "User with this Email Already Exists. Please use other email."
        );
        toast.error("Failed to save preferences. Please try again.");
      }
    }
  };

  return (
    <>
      <Link
        to="/signup"
        className="fixed z-10 text-4xl text-white bg-red-600 m-3 md:m-5 rounded-full"
      >
        <HiChevronDoubleLeft />
      </Link>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className=" text-4xl font-bold mb-3 text-red-600">
          Welcome to Movie Heist!
        </h1>
        <div className="">
          <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
            We Require Your Preferences
          </h2>
        </div>
        <div className="flex flex-wrap justify-center px-2 mt-8">
          {genres.map((genre) => (
            <div key={genre.id} className="relative">
              <button
                onClick={() => toggleGenre(genre.id)}
                className={
                  selectedGenres.includes(genre.id)
                    ? "active px-4 py-2 m-2 text-[15px] text-white font-semibold rounded-3xl bg-red-600"
                    : "px-4 py-2 m-2 text-[15px] bg-slate-800 text-white font-semibold rounded-3xl"
                }
              >
                {genre.name}
              </button>
              {selectedGenres.includes(genre.id) && (
                <MdOutlineCancel
                  className="absolute top-0 right-0 mt-1 mr-1 cursor-pointer text-yellow-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleGenre(genre.id);
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <button
          className=" w-1/6 flex justify-center items-center py-4 px-6 my-6 font-sans rounded-xl bg-slate-700 text-white transition-colors duration-300 hover:bg-red-700 hover:text-white visited:bg-red-700 visited:text-white"
          onClick={handleSaveAndNavigate}
        >
          Save & Get Started
        </button>
        <ToastContainer />
      </div>
    </>
  );
};

export default Genres;

// import React, { useEffect, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Context from "../Context.js";
// import { MdOutlineCancel } from "react-icons/md";

// const Genres = () => {
//   const navigate = useNavigate();
//   const { fetchGenre, activegenre, setActiveGenre, genres } = useContext(
//     Context
//   );
//   const [selectedGenres, setSelectedGenres] = useState([]);

//   useEffect(() => {
//     fetchGenre();
//   }, []);

//   const toggleGenre = (genreId) => {
//     const isSelected = selectedGenres.includes(genreId);
//     if (isSelected) {
//       setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
//     } else {
//       setSelectedGenres([...selectedGenres, genreId]);
//     }
//   };

//   const handleSaveAndNavigate = () => {
//     // Redirect to Recommendations page with updated preferences
//     navigate("/recommended", { state: { userGenres: selectedGenres } });
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className=" text-4xl font-bold mb-3 text-red-600">
//         Welcome to Movie Heist!
//       </h1>
//       <div className="">
//         <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
//           We Require Your Preferences
//         </h2>
//       </div>
//       <div className="flex flex-wrap justify-center px-2 mt-8">
//         {genres.map((genre) => (
//           <div key={genre.id} className="relative">
//             <button
//               onClick={() => toggleGenre(genre.id)}
//               className={
//                 selectedGenres.includes(genre.id)
//                   ? "active px-4 py-2 m-2 text-[15px] text-white font-semibold rounded-3xl bg-red-600"
//                   : "px-4 py-2 m-2 text-[15px] bg-slate-800 text-white font-semibold rounded-3xl"
//               }
//             >
//               {genre.name}
//             </button>
//             {selectedGenres.includes(genre.id) && (
//               <MdOutlineCancel
//                 className="absolute top-0 right-0 mt-1 mr-1 cursor-pointer text-yellow-500"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleGenre(genre.id);
//                 }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//       <button
//         className=" w-1/6 flex justify-center items-center py-4 px-6 my-6 font-sans rounded-xl bg-slate-700 text-white transition-colors duration-300 hover:bg-red-700 hover:text-white visited:bg-red-700 visited:text-white"
//         onClick={handleSaveAndNavigate}
//       >
//         Save & Get Started
//       </button>
//     </div>
//   );
// };

// export default Genres;
