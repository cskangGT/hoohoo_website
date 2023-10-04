import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style';

const Container = styled.div`
    width: 920px;
    padding: 0px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px auto;
    background-color: transparent;
    margin-bottom: 50px;
    @media screen and (max-width: 1000px) {
        width: 90%;
    }
`;
const LeftHeader = styled.h1`
  text-align: left;
  width: 100%;
  font-weight: 400;
  letter-spacing: 1.1px;
  color: ${theme.white};
  font-size: 26px;
  @media screen and (max-width: 1100px){
      text-align: center;
  }
`;
const Boxes = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 20px 0px;
  @media screen and (max-width: 1100px){
      flex-direction: column;
      align-items : center;
    }
`;
const Box = styled.div`
  color: ${theme.white};
  width: 45%;
  @media screen and (max-width: 1100px){
        width: 100%;
    }
`;
const Header = styled.h4`
  font-size: 18px;
  line-height: 140%;
  font-weight: bold;
  @media screen and (max-width: 1100px){
    align-items: center;
    text-align:center;
  }
  @media screen and (max-width: 800px){
        text-align: start;
    }
`;
const BoxContent = styled.p`
    font-size: 16px;
    line-height: 140%;
    color: rgba(252, 232, 200, 1);
    @media screen and (max-width: 1100px){
        align-items: center;
        text-align:center;
        width: 100%;
    }
    @media screen and (max-width: 800px){
        text-align: start;
    }
`;
type DataType = {
    head: string;
    content: string;
};
function PartnersWays() {
    const data: DataType[] = [
        {
            head: "Events",
            content: "We work with entertainment, educational, and active events. We can create exclusive marketplaces filled with deep discounts and event partner products, accessible only to participants of your event. We also run friendly competitions with live leaderboard step counts and set targets for the participants to complete as."
        },
        {
            head: "Customer partnerships",
            content: "We're eager to use our tech for good. We can build out customised partnerships to support humanitarian, animal welfare, and environmental issues."
        }
    ]

    return (
        <Container>
            <LeftHeader>
                More ways to partner with us
            </LeftHeader>
            <Boxes>
                {
                    data.map((item, index) => (
                        <Box>
                            <Header>
                                {item.head}
                            </Header>
                            <BoxContent>
                                {item.content}
                            </BoxContent>
                        </Box>
                    ))
                }
            </Boxes>
        </Container>
    )
}
export default PartnersWays;