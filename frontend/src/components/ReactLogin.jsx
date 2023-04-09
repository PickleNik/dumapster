import React, { useState } from "react";
import "./ReactLogin.css";
import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const ReactLogin = () => {
  const [email, setEmail] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [currentForm, setCurrentForm] = useState("login");
  const [name, setName] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log(userCredential)})

  }

  const handleRegister = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword).then((userCredential) => {
      console.log(userCredential)})
      .then(setCurrentForm("login")) //Switches back to login form after registering
  }


  return (
    <div>
      {currentForm === "login" ? (
        <div>
          <form id="loginform">
            <label htmlFor="email">Email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" id="email" name="email" />
            <br></br>
            <label htmlFor="password">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" name="password" />
            <button onClick={handleLogin}>Log in</button>
            <p>Don't have an account?</p>
            <button onClick={(e) => {
            e.preventDefault();
            setCurrentForm("register");
            }}>Register</button>
          </form>
        </div>
      ) : (
        <div>
          <form id="registerform">
            <label htmlFor="name">Name</label>
            <input onChange={(e) => setName(e.target.value)} type="name" placeholder="Full Name" id="name" name="name" />
            <br></br>
            <label htmlFor="registeremail">Email</label>
            <input onChange={(e) => setRegisterEmail(e.target.value)} type="email" placeholder="Email" id="registeremail" name="registeremail" />
            <label htmlFor="registerpassword">Password</label>
            <input onChange={(e) => setRegisterPassword(e.target.value)} type="password" placeholder="Password" id="registerpassword" name="registerpassword" />
            <button onClick={handleRegister}>Register</button>
            <p>Already have an account?</p>
            <button onClick={(e) => {
              e.preventDefault();
              setCurrentForm("login");
              }}>Log in</button>
          </form>
        </div>
      )}
    </div>
  )
}

