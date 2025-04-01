import React, {useEffect} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import styled from 'styled-components';
import useWindowResize from '../../../components/hooks/useWindowResize';
import i18next from '../../../lang/i18n';
import {useUserStore} from '../../../storage/userStore';
import {defaultProfileImage, theme} from '../../../style';
import FixedBottomEditView from '../components/FixedBottomEditView';
import ProfileTopHeader from '../components/ProfileTopHeader';
import ProfileWidgetGrid from '../components/ProfileWidgetGrid';
import {useProfile} from '../contexts/ProfileContext';

export const PROFILE_SCREEN_WIDTH =
  window.innerWidth > 600 ? 600 : window.innerWidth;
export const PADDING_WIDTH = PROFILE_SCREEN_WIDTH * 0.06;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px ${PADDING_WIDTH}px;
  margin-bottom: 60px;
  color: ${theme.white};
  position: relative;
`;

const ProfileImage = styled.img<{size?: number}>`
  width: ${props => props.size || 100}px;
  height: ${props => props.size || 100}px;
  border-radius: 50%;
  object-fit: cover;
`;
const Logo = styled.div`
  margin-bottom: 10px;
`;

const ProfileName = styled.h1`
  font-size: ${theme.fontSize.xl};
  font-family: Inter;
  font-weight: 600;
  margin: 5px 0;
`;
const VacantContainer = styled.div`
  width: 100%;
  height: ${window.innerHeight - 100}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const VacantText = styled.p`
  color: ${theme.white};
  font-size: ${theme.fontSize.xl};
  font-weight: 400;
  text-align: center;
  margin: 0 20px;
  line-height: 1.5;
`;
const ProfileTag = styled.p`
  color: #888;
  font-size: ${theme.fontSize.md};
  font-family: Inter;
  margin: 5px 0 15px 0;
  margin-bottom: ${theme.spacing.xl};
`;

const CarbonSaving = styled.p`
  color: #4cd964;
  margin: 5px 0 25px 0;
`;

function ProfileLinkPage() {
  const localizedTexts: any = i18next.t('ProfileLinkPage', {
    returnObjects: true,
  });
  const {state} = useLocation();
  const showTooltip = state?.showTooltip;
  const keepEditing = state?.keepEditing;
  const {user, isAuthenticated} = useUserStore();
  const {
    fetchUserProfile,
    noProfileData,
    userData,
    currentWidgets,
    isMyLink,
    isEditingItem,
    isEditing,
    profileError,

    setIsEditing,
  } = useProfile();
  const nameTag = useParams()?.nameTag;

  const {width: resizedWidth} = useWindowResize({
    maxWidth: 600,
  });

  useEffect(() => {
    !keepEditing && fetchUserProfile(nameTag);
  }, [nameTag]);

  useEffect(() => {
    if (keepEditing) {
      window.history.replaceState({}, '', location.pathname);
    }
  }, [keepEditing]);

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
        <ProfileContainer>
          <Logo>
            <ProfileImage
              src={userData.profileImage || defaultProfileImage}
              size={resizedWidth * 0.2}
            />
          </Logo>
          <ProfileName>{userData.name}</ProfileName>
          <ProfileTag>@{nameTag}</ProfileTag>

          <ProfileWidgetGrid />
        </ProfileContainer>
      )}
      {isMyLink && <FixedBottomEditView />}
    </>
  );
}

export default ProfileLinkPage;
