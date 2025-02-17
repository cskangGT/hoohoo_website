import React from 'react';
import styled from 'styled-components';
import { Header } from '../../../components/ContentBox/TwoColBoxesSection';
import Wrapper from '../../../components/Wrapper/Wrapper';
import { HomeTransitionButton } from '../../Home/styles';
import { ButtonBox } from './PhotoVideoes';
const Container = styled.section`
  width: 100%;
  background-color: transparent;
  height: 800px;
  @media screen and (max-width: 800px) {
    height: auto;
  }
`;
const Background = styled.div`
  width: 100%;
  background-color: #2a895f;

  height: 700px;
  display: flex;

  z-index: 1;
  @media screen and (max-width: 800px) {
    height: auto;
    margin: 50px 0px;
  }
`;
const InnerContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  height: 700px;
  width: 100%;
  z-index: 10;
  @media screen and (max-width: 800px) {
    height: auto;
    flex-direction: column;
  }
`;
const LeftBox = styled.div`
  display: flex;
  padding: 10px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 55%;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;
const RightBox = styled.div`
  display: flex;
  width: 45%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  @media screen and (max-width: 800px) {
    width: 100%;
    padding: 10px;
  }
`;
const HeaderText = styled(Header)`
  width: 100%;
  font-size: 2.7rem;
  font-family: 'Fredoka';
  line-height: 1.3;
  color: white;
  @media screen and (max-width: 800px) {
    font-size: 2.4rem;
  }
`;
const ContentText = styled.span`
  color: white;
  font-size: 1.5rem;
  padding: 30px 0px;
  width: 100%;
  @media screen and (max-width: 800px) {
    text-align: center;
  }
`;
const HighlightedText = styled.span`
  background-color: #006dff;
  color: white;
  padding: 0.2em;
  border-radius: 4px;
`;
const Button = styled(HomeTransitionButton)`
  background-color: #ffc940;
`;
const Image = styled.img`
  height: 500px;
  width: 100%;
  object-fit: contain;
  @media screen and (max-width: 800px) {
    height: auto;
  }
`;
const TailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const EMBagText = styled.span`
  color: white;
  font-size: 1.3rem;
  min-width: 80px;
  @media screen and (max-width: 800px) {
    font-size: 1rem;
  }
`;

export default function EMBags() {
  const data = {
    header: 'Still, using plastic<br />or paper bags<br />in your business?',
    content:
      'Plastic bags are being banned worldwide, and even paper bags contribute significantly to pollution. Using the EM bag, consumer data will aid your green business.',
    image: 'Images/partnership3Image.png',
    buttonText: 'Ask about EM bags',
    tailText:
      'Made from bio-based materials and designed with a QR code, these EM-bags are used by users for clean-up, collecting trash efficiently.',
  };
  return (
    <Container>
      <Background>
        <Wrapper>
          <InnerContainer>
            <LeftBox>
              <HeaderText dangerouslySetInnerHTML={{__html: data.header}} />
              <ContentText>
                {data.content.split('EM bag,').map((segment, i, arr) =>
                  i === arr.length - 1 ? (
                    segment
                  ) : (
                    <>
                      {segment}
                      <HighlightedText> {'EM bag,'}</HighlightedText>
                    </>
                  ),
                )}
              </ContentText>
              <ButtonBox>
                <Button href="mailto:devceohoony@gmail.com">
                  {data.buttonText}
                </Button>
              </ButtonBox>
            </LeftBox>
            <RightBox>
              <Image src={data.image} />
              <TailContainer>
                <EMBagText>EM bag:</EMBagText>
                <EMBagText>{data.tailText}</EMBagText>
              </TailContainer>
            </RightBox>
          </InnerContainer>
        </Wrapper>
      </Background>
    </Container>
  );
}
