import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import EditCard from "./EditCard";

export default function EditProfile({ user }) {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age: Number(age), gender, about },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
      },3000)
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-10 p-4 bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen">
      {/* Form Section */}
      <div className="w-full max-w-lg bg-gray-900 rounded-3xl shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-center text-indigo-400 mb-6">
          Edit Profile
        </h2>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-300 mb-1">
              Photo URL
            </label>
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">Select Gender</option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-300 mb-1">About</label>
            <textarea
              rows="3"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <p className="text-red-500">{error}</p>
          <div className="sm:col-span-2">
            <button
              onClick={saveProfile}
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition duration-200"
            >
              Save
            </button>
            {showToast && <div className="toast toast-top toast-center">
              <div className="alert alert-success">
                <span>Profile saved successfully.</span>
              </div>
            </div>}
          </div>
        </form>
      </div>

      <div className="w-full max-w-sm">
        <EditCard
          user={{ firstName, lastName, photoUrl, about, age, gender }}
        />
      </div>
    </div>
  );
}
