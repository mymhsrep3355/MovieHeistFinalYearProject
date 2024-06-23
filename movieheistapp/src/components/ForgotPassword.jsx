import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import logo from "../assets/Movieheist.png";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  
  const handleResetClick = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:7676/api/auth/forgot-password', {
        email: email
      });
      console.log(response.data);
      if (response.data.status === "Success") {
        setResetSent(true) // Set resetSent to true here
        setErrorMessage(false); // Clear any previous error message
      } else {
        setResetSent(true);
        setErrorMessage(
          "Error sending reset email. Please check your email address properly."
        );
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Error sending reset email. Please check your email address properly."
      );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <img className="ml-5 size-40" src={logo} alt="" />
        <div className="flex justify-between items-center mr-9">
          <div className="flex">
            <Link
              to="/login"
              className="capitalize pr-4 bg-red-600 px-5 py-3 rounded-lg"
              onClick={() => {
                handleLogout();
              }}
            >
              LOG OUT
            </Link>
          </div>
        </div>
      </div>
      {resetSent ? ( // Show reset message if resetSent is true
        <>
          <div className="w-full h-[250px] m-auto flex justify-center items-center">
            <p className="flex">
              Password reset email sent. Please check your email and follow the
              instructions.
            </p>
          </div>
          <div className="w-full h-full m-auto flex justify-center items-center">
            <Link
              className="flex items-center capitalize pr-4 bg-red-600 px-5 py-3 rounded-lg"
              to="/reset-password"
              onClick={() => {
                handleLogout();
              }}
            >
              <IoIosArrowBack className="" /> Change Pass and Login!
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="h-[450px] max-w-[500px] mx-auto bg-slate-900/45 rounded-lg">
            <div className="max-w-[330px] mx-auto py-14">
              <h1 className="flex font-sans text-3xl justify-start">
                Forgot Password
              </h1>
              <div className="w-full flex flex-col py-4">
                <p className="flex my-3">
                  <span className="mr-2 text-sm text-sans-bold text-gray-600">
                    Enter your email address to receive password reset link
                  </span>
                </p>
                <input
                  type="email"
                  className="p-3 my-2 bg-gray-600 rounded"
                  placeholder="email"
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                />
                {errorMessage && <span>{errorMessage}</span>}
                <button
                  onClick={handleResetClick}
                  className="bg-red-700 py-3 my-3 font-sans"
                >
                  Get Reset Link
                </button>
                <div className="text-white justify-between items-center flex">
                  <div>
                    <Link to="/help">Help?</Link>
                  </div>
                  <Link
                    className="flex justify-center items-center"
                    to={loggedIn ? "/" : "/login"}
                  >
                    <IoIosArrowBack />{" "}
                    {loggedIn ? "Back to Home" : "Back to Login"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
