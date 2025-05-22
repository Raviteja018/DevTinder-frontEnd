import React from "react";

export default function EditCard({ user }) {
  const { firstName, lastName, photoUrl, about, age, gender } = user;

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl shadow-xl overflow-hidden w-full max-w-sm mx-auto">
      <div className="p-6 flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg mb-4">
          <img
            src={photoUrl}
            alt={firstName}
            className="object-cover w-full h-full"
          />
        </div>
        <h2 className="text-xl font-semibold text-indigo-400 text-center">
          {firstName} {lastName}
        </h2>
        <p className="text-gray-300 text-sm text-center mt-2">{about}</p>
        <div className="mt-4 w-full text-sm text-gray-200 space-y-1">
          <div className="flex justify-between border-b border-gray-700 pb-1">
            <span className="font-medium">Age:</span>
            <span>{age}</span>
          </div>
          <div className="flex justify-between border-b border-gray-700 pb-1">
            <span className="font-medium">Gender:</span>
            <span className="capitalize">{gender}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
