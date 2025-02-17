import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../src/style';
import Footer from './Footer/Footer';
import { useLanguage } from './hooks/LanguageContext';
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
  const [show, setShow] = useState<boolean>(true);
  const location = useLocation();
  const {language} = useLanguage();
  const navigate = useNavigate();
  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);

  //   if (searchParams.get('home') === 'yes') {
  //     setShow(true);
  //     navigate('/home');
  //   }
  // }, [location.search]);
  
  return (
    <Container>
      {show && <Nav />}
      <React.Fragment key={language}>{children}</React.Fragment>

      {show && (
        <>
          <hr style={{color: theme.darkGray, margin: 0}} />
          <Footer />
        </>
      )}
    </Container>
  );
}
export default Frame;
