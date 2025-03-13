import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import {getUserLinkProfile} from '../../../api/jigulink/jigulink.api';
import i18next from '../../../lang/i18n';
import {useUserStore} from '../../../storage/userStore';
import {defaultProfileImage, theme} from '../../../style';
import FixedBottomEditView from '../components/FixedBottomEditView';
import MobileViewFrame from '../components/MobileViewFrame';
import ProfileTopHeader from '../components/ProfileTopHeader';
import ProfileWidgetGrid from '../components/ProfileWidgetGrid';

import {ProfileWidgetItemType} from '../types/WidgetItemType';
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

type UserData = {
  name: string;
  nameTag: string;
  profileImage: string;
  bio: string;
  carbonSaving: number;
};
function ProfileLinkPage() {
  const localizedTexts: any = i18next.t('ProfileLinkPage', {
    returnObjects: true,
  });
  const [resizedWidth, setResizedWidth] =
    useState<number>(PROFILE_SCREEN_WIDTH);
  const {user, isAuthenticated} = useUserStore();
  const [userData, setUserData] = useState<UserData>({
    name: '',
    nameTag: '',
    profileImage: '',
    bio: '',
    carbonSaving: 0,
  });
  const {nameTag} = useParams();
  const [isMyLink, setIsMyLink] = useState<boolean>(true);
  const [widgets, setWidgets] = useState<ProfileWidgetItemType[]>([]);
  useEffect(() => {
    const handleResize = () => {
      setResizedWidth(window.innerWidth > 600 ? 600 : window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    console.log('user', user);

    const fetchUserData = async () => {
      const response = await getUserLinkProfile(nameTag || '');
      console.log('response', response);
      setWidgets(response.widgets);
      setUserData(response);
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    setIsMyLink(user.nameTag === nameTag && isAuthenticated);
  }, [user, nameTag, isAuthenticated]);

  return (
    <MobileViewFrame>
      <ProfileTopHeader isMyLink={isMyLink} nameTag={nameTag || ''} />
      <ProfileContainer>
        <Logo>
          <ProfileImage
            src={userData.profileImage || defaultProfileImage}
            size={PROFILE_SCREEN_WIDTH * 0.2}
          />
        </Logo>
        <ProfileName>{userData.name}</ProfileName>
        <ProfileTag>@{nameTag}</ProfileTag>
        {/* <CarbonSaving>
          {localizedTexts.carbon[0]} 1032{localizedTexts.carbon[1]}
        </CarbonSaving> */}

        <ProfileWidgetGrid widgets={widgets} isMyLink={isMyLink} />
      </ProfileContainer>
      {isMyLink && <FixedBottomEditView />}
    </MobileViewFrame>
  );
}

export default ProfileLinkPage;
