import React, { useState } from 'react';
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';
import { Store } from 'lucide-react';

export default function Profile() {
  const user = useSelector(store => store.user);
  return (
    <>
      {user && <EditProfile user={user}/>}
    </>
  );
}
