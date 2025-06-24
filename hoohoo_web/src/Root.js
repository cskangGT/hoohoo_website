import {logEvent} from 'firebase/analytics';
import React, {useEffect} from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {analytics} from './\bfirebase';
import Frame from './components/Frame';
import HrefLangMeta from './HrefLangMeta';
import i18n from './lang/i18n';

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

    console.log('currentLang', currentLang);

    if (!['ko', 'en'].includes(currentLang)) {
      const newPath = `/en${location.pathname}`;

      navigate(newPath, {replace: true});
    } else {
      if (i18n.language !== currentLang) {
        i18n.changeLanguage(currentLang);
      }
    }
  }, []);

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
    <>
      <HrefLangMeta />

      <Frame>
        <Outlet />
      </Frame>
    </>
  );
}

export default Root;
