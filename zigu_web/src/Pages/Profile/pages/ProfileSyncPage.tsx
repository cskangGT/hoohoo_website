import React from 'react';
import styled from 'styled-components';
import {useUserStore} from '../../../storage/userStore';
import {theme} from '../../../style';
import GoSyncView from '../components/GoSyncView';
import SyncedUser from '../components/SyncedUser';
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
const QRCodeBox = styled.div`
  padding: 8px;
  background-color: ${theme.white};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const QRCodeText = styled.p`
  font-size: ${theme.fontSize.lg};
  font-family: Inter;
  color: ${theme.white};
  opacity: 0.8;
  text-align: center;
  line-height: 1.5;
`;
const MobileQRCodeText = styled.p`
  font-size: ${theme.fontSize.lg};
  font-family: Inter;
  color: ${theme.white};
  opacity: 0.8;
  text-align: center;
  line-height: 1.5;
  cursor: pointer;
  text-decoration: underline;
`;
function ProfileSyncPage() {
  const {linkedUserInfo, isSyncedWithEM} = useUserStore();

  return (
    <TopHeaderBackButtonWrapperView>
      {isSyncedWithEM ? (
        <SyncedUser linkedUserInfo={linkedUserInfo} />
      ) : (
        <GoSyncView />
      )}
    </TopHeaderBackButtonWrapperView>
  );
}

export default ProfileSyncPage;
