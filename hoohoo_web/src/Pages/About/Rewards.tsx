import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import i18next from 'i18next';
const Container = styled.div`
    width: 100%;
    display: flex;
    margin: 0px auto;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    transition: all 0.2s ease 0s;
    padding: 5rem 15px;
    @media screen and (max-width: 600px){
        margin-top: 70px;
    }
`;
const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    justify-content: center;
`;
const HeaderBox = styled.div`
  color: ${theme.darkGray};
  text-align: center;
  margin-bottom: 30px;
  line-height: 1.2;
`;

const HorizonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 500px){
        flex-direction: column;
    }
`;
const LeftBox = styled.div`
    align-items: center;
    justify-content: start;
    display: flex;
    width: 45%;
    flex-direction :row;
    @media screen and (max-width: 1100px){
        text-align: center;
    }
    @media screen and (max-width: 500px){
        padding: 0 10px;
        width: 80%;
    }
`;
const Header = styled.h2`
  font-size: 3rem;
  line-height: 1.3;
  width: 100%;
  color: ${theme.darkGray};
`;
const Desc = styled.p`
    font-size: 1.4rem;
    line-height: 1.6;
    width: 100%;
    color: ${theme.darkGray};
    opacity: 0.8;
    margin: 0 5px;
    @media screen and (max-width: 1100px){
      text-align:center;
      margin: 20px 0;
    }
    @media screen and (max-width: 700px){
        width: 100%;
        font-size: 1rem;
        
    }
`;
const RightBox = styled.div`
    box-sizing: border-box;
    width: calc(55% - 20px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background: linear-gradient(170deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.05) 100%);
    border-radius: 20%;
    margin: auto;
    @media screen and (max-width: 500px){
        margin-top: 10px;
        width: 100%;
    }
    
`;

const Image = styled.img`
  width: 100%;  // RightBox의 너비에 맞춤
  height: 100%;
  object-fit: contain;
  overflow: hidden;
  border-radius: 30px;
`;



function Rewards() {
    const data = {
        header: "Reward",
        content: "You can exchange the points you've collected for eco-products and various gift cards.",
        image: 'Images/rewards.png'
    }

    return (
        <Container>
            <ContentBox>
                <HorizonContainer>
                    <LeftBox>
                        <HeaderBox>
                            <Header>
                                {data.header}
                            </Header>
                            <Desc>
                                {data.content}
                            </Desc>
                        </HeaderBox>
                    </LeftBox>
                    <RightBox>
                        <Image src={data.image} />
                    </RightBox>
                </HorizonContainer>
            </ContentBox>
        </Container >
    )
}
export default Rewards;