import i18next from 'i18next';
import { LuCopy } from 'react-icons/lu';

import React from 'react';
import { MdClose, MdOutlineIosShare } from 'react-icons/md';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { theme } from '../../../style';
import { myLink } from '../../../util/links';
import { useProfile } from '../contexts/ProfileContext';

const ShareModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 400px;
  z-index: 1000;
`;
const ShareTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter;
  font-size: ${theme.fontSize['2xl']};
  color: ${theme.white};
  font-weight: 600;
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
`;
const NameText = styled.p`
  font-family: Inter;
  font-size: ${theme.fontSize['2xl']};
  color: ${theme.white};
  font-weight: 600;
  text-align: center;
  margin: 0px;
`;
const TagText = styled.p`
  font-family: Inter;
  font-size: ${theme.fontSize.rg};
  color: ${theme.gray};
  font-weight: 600;
  text-align: center;
  margin: 0px;
  margin-bottom: ${theme.spacing.sm};
`;
const ShareTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: ${theme.spacing.rg};
  background-color: #000000;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  flex: 1;
  width: 100%;
  padding: ${theme.spacing.lg};
`;
const ShareTitleText = styled.div`
  font-family: Inter;
  font-size: ${theme.fontSize.lg};
  color: ${theme.white};
  font-weight: 500;
  text-align: left;
  margin: 0px;
`;
const ShareLinkText = styled.div`
  font-family: Inter;
  font-size: ${theme.fontSize.rg};
  color: ${theme.mainNeon};
  font-weight: 400;
  text-align: left;
  margin: 0px;
`;
const ShareProfileContentContainer = styled.div`
  display: flex;
  background-color: ${theme.darkGray};
  border-radius: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: 60px;
  padding: ${theme.spacing.lg};
  padding-bottom: 0px;
`;
const ShareButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.lg};

  justify-content: center;
  flex: 1;
  width: 100%;
  gap: ${theme.spacing.rg};
`;
const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
`;

const ShareButtons = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  gap: ${theme.spacing.rg};
`;

const ShareThisButton = styled.button`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  gap: ${theme.spacing.md};
  flex: 1;
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.xm};
  border-radius: 20px;
  border: none;

  background-color: ${theme.white};
  color: ${theme.darkGray};
  cursor: pointer;
  font-size: ${theme.fontSize.md};
`;

const CopyLinkButton = styled(ShareThisButton)``;
const CloseButton = styled.button`
  position: absolute;
  top: 40px;
  right: 20px;
  background-color: transparent;
  color: ${theme.white};
  cursor: pointer;
  z-index: 1000;
  border: none;
`;
function ShareProfileModal({
  isShareModalOpen,
  handleCloseModal,
}: {
  isShareModalOpen: boolean;
  handleCloseModal: () => void;
}) {
  const {userData} = useProfile();
  const localizedTexts: any = i18next.t('ProfileLinkPage', {
    returnObjects: true,
  });
  const handleShareZIGU = () => {
    console.log('userData.name', userData.name);

    navigator
      .share({
        title:
          localizedTexts.shareZIGU[0] +
          userData.name +
          localizedTexts.shareZIGU[1],
        url: myLink + userData.nameTag,
      })
      .catch(console.error);
  };
  const handleCopyMyLink = () => {
    navigator.clipboard.writeText(myLink + userData.nameTag);
    toast.success(localizedTexts.copyMyLink);
  };
  return (
    isShareModalOpen && (
      <>
        <ModalOverlay onClick={handleCloseModal} />
        <ShareModal>
          <ShareTitle>{localizedTexts.shareTitle}</ShareTitle>
          <ShareProfileContentContainer>
            <ProfileImage src={userData.profileImage} />
            <NameText>{userData.name}</NameText>
            <TagText>@{userData.nameTag}</TagText>
            <ShareTextContainer>
              <ShareTitleText>
                {localizedTexts.shareZIGU[0]}
                {userData.name}
                {localizedTexts.shareZIGU[1]}
              </ShareTitleText>
              <ShareLinkText>
                {'zigu.my/' + userData.nameTag}
              </ShareLinkText>
            </ShareTextContainer>
          </ShareProfileContentContainer>
          <ShareButtonContainer>
            <ShareButtons>
              <ShareThisButton onClick={handleShareZIGU}>
                <MdOutlineIosShare size={20} color={theme.darkGray} />
                {localizedTexts.share}
              </ShareThisButton>
              <CopyLinkButton onClick={handleCopyMyLink}>
                <LuCopy size={20} color={theme.darkGray} />
                {localizedTexts.copyLink}
              </CopyLinkButton>
            </ShareButtons>
          </ShareButtonContainer>
        </ShareModal>
        <CloseButton onClick={handleCloseModal}>
          <MdClose size={30} color={theme.white} />
        </CloseButton>
      </>
    )
  );
}

export default ShareProfileModal;
