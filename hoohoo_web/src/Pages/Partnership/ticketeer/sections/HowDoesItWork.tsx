import React from 'react';
import styled from 'styled-components';

import i18next from 'i18next';
import { useLanguage } from '../../../../components/hooks/LanguageContext';
import HowWorkItem from './HowWorkItem';
const Container = styled.section`
  width: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const Header = styled.h2<{language: string}>`
  margin: 0;
  padding: 0;
  width: 100%;
  margin: 50px 15px;
  font-size: 2.5rem;
  line-height: 1.1;
  text-align: left;
  font-family: ${props => (props.language === 'ko' ? 'TmoneyRoundWind' : 'Fredoka')};
  font-weight: 600;
  @media screen and (max-width: 1100px) {
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

export default function HowDoesItWork() {
  const {language} = useLanguage();
  const data: any = i18next.t('TicketeerHowWork', {returnObjects: true});
  return (
    <Container>
      <Header language={language}>{data.title}</Header>
      {data.steps.map((item: any, index: number) => (
        <HowWorkItem key={index} data={item} index={index} />
      ))}
    </Container>
  );
}
