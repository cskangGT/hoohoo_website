import i18next from 'i18next';
import React, {useEffect, useState} from 'react';
import QRCode from 'react-qr-code';
import styled from 'styled-components';
import {getSyncUserId} from '../../../api/jigulink/user.api';
import {useUserStore} from '../../../storage/userStore';
import {defaultProfileImage, theme} from '../../../style';

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
  width: 80%;
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
const SyncButton = styled.button`
  background-color: transparent;
  border: 1px solid ${theme.white};

  border-radius: 20px;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  font-size: ${theme.fontSize.lg};
  font-family: Inter;

  color: ${theme.white};
  cursor: pointer;
  margin-bottom: ${theme.spacing['3xl']};
`;
function GoSyncView() {
  const localizedTexts: any = i18next.t('ProfileSyncPage', {
    returnObjects: true,
  });
  const {user, linkedUserInfo} = useUserStore();
  const [deepLinkUrl, setDeepLinkUrl] = useState<string>('');
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const fetchQRCode = async () => {
      // 모바일 환경인지 확인
      const mobile = window.innerWidth < 600;
      setIsMobile(mobile);
      const response = await getSyncUserId();
      if (response.result) {
        console.log('response', response);

        console.log('response.data.uuid', response.data.webUserId);

        const linkUrl = `https://www.earthmera.com/redirect?link=earthmera://emsync?webUserId=${response.data.webUserId}&name=${user?.username}&profileImage=${user?.profileImage}`;
        setDeepLinkUrl(linkUrl);
      }
    };
    !linkedUserInfo && fetchQRCode();
  }, []);

  return (
    <>
      <ProfileHeader>
        <ProfileImage src={user.profileImage || defaultProfileImage} />
        <ProfileNameContainer>
          <ProfileName>{user?.username}</ProfileName>
          <ProfileTag>@{user?.nameTag}</ProfileTag>
        </ProfileNameContainer>
      </ProfileHeader>
      {!isMobile && deepLinkUrl ? (
        <QRCodeBox>
          {
            <QRCode
              value={deepLinkUrl}
              size={200}
              viewBox={`0 0 256 256`}
              bgColor={theme.white}
            />
          }
        </QRCodeBox>
      ) : (
        <SyncButton onClick={() => window.open(deepLinkUrl, '_blank')}>
          {localizedTexts.button}
        </SyncButton>
      )}

      <QRCodeText
        dangerouslySetInnerHTML={{
          __html: localizedTexts.description,
        }}
      />
    </>
  );
}

export default GoSyncView;
