import i18next from 'i18next';
import React from 'react';
import styled from 'styled-components';
import {theme} from '../../../style';
import {useProfile} from '../contexts/ProfileContext';

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

const Title = styled.h2<{$isDarkMode: boolean}>`
  font-size: ${theme.fontSize.lg};
  font-weight: 500;
  color: ${props => (props.$isDarkMode ? theme.white : theme.black)};
  margin: 0 0 24px 0;
  font-family: Inter;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ProfileImageContainer = styled.div<{$isDarkMode: boolean}>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
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

const UserName = styled.div<{$isDarkMode: boolean}>`
  font-size: ${theme.fontSize.xl};
  font-family: Inter;
  font-weight: 500;
  color: ${props => (props.$isDarkMode ? theme.white : theme.black)};
  margin-bottom: 4px;
`;

function SyncedUser({linkedUserInfo}: LinkedUserInfoProps) {
  const {profileImage, name} = linkedUserInfo;
  const localizedTexts: any = i18next.t('ProfileSyncPage', {
    returnObjects: true,
  });
  const {isDarkMode} = useProfile();

  return (
    <Container>
      <Title $isDarkMode={isDarkMode}>{localizedTexts.title}</Title>
      <UserContainer>
        <ProfileImageContainer $isDarkMode={isDarkMode}>
          <ProfileImage src={profileImage} alt={`${name}'s profile`} />
        </ProfileImageContainer>
        <UserInfoContainer>
          <UserName $isDarkMode={isDarkMode}>{name}</UserName>
        </UserInfoContainer>
      </UserContainer>
    </Container>
  );
}

export default SyncedUser;
