import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import styled, {keyframes} from 'styled-components';
import {theme} from '../../../style';
import {androidAppStoreLink, iosAppStoreLink} from '../../Home/Download';

export const getDevicePlatform = () => {
  const userAgent = navigator.userAgent;

  if (/android/i.test(userAgent)) {
    return 'Android';
  }
  console.log('userAgent', userAgent);
  if (/iPad|iPhone|iPod|Mac/.test(userAgent)) {
    return 'iOS';
  }

  return 'unknown';
};

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
const RedirectPage: React.FC = () => {
  const location = useLocation();

  const goToStoreLink = () => {
    const platform = getDevicePlatform();
    const appStoreLink =
      platform === 'iOS' ? iosAppStoreLink : androidAppStoreLink;
    window.location.href = appStoreLink;
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    console.log('searchParams', searchParams);

    console.log('first', searchParams.get('link'));

    const appLink = searchParams.toString().slice(5);
    console.log('appLink', appLink);

    const platform = getDevicePlatform();
    console.log('platform', platform);
    const appStoreLink =
      platform === 'iOS' ? iosAppStoreLink : androidAppStoreLink;
    const redirectUser = () => {
      let appOpened = false;
      if (appLink) {
        window.location.href = decodeURIComponent(appLink);

        window.addEventListener('blur', () => {
          appOpened = true;
        });
        setTimeout(() => {
          console.log('appOpened', appOpened);
          if (!appOpened) {
            window.location.href = appStoreLink;
          }
        }, 2000);
      }
    };

    redirectUser();
  }, [location]);

  return (
    <Container>
      <Content>
        <Spinner />
        <RedirectText>Redirecting...</RedirectText>
        <p>
          If you are not redirected automatically,{' '}
          <a href="#!" onClick={goToStoreLink}>
            click here
          </a>
          .
        </p>
      </Content>
    </Container>
  );
};
export default RedirectPage;
