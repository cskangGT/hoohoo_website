import i18next from 'i18next';
import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import FootContact from '../../components/Footer/FootContact';
import {useLanguage} from '../../components/hooks/LanguageContext';
import {BgImage, theme} from '../../style';
import {ContentBox} from '../About/Vision/EarthMeraVision';
import HomeEcoProducts from './sections/HomeEcoProducts';
import HomeEcoServices from './sections/HomeEcoServices';
import HomeEnvImpact from './sections/HomeEnvImpact';
import HomeLandingEcoAction from './sections/HomeLandingEcoAction';
import HomePartners from './sections/HomePartners';
import HomePartnership from './sections/HomePartnership';
import HomePlatformGroup from './sections/HomePlatformGroup';
import HomePlatformShare from './sections/HomePlatformShare';
const Wrap = styled.div`
  width: calc(100%);
  max-width: 1300px;
  margin: 0 auto;
  @media screen and (max-width: 1400px) {
    max-width: 1300px;
  }
  @media screen and (max-width: 1200px) {
    max-width: 1200px;
  }

  @media screen and (max-width: 1000px) {
    max-width: 850px;
  }

  @media screen and (max-width: 850px) {
    max-width: 750px;
  }

  @media screen and (max-width: 700px) {
    max-width: 550px;
  }

  @media screen and (max-width: 550px) {
    max-width: 400px;
  }
`;
const IntroContentBox = styled.div`
  padding-top: 20px;
  justify-content: center;

  width: 100%;
  display: flex;
  margin-top: 0px;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
`;

function HomeEarthmera() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {language: currentLanguage} = useLanguage();
  const data: any = i18next.t('HomeLandingSection', {returnObjects: true});
  useEffect(() => {
    const timer = setTimeout(() => {
      const searchParams = new URLSearchParams(location.search);
      if (searchParams.get('modal') === 'open') {
        setIsOpen(true);
      } else if (searchParams.get('support') === 'yes') {
        navigate(`/${currentLanguage}/support`);
      } else if (searchParams.get('sc')) {
        const section = searchParams.get('sc');
        if (section) {
          let element;
          switch (section) {
            case 'es':
              element = document.getElementById('eco-services');
              break;
            case 'ep':
              element = document.getElementById('eco-products');
              break;
            default:
              window.scrollTo(0, 0);
              return;
          }
          if (element) {
            element.scrollIntoView({behavior: 'smooth', block: 'start'});
          }
        }
      }
    }, 100); // 100ms 지연

    return () => clearTimeout(timer); // 클린업 함수
  }, [location.search]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const hash = decodeURIComponent(location.hash.replace('#', ''));
    console.log('hash', hash);

    if (hash) {
      // const [pageWithHash, query] = hash.split('?');
      // const page = pageWithHash.split('#')[0]; // 페이지 이름 추출
      // const params = new URLSearchParams(query);
      const [page, query] = hash.split('#?');
      const params = new URLSearchParams(query);
      const link = params.toString();
      if (page.includes('redirect')) {
        if (link) {
          navigate(`/${page}?${link}`);
        } else {
          navigate(`/${page}`);
        }
      } else {
        if (link) {
          console.log('link', link);

          navigate(`/${currentLanguage}/${page}?${link}`);
        } else {
          navigate(`/${currentLanguage}/${page}`);
        }
      }
    }
  }, []);

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const event = new Event('render-event');
    document.dispatchEvent(event);
  }, []);
  return (
    <BgImage>
      <IntroContentBox>
        <HomeLandingEcoAction />
        {/* <HomeLandingSection /> */}
      </IntroContentBox>

      <ContentBox>
        <HomeEnvImpact></HomeEnvImpact>
      </ContentBox>
      <ContentBox id="eco-products">
        <HomeEcoProducts />
      </ContentBox>
      <ContentBox id="eco-services">
        <HomeEcoServices />
      </ContentBox>
      <ContentBox>
        <HomePlatformGroup />
      </ContentBox>

      <ContentBox>
        <HomePlatformShare />
      </ContentBox>
      <ContentBox>
        <HomePartnership />
      </ContentBox>

      <Wrap>
        <ContentBox>
          <HomePartners />
        </ContentBox>
      </Wrap>
      <ContentBox></ContentBox>
      <hr style={{color: theme.darkGray, margin: 0, width: '100%'}} />

      <Wrap>
        <FootContact />
      </Wrap>
    </BgImage>
  );
}
export default HomeEarthmera;
