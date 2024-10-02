import queryString from 'query-string';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
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
      const iosAppStoreLink = 'https://apps.apple.com/us/app/earthmera/id6560118091';
      const androidAppStoreLink = 'https://play.google.com/store/apps/details?id=com.earthmera';
      
      const platform = getDevicePlatform();
      const appStoreLink = platform === 'iOS' ? iosAppStoreLink : androidAppStoreLink;
      window.location.href = appStoreLink;
    }
    useEffect(() => {
      // console.log('queryString', queryString)
      // console.log('location.hash', location.hash)
      // const params = queryString.parse(location.hash);
      // console.log('params', params)
      // const appLink = params['link'] as string;
      const searchParams = new URLSearchParams(location.search);
      const appLink = searchParams.toString().slice(5);
      console.log('appLink', appLink)
  
      const iosAppStoreLink = 'https://apps.apple.com/us/app/earthmera/id6560118091';
      const androidAppStoreLink = 'https://play.google.com/store/apps/details?id=com.earthmera';
      
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