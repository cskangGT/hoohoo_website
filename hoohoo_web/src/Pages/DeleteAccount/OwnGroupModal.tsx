import i18next from 'i18next';
import React from 'react';
import styled from 'styled-components';
import {LineDivider, theme} from '../../style';
import {ModalBackground} from '../EMMedia/Blog/BlogModal';
import {ModalContent} from './ManageAccModal';
const Wrapper = styled.div`
  padding: 6rem 2rem 3rem;
  @media screen and (max-width: 800px) {
    padding: auto;
  }
  @media screen and (max-width: 500px) {
    padding: 0px;
  }
`;
const ModalTitle = styled.p`
  font-size: 20px;
  width: 100%;
  text-align: center;
  padding: 10px 0px;
  color: ${theme.white};
  @media screen and (max-width: 800px) {
    padding: 6px 0px;
    font-size: 18px;
  }
  @media screen and (max-width: 600px) {
    padding: 4px 0px;
    font-size: 16px;
  }
`;
const ContentText = styled.p`
  font-size: 16px;
  width: 100%;
  text-align: center;
  padding: 10px 0px;
  margin-top: 15px;
  color: ${theme.gray};
  @media screen and (max-width: 800px) {
    padding: 6px 0px;
    font-size: 14px;
  }
  @media screen and (max-width: 600px) {
    padding: 4px 0px;
    font-size: 12px;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GreenButton = styled.a`
  width: 80%;
  color: black;
  font-size: 20px;
  padding: 10px 50px;
  background-color: ${theme.mainNeon};
  border-radius: 10px;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  @media screen and (max-width: 800px) {
    padding: 6px 0px;
    font-size: 14px;
  }
  @media screen and (max-width: 600px) {
    padding: 4px 0px;
    font-size: 12px;
  }
`;
type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: () => void;
};
function OwnGroupModal({isOpen, setIsOpen, closeModal}: Props) {
  const data: any = i18next.t('ManageAccModal', {returnObjects: true});
  function closeGroupModal() {
    setIsOpen(false);
    closeModal();
  }
  return (
    <>
      {isOpen && (
        <ModalBackground>
          <Wrapper>
            <ModalContent>
              <ModalTitle>{data.OwnGroupModal.title}</ModalTitle>
              <LineDivider />
              <ContentText>{data.OwnGroupModal.content}</ContentText>
              <ButtonContainer>
                <GreenButton onClick={closeGroupModal}>
                  {data.OwnGroupModal.button}
                </GreenButton>
              </ButtonContainer>
            </ModalContent>
          </Wrapper>
        </ModalBackground>
      )}
    </>
  );
}

export default OwnGroupModal;
