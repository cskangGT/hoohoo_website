import React, {useEffect} from 'react';
import styled, {keyframes} from 'styled-components';
import {theme} from '../../style';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Content = styled.div`
  text-align: center;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto 20px;
`;
const RedirectText = styled.h3`
  font-family: Fredoka;
  font-weight: 600;
  font-size: ${theme.fontSize['3xl']};
`;
function ZiguPage() {
  useEffect(() => {
    window.location.href = 'https://zigu.my';
  }, []);
  return (
    <Container>
      <Content>
        <Spinner />
        <RedirectText>Redirecting...</RedirectText>
        <p>
          If you are not redirected automatically,{' '}
          <a href="https://zigu.my" target="_blank" rel="noopener noreferrer">
            click here
          </a>
          .
        </p>
      </Content>
    </Container>
  );
}

export default ZiguPage;
