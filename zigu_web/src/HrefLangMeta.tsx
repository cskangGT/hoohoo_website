import React from 'react';
import {Helmet} from 'react-helmet-async';
import {useLocation} from 'react-router-dom';

const HrefLangMeta: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const domain = 'https://zigu.my'; // 실제 도메인으로 변경하세요

  // 현재 경로에서 언어 코드 제거
  const pathWithoutLang = currentPath.replace(/^\/(ko|en)/, '') || '/';

  return (
    <Helmet>
      <link
        rel="alternate"
        hrefLang="ko"
        href={`${domain}/ko${pathWithoutLang}`}
      />
      <link
        rel="alternate"
        hrefLang="en"
        href={`${domain}/en${pathWithoutLang}`}
      />
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${domain}/en${pathWithoutLang}`}
      />
    </Helmet>
  );
};

export default HrefLangMeta;
