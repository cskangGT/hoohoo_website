import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import styled from 'styled-components';
import { theme } from '../../style';
import { androidAppStoreLink, iosAppStoreLink } from './Download';
const Container = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    @media screen and (max-width: 800px) {
        flex-direction: column;
        gap: 10px;
    
  }
`;
const Button = styled.button`
  display: flex;
  width: 200px;
  flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5px 20px;
    border: none;
    background-color: ${theme.green};
    border-radius: 15px;
    cursor: pointer;
    flex: 1;
`;

const ButtonText = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-left: 10px;
`;

function DownloadButtons() {
    function downloadAppStore() {
        window.location.href =  iosAppStoreLink;
    }
    function downloadGooglePlay() {
        window.location.href = androidAppStoreLink;
    }
  return (
    <Container>
        <Button onClick={downloadAppStore} >
          <FontAwesomeIcon style={{
            width: 30
          }} icon={faApple} color={theme.white} fontSize={30} />
          <ButtonText>{'App Store'}</ButtonText>
        </Button>
        <Button onClick={downloadGooglePlay}>
          <FontAwesomeIcon icon={faGooglePlay} color={theme.white} fontSize={30} />
          <ButtonText>{'Google Play'}</ButtonText>
        </Button>
    </Container>
  )
}

export default DownloadButtons