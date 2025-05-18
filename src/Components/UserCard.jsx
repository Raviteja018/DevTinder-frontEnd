
import React from "react";
import { useSelector } from "react-redux";

export default function UserCard() {
    const feed = useSelector(store => store.feed[0])
    const {firstName, lastName, photoUrl, about} = feed
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt={firstName} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    <p>{about}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Connect</button>
    </div>
  </div>
</div>
    </>
  );
}
