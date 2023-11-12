import React from 'react'
import styled from 'styled-components';
import { slideInFromTop, theme } from '../../style'
import i18next from 'i18next';
import Wrapper from '../../Component/Wrapper/Wrapper';
import LinedHeader from '../../Component/ContentBox/LinedHeader';
import { Desc } from '../../Component/ContentBox/TwoColBoxesSection';
const Bg = styled.div<{image: string}>`
  animation: ${slideInFromTop} 0.7s ease-out forwards;
  width: calc(100%);
  height: 600px;
  display: flex;
  background-image: url(${props=> props.image});
  background-size: cover; // 배경 이미지가 컨테이너를 가능한 많이 채우도록 설정
  background-position: center;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
  @media screen and (max-width: 1000px){
        height: 700px;
    }
`; 
const Container = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;

  align-items: right;
  color: ${theme.white};
  padding-right: 35px;
`;
export default function VisionIntro() {
    const data : any = i18next.t('visionIntro', { returnObjects: true });
  return (
    <Wrapper>
    <Bg image={data.bg}>
        
            <Container>
                <Desc style={{textAlign: 'right', color: '#FFDB31', fontSize: '2.5rem', paddingBottom: 20}} dangerouslySetInnerHTML={{__html: data.content}} />
                <LinedHeader 
                        style={{textAlign: 'right', color: '#055534'}}
                        data={{header: data.header}}  />
                        
            </Container>

    </Bg></Wrapper>
  )
}