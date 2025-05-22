import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { addRequests, removeRequest } from '../../utils/RequestSlice';
import { useSelector } from "react-redux";

export default function Requests() {
  const requests = useSelector(store => store.requests);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const fetchRequests = async() => {
    try {
      const res = await axios.get(BASE_URL+"/user/requests/received", { withCredentials:true });
      dispatch(addRequests(res.data.data));
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  const reviewRequests = async(status, id) => {
    try {
      const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+id, {}, {withCredentials:true});
      dispatch(removeRequest(id));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    fetchRequests();
  },[])
  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-10 px-4">
      <h2 className="text-3xl text-indigo-400 font-semibold text-center mb-6">
        Your Requests
      </h2>

      {/* Loading */}
      {loading && (
        <div className="text-center text-white mt-10">
          <span className="loading loading-bars loading-lg" />
          <p className="mt-2">Fetching your connections...</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="text-center text-red-400 mt-6">{error}</div>
      )}

      {/* Empty */}
      {!loading && !error && requests.length === 0 && (
        <div className="text-center text-gray-400 mt-6">
          You have no requests yet.
        </div>
      )}

      {/* Display Cards */}
      {!loading && !error && requests.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-gray-800 text-white rounded-xl shadow-lg p-4 w-full max-w-sm mx-auto hover:scale-105 transition-transform duration-300"
            >
              <img
                src={req.fromUserId.photoUrl }
                alt={req.fromUserId.firstName}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div className="text-xl font-semibold mb-2">
                {req.fromUserId.firstName}
              </div>
              <p className="text-sm text-gray-400 mt-3">
                {req.fromUserId.about || 'No bio available.'}
              </p>
              <div className="flex justify-between mt-4">
      <button
        onClick={() => reviewRequests("accepted", req._id)}
        className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded"
      >
        Accept
      </button>
      <button
        onClick={() => reviewRequests("rejected", req._id)}
        className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
      >
        Reject
      </button>
    </div>
            </div>
          ))}
        </div>
      )}
    </section>
    </>
  )
}
