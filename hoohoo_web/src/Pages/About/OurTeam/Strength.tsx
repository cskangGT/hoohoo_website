import i18next from 'i18next';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import LinedHeader from '../../../Component/ContentBox/LinedHeader';
import {useLanguage} from '../../../Component/hooks/LanguageContext';
import {theme} from '../../../style';
export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100%);
  padding: 40px 0;
  min-height: 600px;
  height: auto;
  margin: 60px 0;
  @media screen and (max-width: 800px) {
    height: auto;
  }
`;
const ItemBox = styled.div`
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 1fr;
  display: grid;
  @media screen and (max-width: 800px) {
    height: auto;
    grid-template-columns: auto;
    grid-column-gap: 20px;
    grid-template-rows: 1fr 1fr 1fr;
  }
  @media screen and (max-width: 800px) {
    width: calc(100% - 40px);
  }
`;

const EachBox = styled.div`
  padding: 0 35px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: ${theme.white};
  @media screen and (max-width: 800px) {
    width: 100%;
    padding: 20px;
    height: auto;
    margin-bottom: 30px;
  }
`;
const ActName = styled.h3<{language: string}>`
  font-size: 3rem;
  font-family: ${props => (props.language === 'ko' ? 'Jua' : 'Fredoka')};
  font-weight: 600;
  line-height: 1;
  margin-top: 50px;
  color: ${theme.mainNeon};
  margin-bottom: 30px;
  align-self: flex-start;
  @media screen and (max-width: 800px) {
    text-align: center;
    align-self: center;
  }
`;
const ActDesc = styled.span`
  text-align: left;
  font-size: 1.5rem;
  @media screen and (max-width: 800px) {
    text-align: center;
  }
`;
type DataProps = {
  title: string;
  content: string;
};
export default function Strenth() {
  const data: any = i18next.t('strength', {returnObjects: true});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const {language} = useLanguage();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <ContentBox>
      <LinedHeader
        data={{header: data.header}}
        color={theme.white}
        style={{
          fontSize: isMobile ? '3rem' : '4rem',
          width: '100%',
          textAlign: isMobile ? 'center' : 'left',
        }}
      />
      <ItemBox>
        {data.items.map((item: DataProps, index: number) => (
          <EachBox key={item.title + index}>
            <ActName language={language}>{item.title}</ActName>
            <ActDesc dangerouslySetInnerHTML={{__html: item.content}} />
          </EachBox>
        ))}
      </ItemBox>
    </ContentBox>
  );
}
