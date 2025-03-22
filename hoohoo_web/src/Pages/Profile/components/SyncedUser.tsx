import i18next from 'i18next';
import React from 'react';
import styled from 'styled-components';
import {theme} from '../../../style';

interface LinkedUserInfoProps {
  linkedUserInfo: {
    profileImage: string;
    name: string;
    userId: string;
  };
}

const Container = styled.div`
  width: 100%;
  padding: ${theme.spacing['2xl']};
  border-radius: 8px;
`;

const Title = styled.h2`
  font-size: ${theme.fontSize.lg};
  font-weight: 500;
  color: #ffffff;
  margin: 0 0 24px 0;
  font-family: Inter;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ProfileImageContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #333333;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserName = styled.div`
  font-size: ${theme.fontSize.xl};
  font-family: Inter;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 4px;
`;

const UserId = styled.div`
  font-size: 18px;
  color: #777777;
`;

function SyncedUser({linkedUserInfo}: LinkedUserInfoProps) {
  const {profileImage, name} = linkedUserInfo;
  const localizedTexts: any = i18next.t('ProfileSyncPage', {
    returnObjects: true,
  });
  return (
    <Container>
      <Title>{localizedTexts.title}</Title>
      <UserContainer>
        <ProfileImageContainer>
          <ProfileImage src={profileImage} alt={`${name}'s profile`} />
        </ProfileImageContainer>
        <UserInfoContainer>
          <UserName>{name}</UserName>
        </UserInfoContainer>
      </UserContainer>
    </Container>
  );
}

export default SyncedUser;
