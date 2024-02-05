import React from 'react'
import styled from 'styled-components';
import { Header } from '../../../Component/ContentBox/TwoColBoxesSection';
const Container = styled.section`
    width: 100%;
  background-color: transparent;
  height: 900px;
  display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  @media screen and (max-width: 1000px){
    height: auto;
  }
`;
const HeaderText = styled(Header)`
  color: black;
  width: 100%;
  font-family: 'Fredoka';
  padding-bottom: 20px;
  @media screen and (max-width: 1000px){
    text-align: center;
    width: 100%;
    margin-top: 50px;
  }
`;
const StepsItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 15px;
  width : 100%;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1000px){
    grid-column-gap: 0px;
    grid-row-gap: 15px;
    grid-template-columns: none;
    grid-template-rows: 1fr 1fr 1fr;
  }
`;
const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  height: 550px;
  @media screen and (max-width: 1000px){
    align-self: center;
    justify-self: center;
    height: auto;
    width: 90%;
  }
`;
const StepImage = styled.img`
  /* width: 90%; */
  height: 309px;
  object-fit: contain;
`;
const ContentText = styled.span`
  color: black;
    font-size: 1.3rem;
    padding: 30px 0px;
    width: 80%;
    text-align: center;
    @media screen and (max-width: 1000px){
        text-align: center;
    }
`;
type ItemType = {
  image: string;
  content : string;
}
function StepItem ({item} : {item :ItemType}): JSX.Element {
  return (
  <ItemContainer>
    <StepImage src={item.image}  />
    <ContentText>{item.content}</ContentText>
  </ItemContainer>
  ) 
   
}

export default function Expect() {
    const data = {
        "header": "What to expect with<br />EarthMera Tickteer?",
        "steps" : [
            {
                "image" : "Images/ticketeer3step1.jpeg",
                "content" : "Voluntary cleaning by participants can significantly reduce festival cleaning expenditures.",
            },
            {
              "image" : "Images/ticketeer3step2.jpeg",
              "content" : "EarthMera can raise environmental awareness among participants who may not respond to traditional cleanup requests on display boards.",
            },
            {
              "image" : "Images/ticketeer3step3.jpeg",
              "content" : "Review collected data to use participant engagement and results as indicators for successful green festival operations.",
            }
        ]
    }
  return (
    <Container>
        <HeaderText dangerouslySetInnerHTML={{__html:data.header}} />
        <StepsItemContainer>
          {
            data.steps.map((item) => (
              <StepItem item={item}></StepItem>
            ))
          }
        </StepsItemContainer>
    </Container>
  )
}
