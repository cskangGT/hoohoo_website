import i18next from 'i18next';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Header} from '../../../Component/ContentBox/TwoColBoxesSection';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import {BackgroundImage} from '../../About/OurTeam/TeamIntro';
const RetentionHeader = styled(Header)`
  font-family: 'Fredoka';
  text-align: center;
  font-size: 3rem;
`;
const Bg = styled(BackgroundImage)`
  height: auto;
  margin: 0;
  margin-top: 50px;
`;
const Image = styled.img`
  width: 80%;
  object-fit: contain;
  @media screen and (max-width: 800px) {
    width: 90%;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 30px 0;
`;
export default function Retention() {
  const data: any = i18next.t('retention', {returnObjects: true});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <Bg image={data.bgImage}>
      <Wrapper>
        <Container>
          <RetentionHeader>{data.header}</RetentionHeader>
          <Image src={isMobile ? data.mobileImg : data.DesktopImg} />
        </Container>
      </Wrapper>
    </Bg>
  );
}
