import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import logo from "../assets/Movieheist.png";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [resetSent, setResetSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const { id, token } = useParams();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedIn(false);
    navigate("/login");
  };
console.log(id, token);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:7676/api/auth/reset-password/${id}/${token}`, { password : password});
      console.log(response.data);
      if (response.data.Status === "Success") {
        // setResetSent(true);
        setErrorMessage("");
        navigate("/login");
      } else {
        setResetSent(false);
        setErrorMessage("Error resetting password.");
      }
    } catch (error) {
      console.error(error);
      // setResetSent(false);
      setErrorMessage("Error resetting password.");
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
      {resetSent ? (
        <>
          <div className="w-full h-[250px] m-auto flex justify-center items-center">
            <p className="flex">
              Password reset successful. You can now log in with your new password.
            </p>
          </div>
          <div className="w-full h-full m-auto flex justify-center items-center">
            <Link
              className="flex items-center capitalize pr-4 bg-red-600 px-5 py-3 rounded-lg"
              to="/login"
              onClick={() => {
                handleLogout();
              }}
            >
              <IoIosArrowBack className="" /> Logout and Back to Login
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="h-[450px] max-w-[500px] mx-auto bg-slate-900/45 rounded-lg">
            <div className="max-w-[330px] mx-auto py-14">
              <h1 className="flex font-sans text-3xl justify-start">
                Change Password
              </h1>
              <div className="w-full flex flex-col py-4">
                <p className="flex my-3">
                  <span className="mr-2 text-sm text-sans-bold text-gray-600">
                    Type your new password
                  </span>
                </p>
                <input
                  type="password"
                  className="p-3 my-2 bg-gray-600 rounded"
                  placeholder="password"
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                  required
                />
                {errorMessage && <span>{errorMessage}</span>}
                <button
                  onClick={handleSubmit}
                  className="bg-red-700 py-3 my-3 font-sans"
                >
                  Reset Password
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
