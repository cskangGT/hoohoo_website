import React from 'react';
import {Helmet} from 'react-helmet-async';

const SEOHelmet = ({language}) => {
  // 기본 메타 정보
  const defaultMeta = {
    ko: {
      title: '어스메라 | 지구를 지키는 행동, 모두 이곳에서',
      description:
        '지금 바로 CO₂ 저감 여정을 시작하고, 의미 있는 변화를 만들어보세요.',
      locale: 'ko_KR',
    },
    en: {
      title: 'EarthMera | Every eco-action, all here.',
      description:
        'Start your carbon-reducing journey today and make a real impact!',
      locale: 'en_US',
    },
  };

  // 페이지별 메타 정보
  const pageMeta = {
    '/': defaultMeta,
    '/about': {
      ko: {
        title: '어스메라 소개 | 지구를 위한 우리의 미션',
        description: '어스메라가 추구하는 가치와 미션에 대해 알아보세요.',
      },
      en: {
        title: 'About EarthMera | Our Mission for Earth',
        description:
          "Learn about EarthMera's values and mission for a sustainable future.",
      },
    },
    // 다른 페이지들에 대한 메타 정보 추가
  };

  // 현재 경로에서 언어 부분 제거 (/ko/about -> /about)
  // const pathWithoutLang = currentPath.replace(/^\/(ko|en)/, '');
  // console.log('pathWithoutLang', pathWithoutLang);

  // 현재 페이지에 대한 메타 정보 반환, 없으면 기본값 사용
  const meta = defaultMeta[language];

  return (
    <Helmet>
      {/* 기본 메타 태그 */}
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />

      {/* OpenGraph 메타 태그 */}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta
        property="og:image"
        content="https://www.earthmera.com/Images/opengraph_image.png"
      />
      <meta
        property="og:url"
        content={`https://www.earthmera.com${language}`}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:locale"
        content={meta.locale || (language === 'ko' ? 'ko_KR' : 'en_US')}
      />
      <meta property="og:site_name" content="EarthMera" />

      {/* Twitter 카드 메타 태그 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta
        name="twitter:image"
        content="https://www.earthmera.com/Images/opengraph_image.png"
      />
    </Helmet>
  );
};

export default SEOHelmet;
