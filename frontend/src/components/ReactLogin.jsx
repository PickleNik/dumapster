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
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
      {currentForm === "login" ? (
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-white">Log in</h2>
          <form id="loginform" class="mt-8 space-y-6">
            <div class="-space-y-px rounded-md shadow-sm">
            <label htmlFor="email" class="sr-only">Email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder=" Email" id="email" name="email" required class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            <label htmlFor="password" class="sr-only">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder=" Password" id="password" name="password" required class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            <div class="flex items-center justify-between">
            <button onClick={handleLogin} class="group relative flex w-full justify-center rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log in</button>
            </div>
            </div>
            <div class="flex items-center justify-center">
            <p>Don't have an account? </p>
            <a href="" class="font-medium text-indigo-600 hover:text-indigo-500 ml-1" onClick={(e) => {
            e.preventDefault();
            setCurrentForm("register");
            }}> Register</a>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h1 class="mt-6 text-center text-3xl font-extrabold text-white">Create Account</h1>
          <form id="registerform" class="mt-8 space-y-1">
            <div class="-space-y-px rounded-md shadow-sm">
            <label htmlFor="name" class="sr-only">Name</label>
            <input onChange={(e) => setName(e.target.value)} type="name" placeholder=" Full Name" id="name" name="name" required class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            <label htmlFor="registeremail" class="sr-only">Email</label>
            <input onChange={(e) => setRegisterEmail(e.target.value)} type="email" placeholder=" Email" id="registeremail" name="registeremail" required class="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            <label htmlFor="registerpassword" class="sr-only">Password</label>
            <input onChange={(e) => setRegisterPassword(e.target.value)} type="password" placeholder=" Password" id="registerpassword" name="registerpassword" required class="relative block w-full rounded-b-md mb-80 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            <div class="flex items-center justify-between">
            <button onClick={handleRegister} class="group relative flex w-full justify-center rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            ><span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
            </svg>
          </span>Register</button>
          </div>
            <div class="flex items-center justify-center">
            <p>Already have an account?</p>
            <a href="" class="font-medium text-indigo-600 hover:text-indigo-500 ml-1" onClick={(e) => {
            e.preventDefault();
            setCurrentForm("login");
            }}>Log in</a>
            </div>
            </div>
          </form>
        </div>
      )}
      </div>
    </div>
  )
}

