import React from 'react';
import styled from 'styled-components';
import {Header} from '../../../Component/ContentBox/TwoColBoxesSection';
import {ContentText} from '../B2B/GetInTouch';
const Container = styled.section`
  width: 100%;
  background-color: transparent;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 800px) {
    height: auto;
    flex-direction: column;
  }
`;
const LeftBox = styled.div`
  width: 50%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;
const RightBox = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 800px) {
    width: 90%;
  }
`;
const HeaderText = styled(Header)`
  color: black;
  width: 70%;
  font-family: 'Fredoka';
  padding-bottom: 50px;
  @media screen and (max-width: 800px) {
    text-align: center;
    width: 100%;
    padding-bottom: 20px;
  }
`;
const HighlightedText = styled.span`
  color: #00bf63;
`;
const ContentBlackText = styled(ContentText)`
  color: black;
`;
const Image = styled.img`
  width: 90%;
  object-fit: contain;
`;
export default function WhatTicketeer() {
  const data = {
    header: 'So, what is<br />EarthMera Tickteer?',
    content:
      'Tickteer is a feature allowing collaboration between EarthMera and your festival business.',
    image: 'Images/ticketeer2Image.png',
  };
  return (
    <Container>
      <LeftBox>
        <HeaderText>
          {data.header.split('<br />').map((line, index, array) => (
            <React.Fragment key={index}>
              {line.split('EarthMera Tickteer?').map((segment, i, arr) =>
                i === arr.length - 1 ? (
                  segment
                ) : (
                  <>
                    {segment}
                    <HighlightedText> {'EarthMera Tickteer?'}</HighlightedText>
                  </>
                ),
              )}
              {index !== array.length - 1 && <br />}
            </React.Fragment>
          ))}
        </HeaderText>
        <ContentBlackText>{data.content}</ContentBlackText>
      </LeftBox>
      <RightBox>
        <Image src={data.image} />
      </RightBox>
    </Container>
  );
}
