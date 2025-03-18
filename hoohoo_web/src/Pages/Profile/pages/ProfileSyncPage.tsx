import React, {useEffect, useState} from 'react';
import QRCode from 'react-qr-code';
import styled from 'styled-components';
import {getSyncUserId} from '../../../api/jigulink/user.api';
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
  const {user} = useUserStore();
  const [deepLinkUrl, setDeepLinkUrl] = useState<string>('');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const fetchQRCode = async () => {
      // 모바일 환경인지 확인
      const mobile = window.innerWidth < 600;
      setIsMobile(mobile);
      const response = await getSyncUserId();
      if (response.result) {
        console.log('response.data.uuid', response.data.uuid);

        const linkUrl = `https://www.earthmera.com/redirect?link=earthmera://emsync?uuid=${response.data.uuid}`;
        setDeepLinkUrl(linkUrl);
      }
    };
    fetchQRCode();
  }, []);

  return (
    <TopHeaderBackButtonWrapperView>
      <ProfileHeader>
        <ProfileImage src={user.profileImage || defaultProfileImage} />
        <ProfileNameContainer>
          <ProfileName>{user?.username}</ProfileName>
          <ProfileTag>@{user?.nameTag}</ProfileTag>
        </ProfileNameContainer>
      </ProfileHeader>
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
      <QRCodeText>
        Scan with your camera and <br />
        Tap ‘Sync’ in the EarthMera app
      </QRCodeText>
      {isMobile && (
        <MobileQRCodeText onClick={() => window.open(deepLinkUrl, '_blank')}>
          Click Here
        </MobileQRCodeText>
      )}
    </TopHeaderBackButtonWrapperView>
  );
}

export default ProfileSyncPage;
