import i18next from 'i18next';
import React from 'react';
import styled from 'styled-components';
import {theme} from '../../../../style';

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.darkGray};
  margin: 24px 0;
  @media screen and (max-width: 500px) {
    width: calc(100% - 20px);
    margin: 12px 10px;
  }
`;
const Header = styled.h1`
  font-size: 3rem;
  color: ${theme.darkGray};
  text-align: left;
  font-weight: 500;
  width: 100%;
  margin: 0px;
  line-height: 1.1;
  white-space: pre-line;
  @media screen and (max-width: 1000px) {
    font-size: 2rem;
    text-align: center;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.5rem;
  }
`;

const Container = styled.div`
  width: calc(100%);
  display: flex;
  margin: 100px 0px;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: all 0.2s ease 0s;
  padding: 3rem 0px;
  padding-bottom: 20px;
  @media screen and (max-width: 1000px) {
    margin: 20px auto;
  }
`;
const DescContainer = styled.div`
  width: 60%;
  align-self: flex-start;
  margin-bottom: 40px;
  @media screen and (max-width: 1000px) {
    width: 100%;
    align-self: center;
  }
`;
const Desc = styled.p<{language?: string}>`
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
    width: 90%;
    text-align: center;
  }
  @media screen and (max-width: 500px) {
    margin: 10px 0;
    width: calc(100% - 20px);
    padding: 0px 10px;
    font-size: 1rem;
  }
`;

const ItemsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    padding: 0px 20px;
    width: calc(100% - 40px);
  }
`;

function SmartSustainability() {
  const localizedText: any = i18next.t('SmartSustainability', {
    returnObjects: true,
  });
  return (
    <Container>
      <Header>{localizedText.title}</Header>
      <Divider />
      <DescContainer>
        <Desc language={i18next.language}>{localizedText.description}</Desc>
      </DescContainer>
      <ItemsContainer>
        {localizedText.items.map((item: any, index: number) => (
          <Item key={index} item={item} />
        ))}
      </ItemsContainer>
    </Container>
  );
}
const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  row-gap: 16px;
  @media screen and (max-width: 600px) {
    row-gap: 10px;
  }
`;
const ItemImage = styled.img`
  width: 100%;
  height: 380px;
  border-radius: 30px;
  object-fit: cover;
  @media screen and (max-width: 600px) {
    height: 300px;
  }
`;
const ItemTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  text-align: left;
  margin: 0px;
  margin-bottom: 10px;
  @media screen and (max-width: 600px) {
    margin-bottom: 0px;
  }
`;
const ItemDesc = styled.p<{language?: string}>`
  font-size: 1rem;
  font-family: ${props =>
    props.language === 'ko' ? 'TmoneyRoundWind' : 'Fredoka'};
  font-weight: 300;
  color: #666666;
  white-space: pre-line;
  margin: 0px;
  text-align: left;
  @media screen and (max-width: 600px) {
    margin-bottom: 30px;
    font-size: 0.8rem;
  }
`;

function Item({
  item,
}: {
  item: {
    title: string;
    image: string;
    description: string;
  };
}) {
  return (
    <ItemContainer>
      <ItemImage src={item.image} />
      <ItemTitle>{item.title}</ItemTitle>
      <ItemDesc language={i18next.language}>{item.description}</ItemDesc>
    </ItemContainer>
  );
}

export default SmartSustainability;
