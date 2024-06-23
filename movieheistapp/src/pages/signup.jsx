import React, { useState } from "react";
import loginbg from "../assets/loginbg.jpg";
import { Link } from "react-router-dom";
import { SiSuperuser } from "react-icons/si";
import { useNavigate } from "react-router-dom";

import AppHeader from "../components/AppHeader";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [suggestedUsernames, setSuggestedUsernames] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previousVal) => ({
      ...previousVal,
      [name]: value,
    }));

    if (name === "password") {
      validatePassword(value);
    }

    if (name === "email") {
      validateEmail(value);
    }

    if (name === "firstName" || name === "lastName") {
      generateUsernames(name === "firstName" ? value : values.firstName, name === "lastName" ? value : values.lastName);
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters long and must include 1 special character and 1 capital letter.");
    } else {
      setPasswordError("");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const generateUsernames = (firstName, lastName) => {
    if (firstName && lastName) {
      const usernames = [
        `${firstName}${lastName}${Math.floor(Math.random() * 1000)}`,
        `${firstName}${Math.floor(Math.random() * 100)}${lastName}`,
        `${firstName.charAt(0)}${lastName}${Math.floor(Math.random() * 1000)}`,
        `${firstName}${lastName.charAt(0)}${Math.floor(Math.random() * 1000)}`,
      ];
      setSuggestedUsernames(usernames);
      setShowSuggestions(true);
    }
  };

  const guestUser = () => {
    navigate("/");
  };

  const handleSignUpClick = () => {
    if (passwordError) {
      return;
    }

    try {
      const { userName, firstName, lastName, email, password } = values;
      console.log(userName, email, password, firstName, lastName);
      navigate("/preference", {
        state: {
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          email: email,
          password: password,
        },
      });
    } catch (error) {
      console.error("Error during signup:", error.message);
    }
  };

  const handleUsernameClick = (username) => {
    setValues({ ...values, userName: username });
    setShowSuggestions(false);
  };

  return (
    <div className="w-full h-screen relative">
      <img className="sm:block absolute w-full h-screen object-cover" src={loginbg} alt="" />
      <div className="bg-black/60 fixed top-0 left-0 w-full h-screen" />
      <div className="relative w-full">
        <AppHeader login />
        <div className="h-[820px] max-w-[500px] mx-auto bg-black/70 rounded-lg overflow-y-auto">
          <div className="max-w-[330px] mx-auto py-14">
            <h1 className="flex font-sans text-3xl justify-start text-white">Sign Up</h1>
            <form action="" className="w-full flex flex-col py-4">
              <div className="flex w-full gap-2">
                <input
                  type="text"
                  name="firstName"
                  className="w-3/6 p-3 my-2 bg-gray-600 rounded text-white"
                  placeholder="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lastName"
                  className="w-3/6 p-3 my-2 bg-gray-600 rounded text-white"
                  placeholder="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="userName"
                  className="p-3 my-2 bg-gray-600 rounded text-white w-full"
                  placeholder="User Name"
                  value={values.userName}
                  onChange={handleChange}
                />
                {showSuggestions && suggestedUsernames.length > 0 && (
                  <ul className="absolute bg-gray-700 rounded text-white mt-1 w-full">
                    {suggestedUsernames.map((username, index) => (
                      <li key={index} className="cursor-pointer p-2 hover:bg-gray-600" onClick={() => handleUsernameClick(username)}>
                        {username}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  className="p-3 my-2 bg-gray-600 rounded text-white w-full pr-10"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                />
                {isEmailValid !== null && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {isEmailValid ? (
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </span>
                )}
              </div>
              
              <input
                type="password"
                name="password"
                className="p-3 my-2 bg-gray-600 rounded text-white"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
              />
              {passwordError && <p className="text-red-500">{passwordError}</p>}
              <button
                onClick={handleSignUpClick}
                type="button"
                className="bg-red-700 py-3 my-3 font-sans text-white"
              >
                Sign Up
              </button>
              {error && <p className="text-center text-red-500">{error}</p>}
              <div className="text-white justify-between items-center flex">
                <p>
                  <input type="checkbox" className="mr-2" /> Remember me
                </p>
                <Link to="/help">Help?</Link>
              </div>
              <p className="my-3 text-white">
                <span className="mr-2 text-sm text-sans-bold text-gray-400">
                  Already Have Account to Movie Heist?
                </span>
                <Link to="/login">Sign In</Link>
              </p>
              <button
                type="button"
                onClick={guestUser}
                className="flex justify-center items-center bg-red-700 py-3 my-6 font-sans text-white"
              >
                <SiSuperuser className="mr-2"></SiSuperuser>Try as Guest
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
