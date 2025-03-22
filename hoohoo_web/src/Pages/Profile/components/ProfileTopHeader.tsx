import i18next from 'i18next';
import React from 'react';
import {LuSettings} from 'react-icons/lu';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import styled from 'styled-components';
import {useUserStore} from '../../../storage/userStore';
import {theme} from '../../../style';
import {myLink} from '../../../util/links';
const TopHeaderContainer = styled.div`
  width: calc(100% - ${theme.spacing.xm} * 2);
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.sm} ${theme.spacing.xm};
`;
const TopHeaderLeft = styled.div``;
const TopHeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.sm};
`;
const CopyButton = styled.button`
  border-radius: 10px;
  padding: 4px ${theme.spacing.rg};
  border: 1px solid ${theme.white};
  background-color: transparent;
  cursor: pointer;
  color: ${theme.white};
  font-size: ${theme.fontSize.rg};
  font-family: Inter;
  font-weight: 300;
`;
const SettingButton = styled.button`
  padding: 0px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${theme.white};
`;
const LogoButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${theme.white};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LogoImage = styled.img`
  width: 40px;
  height: 40px;

  object-fit: cover;
`;
function ProfileTopHeader({
  isMyLink,
  nameTag,
}: {
  isMyLink: boolean;
  nameTag: string;
}) {
  const localizedTexts: any = i18next.t('ProfileLinkPage', {
    returnObjects: true,
  });
  const {user, isAuthenticated} = useUserStore();
  const navigate = useNavigate();
  function handleCopyMyLink() {
    navigator.clipboard.writeText(myLink + nameTag);
    toast.success(localizedTexts.copyMyLink);
  }
  function handleSetting() {
    navigate('/profile/settings');
  }
  function handleLogin() {
    navigate('/login');
  }
  function handleLogo() {
    if (isAuthenticated) {
      const link = '/zigu/' + user?.nameTag;
      console.log('link', link);

      navigate(link);
    } else {
      navigate('/login');
    }
  }
  return (
    <TopHeaderContainer>
      <TopHeaderLeft>
        <LogoButton onClick={handleLogo}>
          <LogoImage src={'/Images/zigulink.png'} />
        </LogoButton>
      </TopHeaderLeft>
      <TopHeaderRight>
        {isMyLink && (
          <>
            <CopyButton onClick={handleCopyMyLink}>
              {localizedTexts.copyMyLinkButton}
            </CopyButton>

            <SettingButton onClick={handleSetting}>
              <LuSettings size={22} color={theme.white} />
            </SettingButton>
          </>
        )}
      </TopHeaderRight>
    </TopHeaderContainer>
  );
}

export default ProfileTopHeader;
