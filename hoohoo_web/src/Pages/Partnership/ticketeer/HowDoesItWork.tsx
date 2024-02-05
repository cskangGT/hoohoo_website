import React from 'react'
import styled from 'styled-components';
import { Header } from '../../../Component/ContentBox/TwoColBoxesSection';
import { ContentText } from '../B2B/GetInTouch';
const Container = styled.section`
    width: 100%;
  background-color: transparent;
  height: 800px;
  display: flex;
    justify-content: center;
    align-items: center;
  @media screen and (max-width: 800px){
    height: auto;
    flex-direction: column;
  }
`;
const LeftBox = styled.div`
  width: 40%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 800px){
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
  font-family:'Fredoka';
  @media screen and (max-width: 800px){
    font-size: 1.5rem;
    text-align:left;
  }
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  @media screen and (max-width: 800px){
    width: 100%;
  }
`;
const NumberText = styled.span`
  text-align: left;
  font-size: 2.5rem;
  width: 100%;
  color: #00BF63;
  font-family:'Fredoka';
  @media screen and (max-width: 800px){
    text-align: center;
  }
`;
const HeaderText = styled.h2`
  padding: 30px 0;
  font-size: 2.7rem;
  line-height: 1;
  font-family:'Fredoka';
  width: 100%;
  color: black;
  text-align: left;
  @media screen and (max-width: 1000px){
        font-size: 2.3rem;
        text-align:center;
    }
    @media screen and (max-width: 500px){
        text-align:center;
    }
`;
const RightBox = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
    @media screen and (max-width: 800px){
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
const TailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const TailText = styled.span`
  color: #545454;
  font-size: 1rem;
  min-width: 56px;
  @media screen and (max-width: 800px){
    font-size: 1rem;
    }
`;
type DataType = {
    upperText: string;
    number: string;
    header: string;
    content: string;
    image: string;
    tailText?: string;
    tailHeader?:string;
}
type Props = {
    data : DataType;
}
export default function HowDoesItWork({data}: Props) {
    
  return (
    <Container>
        <LeftBox>
            <UpperText>{data.upperText}</UpperText>
            <TextBox>
                <NumberText>
                    {data.number}
                </NumberText>
                <HeaderText dangerouslySetInnerHTML={{__html: data.header}} />
                    
                <ContentBlackText>
                    {data.content}
                </ContentBlackText>
            </TextBox>
        </LeftBox>
        <RightBox>
            <Image src={data.image} />
            {data.tailHeader? <TailContainer>
                <TailText>{data.tailHeader}</TailText>
            <TailText>{data.tailText}</TailText>
            </TailContainer> : 
            data.tailText && <TailText>{data.tailText}</TailText>}
            
        </RightBox>
    </Container>
  )
}
