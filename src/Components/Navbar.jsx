import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { removeUser } from "../../utils/userSlice";

export default function Navbar() {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const handleLogout = async() => {
    try{
      await axios.post(BASE_URL+"/logout",{}, { withCredentials: true })
    dispatch(removeUser())
    navigate("/login")
  }catch(err){
    console.error(err);
  }
  }

  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">🖥️ devTinder</Link>
        </div>
        <div className="flex gap-2">

          {user && <div className="dropdown dropdown-end mx-5 flex justify-between items-center">
            <p className="px-4">Welcome {user.firstName}</p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow "
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/" className="justify-between">
                  Feed
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>}
        </div>
      </div>
    </>
  );
}
