import React, { useState } from "react";
import loginbg from "../assets/loginbg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import AppHeader from "../components/AppHeader";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { SiSuperuser } from "react-icons/si";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginClick = async () => {
    try {
      
      const resp = await axios.post("http://localhost:7676/api/auth/login",{
        userName: userName,
        email: email,
        password: password
      });
      const {token, user} = resp.data;  
      console.log(resp.data);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
      
      toast.success("Login Success");
    } catch (error) {
      console.log("Error during login:", error.message);
      setError("Invalid email or password");
      toast.error("Invalid email or password");
    }
  };


  const guestUser = () =>{
    navigate("/");
  }

  
  return (
    <div className=" w-full h-screen">
      <div>
        <img
          className="sm:block absolute w-full h-screen object-cover"
          src={loginbg}
          alt=""
        />
        <div className=" bg-black/60 fixed top-0 left-0 w-full h-screen" />
        <div className=" relative w-full">
          <AppHeader login={false} />
          <div className=" mt-3 h-[600px] max-w-[480px] mx-auto bg-black/70 rounded-lg">
            <div className=" max-w-[330px] mx-auto py-9">
              <h1 className="flex font-sans text-3xl justify-start">Sign In</h1>
              <form action="/home" className="w-full flex flex-col py-3">
              <input
                  type="text"
                  name="userName"
                  className=" p-3 my-2 bg-gray-600 rounded"
                  placeholder="User Name"
                  onChange={(event) => setUserName(event.target.value)}
                  value={userName}
                />
                <input
                  type="email"
                  name="email"
                  className=" p-3 my-2 bg-gray-600 rounded"
                  placeholder="email"
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                />
                <input
                  type="password"
                  name="password"
                  className=" p-3 my-2 bg-gray-600 rounded"
                  placeholder="password"
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                />
                <button type="button"
                  onClick={handleLoginClick}
                  className=" bg-red-700 py-3 my-6 font-sans"
                >
                  Sign In
                </button>
                {error && <p className=" text-center text-red-500">{error}</p>}
                <div className="text-white justify-between items-center flex">
                  <p>
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </p>

                  <Link to="/help">Help?</Link>
                </div>
                <p className=" my-3">
                  <span className=" mr-2 text-sm text-sans-bold text-gray-600">
                    Don't have an account?
                  </span>
                  <Link to="/signup">Sign Up</Link>
                </p>
                <button type="button" onClick={guestUser} className=" flex justify-center items-center bg-red-700 py-3 my-6 font-sans">
                  <SiSuperuser className=" mr-2"></SiSuperuser>Try as Guest
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Login;





// onAuthStateChanged(firebaseAuth, (user) => {
    //   if (user) navigate("/");
    // });
    
    // const handleGoogleSignIn = async () => {
    //   try {
    //     const provider = new GoogleAuthProvider();
    //     await signInWithPopup(firebaseAuth, provider);
    //     toast.success("Login Success");
    //     navigate("/");
    //   } catch (error) {
    //     console.error("Error during Google sign-in:", error.message);
    //     toast.error("Error during Google sign-in");
    //   }
    // };


    //login using mongo
  // await signInWithEmailAndPassword(firebaseAuth, email, password);
    // import { firebaseAuth } from "../global/Firebase";
    // import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";