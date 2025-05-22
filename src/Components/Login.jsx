import axios from "axios";
import React, { useState } from "react";
import { addUser } from "../../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";

export default function Login() {
  const user = useSelector(store => store.user);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setisLoginForm] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      const { user } = res.data;
      dispatch(addUser(user));
      navigate("/");
      setisLoginForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignup = async () => {
    try {
      const res = axios.post(BASE_URL+"/signup", {firstName, lastName, emailId, password}, {withCredentials: true});
      dispatch(addUser(res.data));
      return navigate("/profile");
    } catch (err) {
      console.error(err?.response?.data);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-black px-4 sm:px-6 lg:px-8">
      <div className="w-[80%] max-w-sm sm:max-w-sm bg-gray-900 rounded-3xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-indigo-400 mb-6 sm:mb-8">
          {isLoginForm? "Login" : "Sign up"}
        </h2>
        <form className="space-y-5 sm:space-y-6">
          {!isLoginForm && (<div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              autoComplete="firstName"
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>)}

          {(!isLoginForm && <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              autoComplete="current-password"
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>)}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm sm:text-base font-semibold tracking-wide transition duration-200"
            onClick={isLoginForm? handleLogin : handleSignup}
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-5 sm:mt-6">
          {isLoginForm? "Don’t have an account? " : "Already a user? "}
          <a 
          onClick={() => setisLoginForm(!isLoginForm)}
          href="#" className="text-indigo-400 font-medium hover:underline">
           { isLoginForm? "Sign Up" : "Login"}
          </a>
        </p>
      </div>
    </div>
  );
}
