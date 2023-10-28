import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from './style'
import { theme } from '../../style';
import Wrapper from '../../Component/Wrapper/Wrapper';
import LandingFormModal from './LandingFormModal';
import i18next from 'i18next';
const Background = styled.section`
    width: 100%;
    /* height: calc(100% - 82px); */
    height: 100px;
    margin-top: 82px;
    position: relative;
    display: flex;
    flex-flow: wrap;
    
`;
const Cell = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: relative;
    @media screen and (max-width: 1100px) {
        flex-direction: column;
    }
`;
const LeftCell = styled.div`
    align-items: center;
    display: flex;
    width: 60%;
    overflow: visible;
    position: relative;
    z-index: 100;
    @media screen and (max-width: 800px) {
        display: absolute;
        
        width: calc(100% - 30px);
        padding: 0 15px;
    }
    
`;
const RightCell = styled.div`
    /* background-color: #fffefe; */
    display: flex;
    flex-direction: column;
    width: 40%;
    padding-left: 20px;
    @media screen and (max-width: 800px) {
        padding: 15px;
        width: calc(100% - 30px);
        justify-content: center;
        align-items: center;
    }
`;
const Header = styled.h4`
    text-transform: uppercase;
    color: ${theme.darkGray};
    letter-spacing: .4px;
    margin-top: 90px;
    margin-bottom: 0.8rem;
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.4;
    @media screen and (max-width: 800px) {
        text-align: center;
        font-size: 1.3rem;
        margin-top: 10px;
    }
`;
const Title = styled.h3`
    margin-top: 0.5rem;
    margin-bottom: 0.2rem;
    font-size: 2rem;
    font-weight: 500;
    line-height: 1.5;
    color: ${theme.darkGray};
    @media screen and (max-width: 800px) {
        margin-top: 0.7rem;
        font-size: 1rem;
    }
`;
const Title2 = styled.h3`
    margin-top: 0.5rem;
    margin-bottom: 0.2rem;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.5;
    padding-left: 5px;
    color: ${theme.darkGray};
    @media screen and (max-width: 800px) {
        margin-top: 0.7rem;   
        font-size: 1rem;
    }
`;
const Content = styled.p`
    width: 80%;
    letter-spacing: -0.5px;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${theme.darkGray};
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    @media screen and (max-width: 800px) {
        text-align: center;
        font-size: 1rem;
    }
`;
const PartnerButton = styled.a`
    font-size: 26px;
    font-weight: 500;
    cursor: pointer;
    line-height: 1.5;
    text-decoration: none;
    border-radius: 30px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
    margin-top: 0.75rem;
    background-color: ${theme.darkGray};
    color: ${theme.white};
    width: 30%;
    text-align: center;
    padding: 12px 50px;
    margin-right: 40px;
    @media screen and (max-width: 1100px) {
        font-size: 22px;
        margin-right: 0;
        width: auto;
    }
`;
const TitleBox = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 1100px) {
        justify-content: center;
    }
  
`;
const LeftImage = styled.img`
  object-fit: cover;
  position: absolute;
  left: -30px;
  top: 50px;
  width: 100%;
  height: 110%;
  @media screen and (max-width: 1100px) {
        position: relative;
        top: 0;
        left: 0;
        height: auto;
    }
`;
const HighlightedText = styled.span`
    color: #FF5733; /* 원하는 색상으로 변경하세요. */
`;
interface DataProps {
    image: string;
    header: string;
    firstDesc: {
        part1: string;
        part2: string;
    };
    secDesc: {
        part1: string;
        part2: string;
    };
    button: string;
}
function LandingB2C() {
    const data: DataProps = {
        "image"  : "Images/card2.png",
        "header" :"so I just get money for using tumblers and eco-bags?",
        "firstDesc": {
            "part1" : "Sign up now,",
            "part2" : "earn $10."
        },
        "secDesc" : {
            "part1" : "Earn money by snapping eco-friendly actions with EarthMera.",
            "part2" : "Let's make money and save the Earth."
        },
        "button" : "Grab $10"
    }

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleOpen = () => setIsOpen(true);
    return (
        <Background>
            <Container>
            <Cell>
                <LeftCell>
                    <LeftImage src={data.image} />
                </LeftCell>
                <RightCell>
                    <Header>
                    {data.header.split("money").map((segment, index, array) => 
                        index === array.length - 1
                        ? segment
                        : <>
                            {segment}
                            <HighlightedText>money</HighlightedText>
                        </>
                    )}
                    </Header>
                    <TitleBox>
                        <Title>{data.firstDesc.part1}</Title>
                        <Title2>{data.firstDesc.part2}</Title2>
                    </TitleBox>
                    <Content>{data.secDesc.part1}<br /> {data.secDesc.part2}</Content>
                    <PartnerButton onClick={handleOpen}>{data.button}</PartnerButton>
                    {isOpen && <LandingFormModal isOpen={isOpen} setIsOpen={setIsOpen} />}
                </RightCell>

            </Cell>
            </Container>
        </Background>
    )
}
export default LandingB2C