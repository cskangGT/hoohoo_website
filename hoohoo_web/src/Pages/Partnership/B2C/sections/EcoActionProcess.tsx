import i18next from 'i18next';
import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../../../../Component/hooks/LanguageContext';
import Wrapper from '../../../../Component/Wrapper/Wrapper';
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
  margin-top: 30px;
  width: 100%;
  position: relative;
  column-gap: 20px;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  display: grid;
  @media screen and (max-width: 1400px) {
    height: auto;
    grid-template-columns: 1fr 1fr;
    width: 70%;
    row-gap: 30px;
    grid-column-gap: 20px;
    grid-template-rows: 1fr 1fr;
  }
  @media screen and (max-width: 1000px) {
    height: auto;
    grid-template-columns: auto;
    width: 70%;
    row-gap: 30px;
    grid-column-gap: 20px;
    grid-template-rows: 1fr 1fr 1fr 1fr;
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
    props.index === 0 || props.index === 3 ? 'column-reverse' : 'column'};
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
    height: 450px;
    width: 300px;
  }
`;
const ActName = styled.h3`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
  margin-top: 30px;
`;
const ActDesc = styled.span`
  text-align: center;
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
  flex-direction: column;
  padding-bottom: 35px;
`;
const Header = styled.h2<{language: string}>`
  margin: 0;
  padding: 0;
  font-size: 2.5rem;
  line-height: 1.1;
  text-align: center;
  font-family: ${props => (props.language === 'ko' ? 'TmoneyRoundWind' : 'Fredoka')};
  font-weight: 600;
  padding-bottom: 30px;
  @media screen and (max-width: 1100px) {
    text-align: center;
  }
  @media screen and (max-width: 700px) {
    text-align: center;
    font-size: 2.3rem;
  }
  @media screen and (max-width: 500px) {
    text-align: center;
    font-size: 2.1rem;
  }
`;
const HighlightedText = styled.span<{language: string}>`
  color: #00bf63;
  margin: 0;
  padding: 0;
  font-size: 2.5rem;
  line-height: 1;
  border-radius: 10px;
  text-align: left;
  font-family: ${props => (props.language === 'ko' ? 'TmoneyRoundWind' : 'Fredoka')};
  font-weight: 600;
  padding: 5px;
  @media screen and (max-width: 1100px) {
    text-align: center;
  }
  @media screen and (max-width: 700px) {
    text-align: center;
    font-size: 2.3rem;
  }
  @media screen and (max-width: 500px) {
    text-align: center;
    font-size: 2.1rem;
  }
`;
const Image = styled.img`
  /* width: 100%; */
  height: 315px;
  object-fit: contain;
`;
type DataProps = {
  imagePath: string;
  head: string;
  desc: string;
};
function EcoActionProcess() {
  const {language} = useLanguage();
  const data: any = i18next.t('EcoActionProcess', {returnObjects: true});
  return (
    <Wrapper>
      <ContentBox>
        <Header language={language}>
          {data.title[0]}
          {language === 'en' && <br />}
          <HighlightedText language={language}>
            {data.highlight[0]}
          </HighlightedText>
          {language === 'ko' && <br />}
          {data.title[1]}

          <HighlightedText language={language}>
            {data.highlight[1]}
          </HighlightedText>
          {data.title[2]}
        </Header>
        <ImageBox>
          {data.steps.map((item: DataProps, index: number) => (
            <EachBox key={index} index={index}>
              <Image src={item.imagePath} key={index + 'img'} />
              <TextBox>
                <ActName dangerouslySetInnerHTML={{__html: item.head}} />
                <ActDesc dangerouslySetInnerHTML={{__html: item.desc}} />
              </TextBox>
            </EachBox>
          ))}
        </ImageBox>
      </ContentBox>
    </Wrapper>
  );
}
export default EcoActionProcess;
