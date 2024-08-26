import queryString from 'query-string';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
const getDevicePlatform = () => {
    const userAgent = navigator.userAgent;
  
    if (/android/i.test(userAgent)) {
      return 'Android';
    }
  
    if (/iPad|iPhone|iPod/.test(userAgent) ) {
      return 'iOS';
    }
  
    return 'unknown';
  };
const RedirectPage: React.FC = () => {
    const location = useLocation();
  
    useEffect(() => {
      // console.log('queryString', queryString)
      // console.log('location.hash', location.hash)
      // const params = queryString.parse(location.hash);
      // console.log('params', params)
      // const appLink = params['link'] as string;
      const searchParams = new URLSearchParams(location.search);
      console.log('searchParams', searchParams)
    const appLink = searchParams.get('link');
      console.log('appLink', appLink)
  
      const iosAppStoreLink = 'https://apps.apple.com/app/id123456789';
      const androidAppStoreLink = 'https://play.google.com/store/apps/details?id=com.yourapp';
      
      const platform = getDevicePlatform();
      const appStoreLink = platform === 'iOS' ? iosAppStoreLink : androidAppStoreLink;
      const redirectUser = () => {
        if (appLink) {
          // Try to open the app
          window.location.href = appLink;
  
          // If the app does not open within 2 seconds, redirect to the app store
          setTimeout(() => {
            window.location.href = appStoreLink;
          }, 1500);
        }
      };
  
      redirectUser();
    }, [location]);
  
    return (
      <div>
        <h1>Redirecting...</h1>
        <p>If you are not redirected automatically, <a href={location.hash}>click here</a>.</p>
      </div>
    );
  };
export default RedirectPage