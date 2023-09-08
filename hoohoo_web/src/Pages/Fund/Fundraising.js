import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import PartnersWays from './PartnersWays';
import PartnersCardComponent from '../../Component/ContentBox/PartnersCardComponent';
const Container = styled.div`
    width: 100%;
    max-width: 1140px;
    display: flex;
    margin: 0px auto;
    justify-content: flex-start;
    align-items: center;
    transition: all 0.2s ease 0s;
    padding: 0px 15px;
`;
const ContentBox = styled.div`
    max-width: 1140px;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    justify-content: center;
`;
const HeaderBox = styled.div`
  display:flex;
  flex-direction: column;
  color: ${theme.white};
  text-align: center;
  margin-bottom: 60px;
  line-height: 1.2;
  align-items: center;
`;

const FirstHeader = styled.h2`
  font-size: 36px;
  font_weight: 300;
`;
const SecondHeader = styled.span`
    width: 60%;
    font-size: 25px;
    line-height: 1.3;
    opacity: 0.7;
`;
const CardBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  
  @media screen and (max-width: 1100px){
    flex-direction: column;

  }
`;
const CardBox = styled.div`
    display: flex;
    flex-direction: row;
    @media screen and (max-width: 780px){
    flex-direction: column;
    }
`;
const Card = styled.div`
    width: 290px;
    margin: 25px auto;
    box-sizing: border-box;
    padding: 0px 12px;
    text-align: center;
    align-items: center;
    background: linear-gradient(258deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%);
    border: 1px solid rgba(255, 255, 255, 0.06);
    @media screen and (min-width: 1100px){
        width: 262px;
        height: 276px;
        margin: 20px 12px 120px;
        padding: 40px 30px;
        border-radius: 20px;
        box-shadow: rgba(30, 68, 108, 0.08) 0px 30px 60px 0px;
        text-align: left;
    }
`;
const CardImage = styled.img`
  height: 64px;
  margin: 0 0 25px;
`;
const CardHead = styled.h4`
    font-size: 18px;
    line-height: 140%;
    margin-bottom: 8px;
    font-weight: 600;
    color: ${theme.subNeon};
`;
const CardContent = styled.p`
    font-size: 16px;
    line-height: 140%;
    color: rgba(252, 240, 240, 0.7);
`;
const PartnersCardBox = styled.div`
    // background: linear-gradient(253deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.05) 100%);
    border-radius: 20px;
    display: flex;
    align-items: center;
    margin-top: 100px;
    padding-bottom: 75px;
    justify-content: center;
    @media screen and (max-width: 1100px){
        flex-direction: column;
    }
`;
function Fundraising() {
    const data = [{
        image: "Images/connect.png",
        head: "Connect",
        content: "We find a corporate investor to sponsor your festival."
    }, {
        image: "Images/golive.png",
        head: "Go live",
        content: "Your campaign goes live with Eco-Action through our EarthMera."
    }, {
        image: "Images/donate.png",
        head: "Action",
        content: "Users donate their sweatcoins to hit your fundraising goal."
    }, {
        image: "Images/release.png",
        head: "Release",
        content: "When the sweatcoin target is hit, the donor releases the funds."
    }];
    const cardData = [
        {
            image: "Images/c1.jpg",
            msg: "Are you opening festival?",
            button: "CONNECT TO EARTHMERA"
        },
        {
            image: "Images/p1.jpg",
            msg: "Are you a sponsor?",
            button: "SUPPORT EARTHMERA"
        }
    ]

    return (
        <Container>
            <ContentBox>
                <HeaderBox>
                    <FirstHeader>
                        Fundraising in EarthMera
                    </FirstHeader>
                    <SecondHeader>
                        Every week, we feature charitable campaigns for our users to support through their sweatcoins.
                    </SecondHeader>
                </HeaderBox>
                <CardBoxContainer>
                    {
                        data.map((item, index) => (
                            <Card>
                                <CardImage src={item.image} />
                                <CardHead>
                                    {item.head}
                                </CardHead>
                                <CardContent>
                                    {item.content}
                                </CardContent>
                            </Card>
                        ))
                    }
                </CardBoxContainer>
                <PartnersCardBox>
                    {
                        cardData.map((item, index) => (
                            <PartnersCardComponent key={index} item={item}>

                            </PartnersCardComponent>
                        ))
                    }
                    <PartnersCardComponent ></PartnersCardComponent>
                </PartnersCardBox>
                <PartnersWays />


            </ContentBox>
        </Container >
    )
}
export default Fundraising;