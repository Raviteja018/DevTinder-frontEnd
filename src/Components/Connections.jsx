import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../../utils/connectionSlice';


export default function Connections() {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchConnections = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data?.connections_data || []));
    } catch (err) {
      console.error(err.message);
      setError('Failed to load connections. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <>
        <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-10 px-4">
      <h2 className="text-3xl text-indigo-400 font-semibold text-center mb-6">
        Your Connections
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
      {!loading && !error && connections.length === 0 && (
        <div className="text-center text-gray-400 mt-6">
          You have no connections yet.
        </div>
      )}

      {/* Display Cards */}
      {!loading && !error && connections.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {connections?.filter(conn => conn && conn._id).map((conn) => (
            <div
              key={conn._id}
              className="bg-gray-800 text-white rounded-xl shadow-lg p-4 w-full max-w-sm mx-auto hover:scale-105 transition-transform duration-300"
            >
              <img
                src={conn.photoUrl}
                alt={conn.firstName}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div className="text-xl font-semibold mb-2">
                {conn.firstName} {conn.lastName}
              </div>
              <p className="text-sm text-gray-400 mt-3">
                {conn.about || 'No bio available.'}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
    </>
    
  );
}
