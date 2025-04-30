import React from 'react';
import styled from 'styled-components';
import {theme} from '../../style';
import {useLanguage} from '../hooks/LanguageContext';
import LinedHeader from './LinedHeader';
export const Container = styled.div`
  width: calc(100%);
  display: flex;
  margin: 100px 0px;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  transition: all 0.2s ease 0s;
  padding: 3rem 0px;
  padding-bottom: 20px;
  @media screen and (max-width: 1000px) {
    margin: 20px auto;
  }
`;

export const HorizonContainer = styled.div<{rightImage?: boolean}>`
  display: flex;
  flex-direction: ${props => (props.rightImage ? 'row-reverse' : 'row')};
  width: 100%;
  justify-content: center;
  position: relative;
  align-items: center;
  min-height: 520px;
  @media screen and (max-width: 1000px) {
    flex-direction: column-reverse;
  }
`;
export const RightBox = styled.div`
  align-items: left;
  justify-content: start;
  display: flex;
  width: calc(38% - 15px);
  flex-direction: column;
  color: ${theme.darkGray};
  text-align: center;
  /* padding: 0 20px;
  padding-left: 40px; */
  line-height: 1.2;
  z-index: 3;
  @media screen and (max-width: 1000px) {
    padding: 0 10px;
    width: 70%;
    text-align: center;
  }
  @media screen and (max-width: 500px) {
    padding: 0 10px;
    width: 90%;
    text-align: center;
  }
`;
export const Header = styled.h2`
  padding: 30px 0;
  font-size: 2.5rem;
  line-height: 1.2;
  width: 100%;
  color: ${theme.darkGray};
  text-align: left;
  @media screen and (max-width: 1000px) {
    font-size: 2.3rem;
    text-align: center;
  }
  @media screen and (max-width: 500px) {
    text-align: center;
    font-size: 2.1rem;
  }
`;
export const Desc = styled.p<{language?: string}>`
  font-size: ${props => (props.language === 'ko' ? '1.15rem' : '1.3rem')};
  font-family: ${props =>
    props.language === 'ko' ? 'TmoneyRoundWind' : 'Fredoka'};
  line-height: 1.5;
  width: 100%;
  color: ${theme.darkGray};
  opacity: 0.8;
  margin: 0px;
  text-align: left;
  z-index: 10;
  word-break: keep-all;
  @media screen and (max-width: 1000px) {
    margin: 20px 0;
    width: 100%;
    text-align: center;
  }
  @media screen and (max-width: 500px) {
    margin: 10px 0;
    font-size: 1.1rem;
  }
`;
export const LeftBox = styled.div`
  box-sizing: border-box;
  width: calc(62% - 15px);

  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  /* background: linear-gradient(170deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.05) 100%); */
  border-radius: 20%;
  margin: auto;
  @media screen and (max-width: 1000px) {
    margin-top: 10px;
    width: 90%;
  }
  @media screen and (max-width: 500px) {
    margin-bottom: 30px;
    width: 100%;
  }
`;

export const Image = styled.img<{height?: number; width?: number | string}>`
  width: ${props =>
    props.width ? props.width : '80%'}; // RightBox의 너비에 맞춤
  height: ${props => (props.height ? props.height : '100%')};
  overflow: hidden;
  object-fit: contain;
  border-radius: 20px;
  z-index: 10;
  @media screen and (max-width: 500px) {
    height: auto;
  }
`;

type DataProps = {
  header: string;
  content: string;
  image: string;
  lineImage?: string;
  imageHeight?: number;
};
type Props = {
  backgroundImage?: string;
  imageStyle?: {};
  data: DataProps;
  rightImage?: boolean;
  descStyle?: {};
  headerStyle?: {};
  imageHeight?: number;
};

export default function TwoColBoxesSection(props: Props) {
  const {language} = useLanguage();
  return (
    <Container style={{marginTop: 60}}>
      <HorizonContainer
        rightImage={props.rightImage ? props.rightImage : false}
        style={{backgroundColor: 'rgba(0,0,0,0.48)'}}>
        <LeftBox>
          <Image
            style={props.imageStyle}
            src={props.data.image}
            height={props.imageHeight}
          />
        </LeftBox>
        <RightBox>
          <LinedHeader
            style={props.headerStyle}
            data={{header: props.data.header, lineImage: props.data.lineImage}}
          />
          <Desc style={props.descStyle} language={language}>
            {props.data.content}
          </Desc>
        </RightBox>
      </HorizonContainer>
    </Container>
  );
}
