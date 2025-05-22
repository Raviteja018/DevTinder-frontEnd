import axios from "axios";
import React from "react";
import { BASE_URL } from "../../utils/constants";
import { removeFeed } from "../../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";

export default function UserCard({ user }) {
  const feed = useSelector(store => store.feed);

  const dispatch = useDispatch();

  const handleSendRequest = async(status, id) => {
    try {
      const res = await axios.post(BASE_URL+"/request/"+status+"/"+id, {}, {withCredentials:true});
      console.log(res.data)
      dispatch(removeFeed(id))
    } catch (err) {
      console.error(err.message);
    }
  }

  if(!feed) return;

  if(feed.length <= 0) {
    return <h1>no new feed available</h1>
  }

  if(!user) return null;

  const { firstName, lastName, photoUrl, about } = user;
  return (
    <>
      {user && (
        <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl w-full max-w-xs mx-auto transform transition hover:scale-105 duration-300">
          <div className="p-5 flex flex-col items-center">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-500 shadow-md mb-4">
              <img
                src={photoUrl}
                alt={firstName}
                className="object-cover w-full h-full"
              />
            </div>
            <h2 className="text-lg font-bold text-indigo-400 text-center">
              {firstName} {lastName}
            </h2>
            <p className="text-gray-300 text-sm text-center mt-2">{about}</p>
            <div className="flex gap-3 mt-4">
              <button 
              onClick={() => handleSendRequest("ignored", user._id)}
              className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm transition duration-200">
                Ignore
              </button>
              <button
              onClick={() => handleSendRequest("interested", user._id)}
               className="px-4 py-1 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm transition duration-200">
                Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
