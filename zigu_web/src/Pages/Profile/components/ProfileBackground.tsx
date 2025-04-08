import React from 'react';
import styled, {css} from 'styled-components';
import {useProfile} from '../contexts/ProfileContext';
import {MobileViewFrameProps} from '../types';

const ProfileContainer = styled.div<{$isDarkMode: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  z-index: -1;
  ${props =>
    props.$isDarkMode
      ? css`
          background-image: linear-gradient(
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0.7)
            ),
            url('/Images/profile_background.jpeg');
        `
      : css`
          background-image: linear-gradient(
              rgba(255, 255, 255, 0.5),
              rgba(255, 255, 255, 0.7)
            ),
            url('/Images/profile_white_background.jpg');
        `}
`;

interface ProfileBackgroundProps {
  children: React.ReactElement<MobileViewFrameProps>;
}

function ProfileBackground({children}: ProfileBackgroundProps) {
  const {isDarkMode} = useProfile();

  return (
    <ProfileContainer $isDarkMode={isDarkMode}>{children}</ProfileContainer>
  );
}

export default ProfileBackground;
