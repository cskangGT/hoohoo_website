import i18next from 'i18next';
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {useUserStore} from '../../../storage/userStore'; // 사용자 정보를 관리하는 스토어 가져오기
import {theme} from '../../../style';
import SyncValidAccess from '../components/SyncValidAccess';

// 로딩 표시를 위한 스타일 컴포넌트
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${theme.darkGray};
  color: ${theme.white};
`;

const LoadingText = styled.p`
  margin-top: 20px;
  font-size: ${theme.fontSize.lg};
`;

const ErrorContainer = styled(LoadingContainer)`
  color: ${theme.mainNeon};
`;

const ErrorText = styled(LoadingText)`
  color: ${theme.mainNeon};
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: ${theme.mainNeon};
  color: ${theme.darkGray};
  border: none;
  border-radius: 4px;
  font-size: ${theme.fontSize.md};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

function ProfileSyncFromAppPage() {
  const localizedTexts: any = i18next.t('ProfileSyncFromAppPage', {
    returnObjects: true,
  });
  const {isAuthenticated, user} = useUserStore(); // 사용자 인증 상태 확인
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isValidAccess, setIsValidAccess] = useState(false);
  const [error, setError] = useState<string>('');
  const [syncUserId, setSyncUserId] = useState<string>('');
  const [syncUserName, setSyncUserName] = useState<string>('');
  const [syncUserProfileImage, setSyncUserProfileImage] = useState<string>('');

  useEffect(() => {
    // URL에서 리다이렉트할 원래 경로와 ID 가져오기
    const params = new URLSearchParams(location.search);
    console.log('location', location);

    const userId = params.get('id');
    const userName = params.get('name');
    const userProfileImage = params.get('profileImage');
    console.log('userId', userId);

    if (!userId || !userName || !userProfileImage) {
      setError('올바르지 않은 접근입니다. ID가 필요합니다.');
      setIsLoading(false);
      return;
    }
    setSyncUserId(userId);
    setSyncUserName(decodeURIComponent(userName));
    setSyncUserProfileImage(decodeURIComponent(userProfileImage));
    const redirectPath = `/profile/sync-earthmera?id=${userId}&name=${
      userName
    }&profileImage=${userProfileImage}`;

    // 세션 스토리지에 리다이렉트 경로와 유효한 ID 저장
    sessionStorage.setItem('redirectAfterAuth', redirectPath);

    // 인증 상태 확인
    if (isAuthenticated && user) {
      setIsValidAccess(true);
    } else {
      navigate('/login', {replace: true});
    }
  }, [isAuthenticated, user, navigate, location]);

  // 로그인 페이지로 돌아가는 함수
  const handleBackToLogin = () => {
    navigate('/login', {replace: true});
  };

  // 로그인 상태이고 ID가 유효한 경우 별도의 컴포넌트를 렌더링
  if (isAuthenticated && user && isValidAccess) {
    return (
      <SyncValidAccess
        id={syncUserId}
        name={syncUserName}
        profileImage={syncUserProfileImage}
      />
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorText>{error}</ErrorText>
        <BackButton onClick={handleBackToLogin}>
          {localizedTexts.loading.button}
        </BackButton>
      </ErrorContainer>
    );
  }

  return (
    <LoadingContainer>
      <LoadingText>{localizedTexts.loading.title}</LoadingText>
      <LoadingText>{localizedTexts.loading.description}</LoadingText>
    </LoadingContainer>
  );
}

export default ProfileSyncFromAppPage;
