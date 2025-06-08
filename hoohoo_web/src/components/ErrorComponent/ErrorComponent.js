import i18next from 'i18next';
import React from 'react';
import styled from 'styled-components';
import {theme} from '../../style';

const Container = styled.div`
  width: calc(100% - 40px);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${theme.white}; // 어두운 배경 (테마에 맞게 조정)
  padding: 0px 20px;
  text-align: center;
`;

const LogoContainer = styled.div`
  margin-bottom: 30px;
`;

const Logo = styled.img`
  height: 60px;
  margin-bottom: 15px;
`;

const ErrorCode = styled.h1`
  font-size: 120px;
  font-weight: 600;
  font-family: Inter;
  color: ${theme.mainNeon}; // 메인 네온 색상 사용
  margin: 0;
  line-height: 1;
  letter-spacing: -2px;
`;

const ErrorTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: ${theme.darkGray};
  margin: 10px 0 20px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-direction: row;
  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;
const ErrorMessage = styled.p`
  font-size: 18px;
  width: 100%;
  color: ${theme.darkGray};
  margin-bottom: 30px;
  max-width: 500px;
  line-height: 1.5;
`;

const ReturnButton = styled.button`
  background-color: ${theme.mainNeon};
  color: #111111;
  border: none;
  border-radius: 50px;
  padding: 12px 30px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  width: 160px;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
  box-shadow: 0 0px 0px 1px rgba(0, 0, 0, 0.3);
  &:hover {
    background-color: ${theme.darkWhite || '#2ec4b6'};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const OutlineButton = styled(ReturnButton)`
  background-color: transparent;
  border: 2px solid ${theme.darkGray};
  color: ${theme.darkGray};
  width: 160px;
  margin-right: 12px;
  box-shadow: 0 0px 0px 1px rgba(0, 0, 0, 0.3);
  &:hover {
    background-color: rgba(46, 196, 182, 0.1);
  }
`;

const ErrorImage = styled.div`
  font-size: 80px;
  margin-bottom: 20px;
`;

function ErrorComponent() {
  const localizedTexts = i18next.t('ErrorComponent', {
    returnObjects: true,
  });
  const goBack = () => {
    window.history.back();
  };

  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <Container>
      <LogoContainer>
        <Logo src="/Images/og_earthmera_logo.png" alt="EarthMera Logo" />
      </LogoContainer>

      <ErrorTitle>{localizedTexts.title}</ErrorTitle>
      <ErrorMessage>{localizedTexts.description}</ErrorMessage>

      <ButtonContainer>
        <OutlineButton onClick={goBack}>{localizedTexts.button}</OutlineButton>
        <ReturnButton onClick={goHome}>{localizedTexts.button2}</ReturnButton>
      </ButtonContainer>
    </Container>
  );
}

export default ErrorComponent;
