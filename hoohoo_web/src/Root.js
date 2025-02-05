import {logEvent} from 'firebase/analytics';
import React, {useEffect} from 'react';
import {CookiesProvider} from 'react-cookie';
import {Outlet, useLocation} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {analytics} from './\bfirebase';
import Frame from './Component/Frame';
import {LanguageProvider} from './Component/hooks/LanguageContext';

function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    logEvent(analytics, 'page_view', {
      page_path: location.pathname,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [location]);
}
function Root() {
  usePageTracking();
  return (
    <LanguageProvider>
      <CookiesProvider>
        {/* <div style={{backgroundColor: 'transparent'}}> */}
        <Frame>
          <Outlet />
        </Frame>
        <ToastContainer />
        {/* </div> */}
      </CookiesProvider>
    </LanguageProvider>
  );
}

export default Root;
