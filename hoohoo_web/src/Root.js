import {logEvent} from 'firebase/analytics';
import React, {useEffect} from 'react';
import {CookiesProvider} from 'react-cookie';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {analytics} from './\bfirebase';
import Frame from './components/Frame';
import {LanguageProvider} from './components/hooks/LanguageContext';
import HrefLangMeta from './HrefLangMeta';
import {noFrameRoutes} from './Router';

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
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const currentLang = pathParts[1];

    if (noFrameRoutes.some(route => location.pathname.startsWith(route.path))) {
      return;
    }

    if (!['ko', 'en'].includes(currentLang)) {
      const newPath = `/en${location.pathname}`;
      navigate(newPath, {replace: true});
    }
  }, [location.pathname]);
  useEffect(() => {
    window.scrollTo(0, 0);

    const hash = decodeURIComponent(location.hash.replace('#', ''));
    if (hash) {
      const [page, query] = hash.split('#?');
      const params = new URLSearchParams(query);
      const link = params.toString();

      if (link) {
        navigate(`/${page}?${link}`);
      } else {
        navigate(`/${page}`);
      }
    }
  }, []);
  usePageTracking();
  return (
    <LanguageProvider>
      <CookiesProvider>
        {/* <div style={{backgroundColor: 'transparent'}}> */}
        <HrefLangMeta />

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
