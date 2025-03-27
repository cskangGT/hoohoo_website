import React from 'react';
import {Outlet, useParams} from 'react-router-dom';
import {ProfileProvider} from '../contexts/ProfileContext';

function Profile() {
  const nameTag = useParams()?.nameTag;
  console.log('nameTag', nameTag);
  return (
    <ProfileProvider nameTag={nameTag}>
      <Outlet />
    </ProfileProvider>
  );
}

export default Profile;
