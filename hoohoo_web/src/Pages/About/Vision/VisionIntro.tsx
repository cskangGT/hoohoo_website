import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { slideInFromTop, theme } from '../../../style'
import i18next from 'i18next';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import LinedHeader from '../../../Component/ContentBox/LinedHeader';
import { Desc } from '../../../Component/ContentBox/TwoColBoxesSection';
const Bg = styled.div<{image: string}>`
  animation: ${slideInFromTop} 0.7s ease-out forwards;
  width: calc(100%);
  height: 600px;
  display: flex;
  background-image: url(${props=> props.image});
  background-size: cover; // 배경 이미지가 컨테이너를 가능한 많이 채우도록 설정
  background-position: 60%;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
  @media screen and (max-width: 1000px){
    align-items: flex-end;
      margin-top: 70px;
        height: 700px;
    }
`; 
const SubHeader = styled(Desc)`
  width: auto;
  text-align: right;
  color: ${theme.mainNeon};
  font-size: 2.5rem;
  padding-bottom: 25px;
  @media screen and (max-width: 1000px){
    padding-bottom: 0px;
    margin-right: 5px;
  }
`;
const Container = styled.div`
  width:100%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: right;
  color: ${theme.white};
  padding-right: 25px;
  padding-bottom: 30px;
  @media screen and (max-width: 1000px){
    padding-right: 15px;
  }
`;
export default function VisionIntro() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const data : any = i18next.t('visionIntro', { returnObjects: true });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <Wrapper>
      <Bg image={isMobile? data.flipImg : data.bg}>
        <Container>
          <SubHeader dangerouslySetInnerHTML={{__html: data.content}} />
          <LinedHeader 
            style={{textAlign: 'right', color: theme.white, fontSize: isMobile && '2.2rem' }}
            data={{header: data.header}} />
        </Container>
      </Bg>
    </Wrapper>
  )
}