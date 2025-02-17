import React from 'react';
import styled from 'styled-components';
import {
  LeftBox,
  RightBox,
} from '../../../components/ContentBox/TwoColBoxesSection';
import Wrapper from '../../../components/Wrapper/Wrapper';
import { HomeTransitionButton } from '../../Home/HomeIntroPage';
import { HeaderText } from '../../Home/sections/HomeEnvImpact';
const Container = styled.div`
  display: flex;
  height: 800px;
  flex-direction: row;
  @media screen and (max-width: 800px) {
    flex-direction: column-reverse;
    height: auto;
    padding: 50px 0px;
    align-items: center;
    justify-content: center;
  }
`;

// const LeftBox = styled.div`

// `;
// const RightBox = styled.div`

// `;
const ContentText = styled.span`
  color: black;
  font-size: 1.5rem;
  padding: 30px 0px;
  width: 100%;
  @media screen and (max-width: 800px) {
    text-align: center;
  }
`;
const Header = styled(HeaderText)`
  color: black;
  font-family: 'Fredoka';
  font-size: 2.7rem;
  @media screen and (max-width: 800px) {
    font-size: 2.4rem;
  }
`;
const YHighlightedText = styled.span`
  color: #ffc940;
`;
const LHighlightedText = styled.span`
  color: #f46f36;
`;
const Image = styled.img`
  width: 100%;
  object-fit: contain;
`;
const Left = styled(LeftBox)`
  width: 45%;
  @media screen and (max-width: 800px) {
    width: 90%;
    align-items: center;
    justify-content: center;
  }
`;
const Right = styled(RightBox)`
  width: 55%;
  @media screen and (max-width: 800px) {
    display: flex;
    width: 90%;
    align-items: center;
    justify-content: center;
  }
`;
export const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  @media screen and (max-width: 800px) {
    align-items: center;
    justify-content: center;
  }
`;
export default function PhotoVideoes() {
  const data = {
    header: 'Boost your business with photos or videos',
    content: 'Green users need your products.<br />Advertise across the app.',
    image: 'Images/partnership2Image.png',
    buttonText: 'Ask about ads',
  };
  // const headerWords = data.header.split(' ').map((word, index) => {
  //     if (word.includes('photos')) {
  //       return <><YHighlightedText>{word.replace('photos', ' ')}<YHighlightedText>{` photos `}</YHighlightedText></YHighlightedText>{' '}</>;
  //     } else if (word.includes('videos')) {
  //       return <><LHighlightedText>{word.replace('videos', ' ')}<LHighlightedText>{` videos `}</LHighlightedText></LHighlightedText>{' '}</>;
  //     } else {
  //       return word + ' ';
  //     }
  //   });
  const headerWords = data.header.split(' ').map((word, index, words) => {
    // Check if the word is 'photos' or 'videos'
    if (word === 'photos') {
      return (
        <YHighlightedText key={index}>{' ' + word + ' '}</YHighlightedText>
      );
    } else if (word === 'videos') {
      return (
        <LHighlightedText key={index}>{' ' + word + ' '}</LHighlightedText>
      );
    } else {
      // Include a space before the word unless it's the first word
      return (index > 0 ? ' ' : '') + word;
    }
  });
  return (
    <Wrapper>
      <Container>
        <Left>
          <Header>{headerWords}</Header>
          <ContentText dangerouslySetInnerHTML={{__html: data.content}} />
          <ButtonBox>
            <HomeTransitionButton href="mailto:devceohoony@gmail.com">
              {data.buttonText}
            </HomeTransitionButton>
          </ButtonBox>
        </Left>
        <Right>
          <Image src={data.image} />
        </Right>
      </Container>
    </Wrapper>
  );
}
