import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../src/style';
import Nav from './Nav/Nav';
import Footer from './Footer/Footer';
import FootContact from './Footer/FootContact';

const Container = styled.div`
    width: 100%;
    height: 100%;
    min-height:100vh;
    max-width:100vw;
    padding:0;
    display: block;
    margin: 0px;
    align-items:center;
    background-color: transparent;
`;
type FrameProps = {
  children: React.ReactNode;
};

function Frame({ children }: FrameProps) {
  const [isKorean, setIsKorean] = useState(false);
  return (
    <Container>
      <Nav setIsKorean={setIsKorean} isKorean={isKorean} />
      {children}
      <hr style={{ color: theme.darkGray, margin: 0 }} />
      <Footer isKorean={isKorean} />
    </Container>
  )
}
export default Frame;