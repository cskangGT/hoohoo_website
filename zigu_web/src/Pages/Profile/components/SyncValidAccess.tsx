import { CircularProgress } from '@mui/material';
import i18next from 'i18next';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { syncEMUser } from '../../../api/jigulink/user.api';
import { useUserStore } from '../../../storage/userStore';
import { theme } from '../../../style';
type SyncValidAccessProps = {
  id: string;
  name: string;
  profileImage: string;
};
const SyncContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${theme.darkGray};
  color: ${theme.white};
  padding: 0px 20px;
`;

// 제목 스타일링
const Title = styled.h1`
  font-size: ${theme.fontSize.lg};
  font-weight: 600;
  text-align: center;
  margin-bottom: 12px;
`;

// 설명 스타일링
const Description = styled.p`
  font-size: ${theme.fontSize.rg};
  text-align: center;
  margin-bottom: 30px;
  max-width: 310px;
  line-height: 1.5;
`;

// 로고 연결 이미지 컨테이너
const LogoConnectionContainer = styled.div`
  margin: 24px 0;
  width: 100%;
  max-width: 280px;
  display: flex;
  justify-content: center;
`;

// 사용자 프로필 카드
const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #444444;
  border-radius: 12px;
  padding: 12px 16px;
  width: 100%;
  max-width: 280px;
  margin-bottom: 24px;
  column-gap: 12px;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
`;

const ProfileName = styled.p`
  font-size: ${theme.fontSize.md};
  font-family: Inter;
  color: ${theme.white};
`;

// 안내 메시지
const SyncMessage = styled.p`
  font-size: ${theme.fontSize.rg};
  text-align: center;
  margin-bottom: 40px;
  line-height: 1.5;
`;

// 버튼 스타일링
const SyncButton = styled.button`
  width: 100%;
  max-width: 280px;
  padding: 14px;
  border-radius: 50px;
  background-color: ${theme.mainNeon};
  color: ${theme.darkGray};
  font-size: ${theme.fontSize.md};
  font-weight: 600;
  border: none;
  margin-bottom: 12px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
const CancelButton = styled.button`
  width: 100%;
  max-width: 280px;
  padding: 14px;
  border-radius: 50px;
  background-color: ${theme.white};
  color: ${theme.darkGray};
  font-size: ${theme.fontSize.md};
  font-weight: 600;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
function SyncValidAccess({id, name, profileImage}: SyncValidAccessProps) {
  const localizedTexts: any = i18next.t('ProfileSyncFromAppPage', {
    returnObjects: true,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {user} = useUserStore();
  const navigate = useNavigate();
  const handleSync = async () => {
    setIsLoading(true);
    const response = await syncEMUser(id);
    if (response.result) {
      toast.success(localizedTexts.successToast);
      clearSessionStorage();
      navigate(`/${user?.nameTag}`);
    } else {
      if (response.status === 400) {
        toast.error(localizedTexts.alreadySynced);
      } else {
        toast.error(localizedTexts.errorToast);
      }
    }
    setIsLoading(false);
  };
  function clearSessionStorage() {
    sessionStorage.removeItem('redirectAfterAuth');
  }
  const handleCancel = async () => {
    clearSessionStorage();
    navigate(`/${user?.nameTag}`);
  };

  return (
    <SyncContainer>
      <Title>{localizedTexts.title}</Title>
      <Description>{localizedTexts.description}</Description>

      {/* 로고 연결 이미지 - 별도 이미지로 대체 예정 */}
      <LogoConnectionContainer>
        <img
          src="/Images/sync_zigu.png"
          alt="ZIGU to EarthMera connection"
          width="280"
        />
      </LogoConnectionContainer>

      {/* 프로필 카드 */}
      <ProfileCard>
        <ProfileImage src={profileImage} alt="Profile" />
        <ProfileName>{name}</ProfileName>
      </ProfileCard>

      {/* 동기화 안내 메시지 */}
      <SyncMessage>
        {localizedTexts.question[0]}
        {name}
        {localizedTexts.question[1]}
      </SyncMessage>

      {/* 버튼 영역 */}
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <SyncButton onClick={handleSync}>{localizedTexts.button}</SyncButton>
          <CancelButton onClick={handleCancel}>
            {localizedTexts.cancel}
          </CancelButton>
        </>
      )}
    </SyncContainer>
  );
}

export default SyncValidAccess;
