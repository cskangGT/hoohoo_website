import React, {useEffect, useRef} from 'react';
import styled, {css} from 'styled-components';
import {useProfile} from '../contexts/ProfileContext';
import {MobileViewFrameProps} from '../types';

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

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
            url('/Images/profile_background.jpeg');
        `}
`;

interface ProfileBackgroundProps {
  children: React.ReactElement<MobileViewFrameProps>;
}

function ProfileBackground({children}: ProfileBackgroundProps) {
  const {isDarkMode} = useProfile();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mobileContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    const handleBackgroundScroll = () => {
      if (wrapper && mobileContentRef.current) {
        console.log('mobileContentRef.current', mobileContentRef.current);

        mobileContentRef.current.scrollTop = wrapper.scrollTop;
      }
    };

    if (wrapper) {
      wrapper.addEventListener('scroll', handleBackgroundScroll);
      return () => {
        wrapper.removeEventListener('scroll', handleBackgroundScroll);
      };
    }
  }, []);

  const setMobileContentRef = (ref: HTMLDivElement | null) => {
    mobileContentRef.current = ref;
  };

  return (
    <BackgroundWrapper ref={wrapperRef}>
      <ProfileContainer $isDarkMode={isDarkMode} />
      {React.cloneElement(children, {
        getMobileContentRef: setMobileContentRef,
      })}
    </BackgroundWrapper>
  );
}

export default ProfileBackground;
