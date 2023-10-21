import React, { useState, useEffect } from 'react';
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
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  
`;
const Header = styled.h2`
  font-size: 1.5rem;
  line-height: 1.3;
  text-align: center;
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
const GrowingNumber = styled.span`
  font-size: 2rem;
`;
function Realtime() {
    const [count, setCount] = useState<number>(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prevCount => prevCount + 1);
        }, 100);
        return () => {
            clearInterval(interval);
        };
    }, []);
    const data = {
        header: "YOUR GREEN IMPACT IN NUMBERS",
        content: ""

    }

    return (
        <Container>
            <ContentBox>
                <HorizonContainer>
                    <Header>{data.header}</Header>
                    <GrowingNumber>{count.toLocaleString()}</GrowingNumber>
                </HorizonContainer>
            </ContentBox>
        </Container >
    )
}
export default Realtime;