import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { addUser } from "../../utils/userSlice";
import axios from "axios";

export default function Body() {
  const location = useLocation()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(store => store.user);
  const fetchUser = async () => {
    if(userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
     if(err.response?.status === 400){
       navigate("/login")
     }
      console.error(err);
    }
  };

  useEffect(() => {
    if(location.pathname !== "/login")
    fetchUser();
  }, [location.pathname]);


  return (
    <div>
      <Navbar />
      <Outlet />
      {/* {userData && <Footer />} */}
    </div>
  );
}
