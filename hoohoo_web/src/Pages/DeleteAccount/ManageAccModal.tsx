import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import i18next from 'i18next';
import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {theme} from '../../style';
import {ModalBackground} from '../EMMedia/Blog/BlogModal';
import BaseProgress, {ModalTitle} from './BaseProgress';
import EmailProgress from './EmailProgress';
import ReasonProgress from './ReasonProgress';
import VerifyEmailProgress from './VerifyEmailProgress';
const Wrapper = styled.div`
  padding: 6rem 2rem 3rem;
  @media screen and (max-width: 800px) {
    padding: auto;
  }
  @media screen and (max-width: 500px) {
    padding: 0px;
  }
`;
export const ModalContent = styled.div`
  z-index: 10;
  max-height: 100vh;
  overflow-y: auto;
  max-width: 50rem;
  width: 1100px;
  background-color: #1e1e1e;
  border-radius: 1rem;
  margin-left: auto;
  margin-right: auto;
  padding: 40px;
  position: relative;
  box-shadow: 0 16px 32px rgba(220, 220, 200, 0.25);
  overflow-y: auto;
  @media screen and (max-width: 1200px) {
    width: 800px;
    align-items: center;
  }
  @media screen and (max-width: 900px) {
    width: 600px;
    align-items: center;
  }
  @media screen and (max-width: 700px) {
    width: 500px;
    align-items: center;
  }
  @media screen and (max-width: 600px) {
    width: 400px;
    align-items: center;
  }
  @media screen and (max-width: 450px) {
    width: 350px;
    align-items: center;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
`;
const BackButton = styled.a`
  position: absolute;
  left: 0px;
  top: 0px;
  cursor: pointer;
  padding: 20px 0px;
  @media screen and (max-width: 800px) {
    padding: 14px 0px;
  }
  @media screen and (max-width: 600px) {
    padding: 12px 0px;
  }
  @media screen and (max-width: 400px) {
    padding: 10px 0px;
  }
`;
type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
function ManageAccModal({isOpen, setIsOpen}: Props) {
  const data: any = i18next.t('ManageAccModal', {returnObjects: true});
  const [deleteAccProgress, setDeleteAccProgress] = useState<number>(0);
  const [email, setEmail] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [fontSize, setFontSize] = useState(44);
  function closeManageAccModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 600) {
        setFontSize(26);
      } else if (width < 800) {
        setFontSize(34);
      } else {
        setFontSize(44);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const prevStep = useCallback(() => {
    setDeleteAccProgress(prev => prev - 1);
  }, [setDeleteAccProgress, deleteAccProgress]);
  return (
    <>
      {isOpen && (
        <ModalBackground>
          <Wrapper>
            <ModalContent>
              {deleteAccProgress === 0 ? (
                <BaseProgress
                  setIsOpen={setIsOpen}
                  setDeleteAccProgress={setDeleteAccProgress}
                />
              ) : (
                deleteAccProgress > 0 && (
                  <Container>
                    <ModalTitle>
                      <BackButton onClick={prevStep}>
                        <FontAwesomeIcon
                          icon={faChevronLeft}
                          fontSize={fontSize}
                          color={theme.white}
                        />
                      </BackButton>
                      {data.emailProgress.title}
                    </ModalTitle>
                    {deleteAccProgress === 1 ? (
                      <EmailProgress
                        setDeleteAccProgress={setDeleteAccProgress}
                        setEmail={setEmail}
                        email={email}
                      />
                    ) : deleteAccProgress === 2 ? (
                      <ReasonProgress
                        setDeleteAccProgress={setDeleteAccProgress}
                        email={email}
                        setCategory={setCategory}
                        setReason={setReason}
                        reason={reason}
                        category={category}
                      />
                    ) : (
                      deleteAccProgress === 3 && (
                        <VerifyEmailProgress
                          email={email}
                          reason={reason}
                          category={category}
                          closeModal={closeManageAccModal}
                        />
                      )
                    )}
                  </Container>
                )
              )}
            </ModalContent>
          </Wrapper>
        </ModalBackground>
      )}
    </>
  );
}

export default ManageAccModal;
