import i18next from 'i18next';
import React, { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';
import { useLanguage } from '../../../../components/hooks/LanguageContext';
import { theme } from '../../../../style';
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100%);
  padding-top: 60px;
`;
const ImageBox = styled.div`
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  width: 100%;
  position: relative;
  column-gap: 20px;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 1fr;
  display: grid;
  
  @media screen and (max-width: 1000px) {
    height: auto;
    grid-template-columns: auto;
    width: 70%;
    row-gap: 30px;
    grid-column-gap: 20px;
    grid-template-rows: 1fr 1fr 1fr;
  }
  @media screen and (max-width: 500px) {
    width: 80%;
    padding: 0 20px;
  }
`;

const EachBox = styled.div<{index: number}>`
  padding: 0 35px;
  height: 500px;
  display: flex;

  flex-direction: ${props =>
    props.index === 0 || props.index === 2 ? 'column-reverse' : 'column'};
  align-items: center;
  justify-content: flex-start;
  background: linear-gradient(
    170deg,
    rgba(255, 255, 255, 0.14) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  background-color: #ebebeb;
  border-color: ${theme.white};
  border-width: 2px;
  border-radius: 20px;
  z-index: 10;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
  @media screen and (max-width: 500px) {
    height: auto;
    width: calc(100% - 40px);
    padding: 0px 20px;
  }
`;
const ActName = styled.h3`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
  margin-top: 30px;
`;
const ActDesc = styled.p<{language: string}>`
  text-align: center;
  font-size: ${props => (props.language === 'ko' ? '1rem' : '1.1rem')};
  line-height: 1.5;
  margin: 0px;
  padding: 0px;
`;
const TapeBgImage = styled.img`
  height: 150px;
  z-index: 1;
  position: absolute;
  left: -70px;
  right: 20px;
  top: 80px;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
const TextBox = styled.div`
  align-items: center;
  justify-content: flex-start;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-bottom: 35px;
`;
const Header = styled.h2<{language: string}>`
  margin: 0;
  padding: 0;
  font-size: 2.5rem;
  line-height: 1.1;
  text-align: center;
  font-family: ${props =>
    props.language === 'ko' ? 'TmoneyRoundWind' : 'Fredoka'};
  font-weight: 600;
  padding-bottom: 0px;
  @media screen and (max-width: 1100px) {
  }
  @media screen and (max-width: 700px) {
    text-align: center;
    font-size: 2.3rem;
  }
  @media screen and (max-width: 500px) {
    text-align: center;
    font-size: 1.8rem;
  }
`;

const Image = styled.img`
  /* width: 100%; */
  height: 315px;
  object-fit: contain;
`;
const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
`;
const Highlight = styled.span`
  font-weight: 600;
  position: relative;
`;

const Decoration = styled.img`
  position: absolute;
  top: -20px; /* HeaderBox의 오른쪽 상단에 위치 */
  right: -20px;
  width: 50px; /* 이미지 크기 */
  height: auto;

  @media screen and (max-width: 700px) {
    top: -10px;
    right: -15px;
    width: 30px;
  }
`;

const Underline = styled.img`
  position: absolute;
  bottom: -5px; /* 밑줄 이미지의 위치 */
  left: 50%;
  transform: translateX(-50%);
  width: ${({width}) => `${width}px`}; /* 동적으로 너비 설정 */
  height: auto;
`;

type DataProps = {
  imagePath: string;
  head: string;
  desc: string;
};
function TicketeerSteps() {
  const data: any = i18next.t('TicketeerSteps', {returnObjects: true});
  const highlightRef = useRef(null);
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const {language} = useLanguage();
  useEffect(() => {
    if (highlightRef.current) {
      const {offsetWidth} = highlightRef.current;
      setUnderlineWidth(offsetWidth);
    }
  }, [highlightRef]);

  return (
    <ContentBox>
      <HeaderBox>
        <Decoration src={data.header.deco} alt="decoration" />
        <Header language={language}>
          <span dangerouslySetInnerHTML={{__html: data.header.text}} />
          <Highlight ref={highlightRef}>
            {data.header.highlight}
            <Underline
              src={data.header.underline}
              alt="underline"
              width={underlineWidth}
            />
          </Highlight>
        </Header>
      </HeaderBox>
      <ImageBox>
        {data.steps.map((item: DataProps, index: number) => (
          <EachBox key={index} index={index}>
            <Image src={item.imagePath} key={index + 'img'} />
            <TextBox>
              <ActName>{item.head}</ActName>
              <ActDesc
                language={language}
                dangerouslySetInnerHTML={{__html: item.desc}}
              />
            </TextBox>
          </EachBox>
        ))}
      </ImageBox>
    </ContentBox>
  );
}

export default TicketeerSteps;
