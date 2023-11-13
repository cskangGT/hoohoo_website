import React, { useState } from 'react';
import styled from 'styled-components';
import { slideInFromTop, theme } from '../../../style';
import i18next from 'i18next';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import { LeftBox, RightBox } from '../../../Component/ContentBox/TwoColBoxesSection'
import { Desc } from '../../../Component/ContentBox/TwoColBoxesSection';
const Container = styled.div`
  width:100%;
  animation: ${slideInFromTop} 0.7s ease-out forwards;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  @media screen and (max-width: 1000px){
        flex-direction: column;
    }
`;
const LeftCell = styled(RightBox)`
  margin-bottom: 60px;
  justify-self: flex-start;
  align-self: start;
  @media screen and (max-width: 1000px){
    justify-self: center;
  align-self: center;
        width: 90%;
    }
`;
const Line = styled.div`
  background-color: ${theme.darkGray};
  width: 30%;
  height: 2px;
  margin: 15px 0;
  @media screen and (max-width: 700px){
        align-self: center;
    }
`;
const Header = styled.h2`
  font-size: 3rem;
  line-height: 1;
  width: 100%;
  font-family:'Fredoka';
  font-weight: 600;
  color: ${theme.darkGray};
  text-align: left;
  margin-bottom: 30px;
    @media screen and (max-width: 700px){
        text-align:center;
        font-size: 3rem;
    }
`;
const ContentText = styled(Desc)`
  color: ${theme.darkGray};
`;
const SBox = styled.div`
    display: flex;
    flex-direction: row;
    height: 200px;
    background-color: #E5CBAF;
    @media screen and (max-width: 1000px){
        flex-direction: column;
        height: auto;
        align-items: center;
        justify-content: center;
        width: 300px;

    }
`;
const Image = styled.img`
  width: 180px;
  height: 180px;
  margin: 10px;
  margin-left: 20px;
  object-fit: contain;
  @media screen and (max-width: 700px){
        margin: 10px;
    }
`;
const TextBox = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 20px 10px ;
  padding-left: 10px;
  @media screen and (max-width: 700px){
        text-align: center;
        width: 90%;
        padding-left: 0px;
        padding-top: 20px;
    }
`;
const Title = styled.p`
  width: 100%;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  margin: 0px;
`;
const Content = styled.p`
  width: 100%;
  font-size: 1rem;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr); // 4행으로 나눕니다.
  gap: 20px; // 셀 사이의 간격
  width: 80%;
  padding: 0 50px;
  align-items: center; 
  justify-items: center;
  @media screen and (max-width: 1000px){
        flex-direction: column;
        margin-top: 20px;
        padding: 0px;
        /* padding: 0 20px; */
    }
`;
type DataProps = {
    img: string;
    title: string;
    content: string;
}
interface Props {
    data : DataProps
}
function Mission({data} :Props) {
    return (
    <SBox>
        <Image src={data.img}/>
        <TextBox>
            <Title>{data.title}</Title>
            <Line />
            <Content>{data.content}</Content>
        </TextBox>
    </SBox>
    )
}
export default function OurMission() {
    
    const data : any =  i18next.t('ourMission', { returnObjects: true });
    
    return (
                <Container>
                    <LeftCell>
                        <Header 
                            dangerouslySetInnerHTML={{__html: data.header}} />
                        <ContentText>{data.content}</ContentText>    
                    </LeftCell>
                    <GridContainer>
                        {
                            data.items.map((item : DataProps)=> (
                                <Mission data={item}/>
                            ))
                        }
                    </GridContainer>
                </Container>
    )
}