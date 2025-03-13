import React from 'react';
import {LuSettings} from 'react-icons/lu';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import styled from 'styled-components';
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
  padding: 2px ${theme.spacing.sm};
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
function ProfileTopHeader({
  isMyLink,
  nameTag,
}: {
  isMyLink: boolean;
  nameTag: string;
}) {
  const navigate = useNavigate();
  function handleCopyMyLink() {
    navigator.clipboard.writeText(myLink + nameTag);
    toast.success('Copied to clipboard');
  }
  function handleSetting() {
    navigate('/profile/settings');
  }
  return (
    <TopHeaderContainer>
      <TopHeaderLeft></TopHeaderLeft>
      {isMyLink && (
        <TopHeaderRight>
          {<CopyButton onClick={handleCopyMyLink}>Copy My URL</CopyButton>}
          <SettingButton onClick={handleSetting}>
            <LuSettings size={22} color={theme.white} />
          </SettingButton>
        </TopHeaderRight>
      )}
    </TopHeaderContainer>
  );
}

export default ProfileTopHeader;
