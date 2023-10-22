import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import i18next from 'i18next';

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
  color: ${theme.darkGray};
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
  color: ${theme.darkGray};
  background: linear-gradient(-50deg, rgba(80, 108, 93, 0.1) 10%, rgba(46, 46, 46, 0.2) 30%);
  border-radius: 10px;
  padding: 15px;
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
    color: #5c3b03bc;
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
    const data: DataType[] = i18next.t('partnersWay', { returnObjects: true });

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