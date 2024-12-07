import queryString from 'query-string';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { androidAppStoreLink, iosAppStoreLink } from '../../Home/Download';
const getDevicePlatform = () => {
    const userAgent = navigator.userAgent;
  
    if (/android/i.test(userAgent)) {
      return 'Android';
    }
    console.log('userAgent', userAgent)
    if (/iPad|iPhone|iPod|Mac/.test(userAgent) ) {
      return 'iOS';
    }
  
    return 'unknown';
  };
const RedirectPage: React.FC = () => {
    const location = useLocation();
    
    const goToStoreLink = () => {
      
      
      const platform = getDevicePlatform();
      const appStoreLink = platform === 'iOS' ? iosAppStoreLink : androidAppStoreLink;
      window.location.href = appStoreLink;
    }
    useEffect(() => {
      
      const searchParams = new URLSearchParams(location.search);
      console.log('first', searchParams.get('link'))
      
      const appLink = searchParams.toString().slice(5);
      console.log('appLink', appLink);      
      
      const platform = getDevicePlatform();
      console.log('platform', platform)
      const appStoreLink = platform === 'iOS' ? iosAppStoreLink : androidAppStoreLink;
      const redirectUser = () => {
        let appOpened = false;
        if (appLink) {
          window.location.href = decodeURIComponent(appLink);

          window.addEventListener('blur', () => {
            appOpened = true;
          });
          setTimeout(() => {
            console.log('appOpened', appOpened)
            if (!appOpened) {
              window.location.href = appStoreLink;
            }
          }, 2000);
      
        }
      };
  
      redirectUser();
    }, [location]);
  
    return (
      <div>
        <h1>Redirecting...</h1>
        <p>If you are not redirected automatically, <a href="#!" onClick={goToStoreLink}>click here</a>.</p>
      </div>
    );
  };
export default RedirectPage
