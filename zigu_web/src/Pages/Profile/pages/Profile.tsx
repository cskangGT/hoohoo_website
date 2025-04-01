import React from 'react';
import {Outlet, useParams} from 'react-router-dom';
import MobileViewFrame from '../components/MobileViewFrame';
import ProfileBackground from '../components/ProfileBackground';
import {ProfileProvider} from '../contexts/ProfileContext';

function Profile() {
  const nameTag = useParams()?.nameTag;

  return (
    <ProfileProvider nameTag={nameTag}>
      <ProfileBackground>
        <MobileViewFrame>
          <Outlet />
        </MobileViewFrame>
      </ProfileBackground>
    </ProfileProvider>
  );
}

export default Profile;
