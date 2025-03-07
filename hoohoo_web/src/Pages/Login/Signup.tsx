import React from 'react';
import styled from 'styled-components';
import {theme} from '../../style';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white !important;
`;
const LoginContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
`;
const LoginWrapperBox = styled.div`
  margin-top: 64px;
  width: 400px;
  display: block;
  @media screen and (max-width: 500px) {
    width: calc(100% - 20px);
    padding: 20px 10px;
  }
`;
const InnerBox = styled.div`
  width: calc(100% - ${theme.spacing.xl} * 2);

  border-radius: 8px;
  padding: ${theme.spacing.xl};
`;
const Signup = () => {
  return (
    <Container>
      <LoginContainer>
        <LoginWrapperBox>
          <InnerBox>dfsdf</InnerBox>
        </LoginWrapperBox>
      </LoginContainer>
    </Container>
  );
};

export default Signup;
