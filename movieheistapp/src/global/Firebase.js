// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYl653pKu1ynae1eG0eA8Jjh0g65NJCIo",
  authDomain: "movieheist-react.firebaseapp.com",
  projectId: "movieheist-react",
  storageBucket: "movieheist-react.appspot.com",
  messagingSenderId: "599347552743",
  appId: "1:599347552743:web:831ee9a3ab0ca180c3dd42",
  measurementId: "G-8LGTH8RDX7",
  databaseURL: "https://movieheist-react-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDatabase = getDatabase(app);