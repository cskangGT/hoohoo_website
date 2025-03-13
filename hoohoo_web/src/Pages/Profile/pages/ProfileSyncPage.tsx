import React from 'react';
import styled from 'styled-components';
import {useUserStore} from '../../../storage/userStore';
import {defaultProfileImage, theme} from '../../../style';
import TopHeaderBackButtonWrapperView from '../components/TopHeaderBackButtonWrapperView';
const Container = styled.div``;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;

  row-gap: 20px;
  margin-bottom: 40px;
  @media (max-width: 500px) {
    row-gap: 20px;
  }
  @media (max-width: 400px) {
    row-gap: 10px;
  }
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;
const ProfileNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 6px;
  justify-content: center;
`;
const ProfileName = styled.h2`
  font-size: ${theme.fontSize.xl};
  font-weight: 600;
  font-family: Inter;

  margin: 0;
`;

const ProfileTag = styled.p`
  color: #888;
  font-size: ${theme.fontSize.rg};

  font-family: Inter;
  margin: 5px 0;
`;
const QRCodeImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;
const QRCodeText = styled.p`
  font-size: ${theme.fontSize.lg};
  font-family: Inter;
  color: ${theme.white};
  opacity: 0.8;
  text-align: center;
  line-height: 1.5;
`;
function ProfileSyncPage() {
  const {user} = useUserStore();
  return (
    <TopHeaderBackButtonWrapperView>
      <ProfileHeader>
        <ProfileImage src={user.profileImage || defaultProfileImage} />
        <ProfileNameContainer>
          <ProfileName>{user?.username}</ProfileName>
          <ProfileTag>@{user?.nameTag}</ProfileTag>
        </ProfileNameContainer>
      </ProfileHeader>
      <QRCodeImage src={'/Images/qrcode.png'} />
      <QRCodeText>
        Scan with your camera and <br />
        Tap ‘Sync’ in the EarthMera app
      </QRCodeText>
    </TopHeaderBackButtonWrapperView>
  );
}

export default ProfileSyncPage;
