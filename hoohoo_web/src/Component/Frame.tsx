import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {theme} from '../../src/style';
import Footer from './Footer/Footer';
import Nav from './Nav/Nav';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const [show, setShow] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    if (searchParams.get('home') === 'yes') {
      setShow(true);
      navigate('/home');
    }
  }, [location.search]);
  const [isKorean, setIsKorean] = useState(false);
  return (
    <Container>
      {show && <Nav setIsKorean={setIsKorean} isKorean={isKorean} />}
      {children}
      
      {show && <>
        <hr style={{color: theme.darkGray, margin: 0}} />
        <Footer />
        </>
      }
    </Container>
  );
}
export default Frame;
