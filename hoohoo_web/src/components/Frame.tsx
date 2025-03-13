import i18next from 'i18next';
import React from 'react';
import styled from 'styled-components';
import {theme} from '../../src/style';
import Footer from './Footer/Footer';
import Nav from './Nav/Nav';

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  max-width: 100vw;
  padding: 0;
  display: block;
  margin: 0px;
  align-items: center;
  background-color: transparent;
`;
type FrameProps = {
  children: React.ReactNode;
};

function Frame({children}: FrameProps) {
  return (
    <Container>
      <Nav />
      <React.Fragment key={i18next.language}>{children}</React.Fragment>

      <>
        <hr style={{color: theme.darkGray, margin: 0}} />
        <Footer />
      </>
    </Container>
  );
}
export default Frame;
