import i18next from 'i18next';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import LinedHeader from '../../../Component/ContentBox/LinedHeader';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import {theme} from '../../../style';
import {
  BackgroundImage,
  IntroHeaderTextContainer,
} from '../../About/OurTeam/TeamIntro';
const Header = styled(IntroHeaderTextContainer)`
  width: 100%;
  align-items: center;
  justify-content: center;
`;
export default function ContactIntro() {
  const data: any = i18next.t('contactInto', {returnObjects: true});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <BackgroundImage image="Images/contactBgImg.png">
      <Wrapper>
        <Header>
          <LinedHeader
            data={{header: data.header}}
            containerStyle={{alignItems: 'center', width: '100%'}}
            style={{
              fontSize: isMobile ? '3rem' : '4rem',
              color: theme.white,
              textAlign: 'center',
            }}
          />
        </Header>
      </Wrapper>
    </BackgroundImage>
  );
}
