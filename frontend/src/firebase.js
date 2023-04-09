// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkXuJ5fuOiN5ru25S0bNXGS0UdKD2L8Yo",
  authDomain: "dumapster.firebaseapp.com",
  projectId: "dumapster",
  storageBucket: "dumapster.appspot.com",
  messagingSenderId: "895309772426",
  appId: "1:895309772426:web:6df25a60118b353d535f73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);