import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {useLanguage} from '../hooks/LanguageContext';
const HeaderContainer = styled.div`
  display: inline-block;
  margin-bottom: 30px;
  justify-content: center;
  @media screen and (max-width: 500px) {
    margin-bottom: 10px;
  }
`;
const Header = styled.h2<{language: string}>`
  margin: 0;
  padding: 0;
  font-size: ${props => (props.language === 'ko' ? '2.25rem' : '2.5rem')};
  line-height: 1.1;
  text-align: left;
  white-space: pre-line;
  font-family: ${props =>
    props.language === 'ko' ? 'TmoneyRoundWind' : 'Fredoka'};
  font-weight: 600;
  @media screen and (max-width: 1100px) {
    text-align: center;
  }
  @media screen and (max-width: 700px) {
    text-align: center;
    font-size: ${props => (props.language === 'ko' ? '2rem' : '2.25rem')};
  }
  @media screen and (max-width: 500px) {
    text-align: center;
    font-size: ${props => (props.language === 'ko' ? '1.75rem' : '1.8rem')};
  }
`;
const Line = styled.img<{dynamicWidth: number}>`
  width: ${props => props.dynamicWidth}px;
`;
type Props = {
  style?: {};
  containerStyle?: {};
  data: any;
  color?: string;
};
export default function LinedHeader(props: Props) {
  const [headerWidth, setHeaderWidth] = useState<number>(0);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const {language} = useLanguage();
  useEffect(() => {
    const updateWidth = () => {
      if (headerRef.current) {
        setHeaderWidth(headerRef.current.offsetWidth);
      }
    };

    // 최초 마운트 시에 너비 설정
    updateWidth();

    // 윈도우 리사이즈 이벤트에 대한 리스너 추가
    window.addEventListener('resize', updateWidth);

    // 컴포넌트 언마운트 시 또는 재렌더링 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);
  return (
    <HeaderContainer style={{...props.containerStyle}}>
      <Header
        language={language}
        ref={headerRef}
        style={{color: props.color && props.color, ...props.style}}>
        {props.data.header}
      </Header>
      <Line src={props.data.lineImage} dynamicWidth={headerWidth} />
    </HeaderContainer>
  );
}
