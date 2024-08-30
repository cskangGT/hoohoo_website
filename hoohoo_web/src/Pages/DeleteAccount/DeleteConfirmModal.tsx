import React from 'react'
import styled from 'styled-components';
import { ModalBackground } from '../Info/Blog/BlogModal';
import { ModalContent } from './ManageAccModal';
import i18next from 'i18next';
import { LineDivider, theme } from '../../style';
import { throttle } from '../../util/throttle';
import { deleteAccountAPI } from '../../api/deleteAcc';
import { toast } from 'react-toastify';
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
  column-gap: 10px;
  justify-content: center;
  align-items: center;
`;
const GreenButton = styled.a`
  width: 45%;
  color: black;
  font-size: 20px;
  padding: 10px;
  background-color: ${theme.mainNeon};
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  @media screen and (max-width: 800px) {
    padding: 6px 0px;
    font-size: 14px;
  }
  @media screen and (max-width: 600px) {
    padding: 4px 0px;
    font-size: 12px;
  }
`;
const WhiteButton = styled.a`
  width: 45%;
  color: ${theme.white};
  background-color: transparent;
  font-size: 20px;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  border: 1px solid ${theme.white};
  text-decoration: none;
  cursor: pointer;
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
    reason: string;
    category: string;
    email: string;
    closeModal : () => void;
};
function DeleteConfirmModal({ isOpen, setIsOpen, reason, category, email, closeModal }: Props) {
    const data : any = i18next.t('ManageAccModal', { returnObjects: true });
    function closeConfirmModal () {
        setIsOpen(false);
        closeModal();
    }
    const deleteAccount = throttle(async () => {
        const {result} = await deleteAccountAPI(email, category, reason);
        if (result) {
            toast.success(data.DeleteConfirmModal.toasts[0]);
        } else {
            toast.error(data.DeleteConfirmModal.toasts[1]);
        }
    }, 1000);
  return (
    <>
        {
          isOpen && <ModalBackground>
            <Wrapper>
              <ModalContent>
                <ModalTitle>{data.DeleteConfirmModal.title}</ModalTitle>
                <LineDivider />
                <ContentText>
                    {data.DeleteConfirmModal.content}
                </ContentText>
                <ButtonContainer>
                    <WhiteButton onClick={closeConfirmModal}>
                        {data.DeleteConfirmModal.buttons[0]}
                    </WhiteButton>
                    <GreenButton onClick={deleteAccount}>
                        {data.DeleteConfirmModal.buttons[1]}
                    </GreenButton>
                </ButtonContainer>
                </ModalContent>
            </Wrapper>
        </ModalBackground>
    }
    </>
  )
}

export default DeleteConfirmModal