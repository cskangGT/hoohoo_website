import React from 'react';
import styled from 'styled-components';
import {ContentText} from '../../B2B/GetInTouch';

import i18next from 'i18next';
import HowWorkItem from './HowWorkItem';
import LinedHeader from '../../../../Component/ContentBox/LinedHeader';
const Container = styled.section`
  width: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;
const LeftBox = styled.div`
  width: 40%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;
const UpperText = styled.span`
  padding: 30px 0;
  font-size: 2rem;
  line-height: 1;
  width: 100%;
  color: black;
  text-align: left;
  font-family: 'Fredoka';
  @media screen and (max-width: 800px) {
    font-size: 1.5rem;
    text-align: left;
  }
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;
const NumberText = styled.span`
  text-align: left;
  font-size: 2.5rem;
  width: 100%;
  color: #00bf63;
  font-family: 'Fredoka';
  @media screen and (max-width: 800px) {
    text-align: center;
  }
`;
const HeaderText = styled.h2`
  padding: 30px 0;
  font-size: 2.7rem;
  line-height: 1;
  font-family: 'Fredoka';
  width: 100%;
  color: black;
  text-align: left;
  @media screen and (max-width: 1000px) {
    font-size: 2.3rem;
    text-align: center;
  }
  @media screen and (max-width: 500px) {
    text-align: center;
  }
`;
const RightBox = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 800px) {
    width: 90%;
    padding-bottom: 50px;
  }
`;
const ContentBlackText = styled(ContentText)`
  color: black;
  line-height: 1;
`;
const Image = styled.img`
  width: 100%;
  object-fit: contain;
`;
const Header = styled.h2`
  margin: 0;
  padding: 0;
  width: 100%;
  margin: 50px 15px;
  font-size: 2.5rem;
  line-height: 1.1;
  text-align: left;
  font-family: 'Fredoka';
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
  const data: any = i18next.t('TicketeerHowWork', {returnObjects: true});
  return (
    <Container>
      <Header>{data.title}</Header>
      {
        data.steps.map((item: any, index: number) => (
          <HowWorkItem key={index} data={item} index={index} />
        ))
      }
      {/* <LeftBox>
        <UpperText>{data.upperText}</UpperText>
        <TextBox>
          <NumberText>{data.number}</NumberText>
          <HeaderText dangerouslySetInnerHTML={{__html: data.header}} />

          <ContentBlackText>{data.content}</ContentBlackText>
        </TextBox>
      </LeftBox>
      <RightBox>
        <Image src={data.image} />
        {data.tailHeader ? (
          <TailContainer>
            <TailText>{data.tailHeader}</TailText>
            <TailText>{data.tailText}</TailText>
          </TailContainer>
        ) : (
          data.tailText && <TailText>{data.tailText}</TailText>
        )}
      </RightBox> */}
    </Container>
  );
}
