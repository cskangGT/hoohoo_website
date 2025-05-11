import i18next from 'i18next';
import React from 'react';
import Marquee from 'react-fast-marquee';
import styled from 'styled-components';
const Container = styled.div`
  width: calc(100%);
  display: flex;
  margin: 100px 0px;
  height: 120vh;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: all 0.2s ease 0s;
  padding: 3rem 0px;
  padding-bottom: 20px;
  @media screen and (max-width: 800px) {
    margin: 20px auto;
    height: 120vh;
  }
`;
const GreenBackground = styled.div`
  width: 100%;
  height: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('/Images/em_corp_4p_bg.jpeg') no-repeat center center;
  background-size: cover;
`;
const Filter = styled.div`
  width: 100%;
  height: 100%;
  background: #36b864d0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  overflow: visible;

  top: 0;
  left: 0;
  z-index: 1;
`;
const Tag = styled.p<{language?: string}>`
  font-size: 1rem;
  font-weight: 400;
  color: #fff;
  margin: 0px;
  line-height: 1.1;
  white-space: pre-line;
  margin-top: 100px;
  margin-bottom: 30px;
  font-family: ${props =>
    props.language === 'ko' ? 'TmoneyRoundWind' : 'Fredoka'};
`;

const Header = styled.h1<{language?: string}>`
  font-size: 3rem;
  font-weight: 600;
  color: #fff;
  margin: 0px;
  text-align: center;
  line-height: 1.4;
  white-space: pre-line;
  margin-bottom: 50px;
  font-family: ${props =>
    props.language === 'ko' ? 'TmoneyRoundWind' : 'Fredoka'};
  @media screen and (max-width: 600px) {
    font-size: 2rem;
  }
`;
function CorpOurFeatures() {
  const localizedText: any = i18next.t('CorpOurFeatures', {
    returnObjects: true,
  });
  return (
    <Container>
      <GreenBackground>
        <Filter>
          <Tag language={i18next.language}>{localizedText.tag}</Tag>
          <Header language={i18next.language}>{localizedText.title}</Header>
          <Marquee speed={80} style={{overflow: 'visible'}}>
            {localizedText.items.map((card: any, index: number) => (
              <CardItem key={index} data={card} />
            ))}
          </Marquee>
        </Filter>
      </GreenBackground>
    </Container>
  );
}
const CardContainer = styled.div`
  width: 350px;
  height: auto;
  background-color: #fff;
  border-radius: 20px;
  margin-right: 20px;
  padding: 30px 35px;
  box-shadow: 4px 4px 4px 0px #00000040;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 800px) {
    width: 300px;
  }
  @media screen and (max-width: 500px) {
    width: 280px;
  }
  @media screen and (max-width: 400px) {
    width: 250px;
  }
`;
const CardImage = styled.img`
  width: 100%;
  object-fit: contain;
`;
const CardTitle = styled.h3<{language?: string}>`
  font-size: 1.2rem;
  font-weight: 500;
  color: #000;
  margin-top: 0px;
  text-align: center;
  font-family: ${props =>
    props.language === 'ko' ? 'TmoneyRoundWind' : 'Fredoka'};
  @media screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;
const CardDescription = styled.p<{language?: string}>`
  font-size: 1rem;
  font-weight: 400;
  line-height: 2;
  margin-bottom: 0px;
  color: #000;
  text-align: center;
  white-space: pre-line;
  font-family: ${props =>
    props.language === 'ko' ? 'TmoneyRoundWind' : 'Fredoka'};
  @media screen and (max-width: 600px) {
    font-size: 0.75rem;
  }
`;

function CardItem({
  data,
}: {
  data: {
    title: string;
    description: string;
    image: string;
  };
}) {
  return (
    <CardContainer>
      <CardTitle language={i18next.language}>{data.title}</CardTitle>
      <CardImage src={data.image} />

      <CardDescription language={i18next.language}>
        {data.description}
      </CardDescription>
    </CardContainer>
  );
}
export default CorpOurFeatures;
