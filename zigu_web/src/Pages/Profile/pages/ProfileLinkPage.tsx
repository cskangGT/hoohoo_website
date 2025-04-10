import React, {useEffect} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import styled from 'styled-components';
import useWindowResize from '../../../components/hooks/useWindowResize';
import i18next from '../../../lang/i18n';
import {theme} from '../../../style';
import FixedBottomEditView from '../components/FixedBottomEditView';
import ProfileImageInProfile from '../components/ProfileImageInProfile';
import ProfileTopHeader from '../components/ProfileTopHeader';
import ProfileWidgetGrid from '../components/ProfileWidgetGrid';
import {useProfile} from '../contexts/ProfileContext';

export const PROFILE_SCREEN_WIDTH =
  window.innerWidth > 600 ? 600 : window.innerWidth;
export const PADDING_WIDTH = PROFILE_SCREEN_WIDTH * 0.06;
const ProfileContainer = styled.div<{paddingWidth?: number}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px ${props => props.paddingWidth || PADDING_WIDTH}px;
  margin-bottom: 60px;
  color: ${theme.white};
  position: relative;
`;

const Logo = styled.div`
  margin-bottom: 10px;
`;

const ProfileName = styled.h1<{$isDarkMode: boolean}>`
  font-size: ${theme.fontSize.xl};
  font-family: Inter;
  font-weight: 600;
  margin: 5px 0;
  color: ${props => (props.$isDarkMode ? theme.white : '#000000')};
`;
const VacantContainer = styled.div`
  width: 100%;
  height: ${window.innerHeight - 100}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProfileImageContainer = styled.div`
  margin-bottom: 10px;
`;
const ProfileImage = styled.img<{size?: number}>`
  width: ${props => props.size || 100}px;
  height: ${props => props.size || 100}px;
  border-radius: 50%;
  object-fit: cover;
`;
const VacantText = styled.p`
  color: ${theme.white};
  font-size: ${theme.fontSize.xl};
  font-weight: 400;
  text-align: center;
  margin: 0 20px;
  line-height: 1.5;
`;

const ProfileTag = styled.p<{$isDarkMode: boolean}>`
  color: ${props => (props.$isDarkMode ? '#888' : '#5d5d5d')};
  font-size: ${theme.fontSize.md};
  font-family: Inter;
  margin: 5px 0 15px 0;
  margin-bottom: ${theme.spacing.xl};
`;

function ProfileLinkPage() {
  const localizedTexts: any = i18next.t('ProfileLinkPage', {
    returnObjects: true,
  });
  const {state} = useLocation();
  const location = useLocation();
  const stateIsEditing = state?.isEditing;
  const keepEditing = state?.keepEditing;

  const {
    fetchUserProfile,
    noProfileData,
    userData,
    isMyLink,
    isDarkMode,
    profileError,
    setIsEditing,
  } = useProfile();
  const nameTag = useParams()?.nameTag;

  const {width: resizedWidth, paddingWidth} = useWindowResize({
    maxWidth: 600,
  });
  useEffect(() => {
    if (stateIsEditing) {
      setIsEditing(true);
      window.history.replaceState({}, '', location.pathname);
    }
  }, [stateIsEditing]);
  useEffect(() => {
    console.log('keepEditing', keepEditing);
    console.log('location changed:', location.pathname);
    console.log('nameTag:', nameTag);

    !keepEditing && fetchUserProfile(nameTag);
    if (keepEditing) {
      window.history.replaceState({}, '', location.pathname);
    }
  }, [nameTag, location.pathname]);

  return (
    <>
      <ProfileTopHeader isMyLink={isMyLink} nameTag={nameTag || ''} />
      {noProfileData || profileError ? (
        <VacantContainer>
          {profileError ? (
            <VacantText>{localizedTexts.profileError}</VacantText>
          ) : (
            <VacantText>
              {localizedTexts.noProfileData[0]}
              {`"${nameTag}"`}
              {localizedTexts.noProfileData[1]}
            </VacantText>
          )}
        </VacantContainer>
      ) : (
        <ProfileContainer paddingWidth={paddingWidth}>
          {isMyLink ? (
            <ProfileImageInProfile resizedWidth={resizedWidth} />
          ) : (
            <ProfileImageContainer>
              <ProfileImage
                src={userData.profileImage}
                size={resizedWidth * 0.2}
              />
            </ProfileImageContainer>
          )}

          <ProfileName $isDarkMode={isDarkMode}>{userData.name}</ProfileName>
          <ProfileTag $isDarkMode={isDarkMode}>@{nameTag}</ProfileTag>

          <ProfileWidgetGrid />
        </ProfileContainer>
      )}
      {isMyLink && <FixedBottomEditView />}
    </>
  );
}

export default ProfileLinkPage;
