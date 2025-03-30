import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ProfileProvider } from '../contexts/ProfileContext';
const ProfileContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/Images/profile_background.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;
function Profile() {
  const nameTag = useParams()?.nameTag;
  console.log('nameTag', nameTag);
  return (
    <ProfileProvider nameTag={nameTag}>
      <ProfileContainer>
        <Outlet />
      </ProfileContainer>
    </ProfileProvider>
  );
}

export default Profile;
