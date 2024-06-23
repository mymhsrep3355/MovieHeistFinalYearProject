import React, { useContext, useState } from "react";
import Context from "../state/Context.js";
import { useNavigate, Link } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";

const SearchField = () => {
  const { genreFilter, getSearch, setGenres } = useContext(Context);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [typeTime, setTypeTime] = useState(null);

  const handleSearch = (e) => {
    if (typeTime) clearTimeout(typeTime);

    const NewSepTimeout = setTimeout(() => {
      onKeyUp(search);
    }, 200);
    setTypeTime(NewSepTimeout);
  };
  const onKeyUp = (search) => {
    // console.log(query)
    if (search !== "") {
      search = search.trim();

      if (search === "") {
        navigate("/");
      } else {
        navigate(`/search/${search}`);
      }
    }
  };

  return (
    <>
      <div className=" flex justify-center items-center w-full bg-gradient-to-r from-red-600 h-[7rem] md:h-[12rem]">
        <div className="h-full w-full bg-black/30 flex justify-center items-center">
          <div className="flex justify-center mt-14 m-auto w-1/6">
            <Link
              to="/movies"
              className="fixed text-4xl text-white bg-red-600 m-3 md:m-5 rounded-full"
            >
              <HiChevronLeft />
            </Link>
          </div>
          <div className="flex justify-center items-center w-10/12">
            <input
              type="search"
              name="searchbar"
              placeholder="Search Movies ..."
              className="p-3 w-full mx-10 md:w-[50rem] opacity-75 rounded-xl outline-none text-slate-900"
              // onEnter={(e) => handleSearch()}
              onKeyUp={(e) => handleSearch()}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchField;
