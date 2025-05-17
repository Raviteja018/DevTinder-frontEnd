import axios from "axios";
import React, { useState } from "react";
// import { useCookies } from "react-cookie";
import { addUser } from "../../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";

export default function Login() {
  // const [cookies, setCookie] = useCookies(["token"]);
  const [emailId, setEmailId] = useState("virat@gmail.com");
  const [password, setPassword] = useState("Virat@123");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    try{
        const res = await axios.post(BASE_URL+'/login', 
  { emailId, password },
  { withCredentials: true,}
)
    const { user } = res.data;

    // setCookie("token", token, {
    //    path: "/",
    //    httpOnly: true,
    //    maxAge: 24 * 60 * 60,
    //    secure: false,
    //    sameSite: "Lax",
    // })

    dispatch(addUser(user))
    navigate("/")

    // console.log("User:", user);
    }catch(err){
      console.error(err)
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 px-4 sm:px-6 lg:px-8">
      <div className="w-[80%] max-w-sm sm:max-w-sm bg-white rounded-3xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-indigo-600 mb-6 sm:mb-8">
          Login
        </h2>
        <form className="space-y-5 sm:space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full input input-bordered focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="w-full input input-bordered focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full btn btn-primary text-sm sm:text-base font-semibold tracking-wide"
            onClick={handleLogin}
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5 sm:mt-6">
          Don’t have an account?{" "}
          <a href="#" className="text-indigo-600 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
