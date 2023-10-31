import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import LandingFormModal from './LandingFormModal';
import i18next from 'i18next';
const Background = styled.div`
    background-color: #fffefe;
    display: flex;
    width: 100%;
    border-radius: 40px;
    overflow: hidden;
    margin-top: 50px;
`;
const Grid = styled.div`
    width: 100%;
    display: flex;
    position: relative;
    justify-content: space-between;
    @media screen and (max-width: 1100px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;
const LeftCell = styled.div`
    align-items: center;
    display: flex;
    width: 60%;
    overflow: visible;
    position: relative;
    z-index: 100;
    @media screen and (max-width: 1100px) {
        width: calc(100% - 30px);
        padding: 0 15px;
        justify-content: center;
    }
    
`;
const RightCell = styled.div`
    justify-content:center;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: calc(40%);
    padding: 40px 50px;
    position: relative;
    @media screen and (max-width: 1100px) {
        width: calc(100% - 30px);
        padding: 30px 15px;
        align-items: center;
        margin-bottom: 30px;
    }
`;
const Title = styled.h1`
    color: ${theme.darkGray};
    letter-spacing: .4px;
    margin-top: 0.4rem;
    margin-bottom: 0.8rem;
    font-size: 3.5rem;
    font-weight: 700;
    font-family: 'Fredoka';
    line-height: 1.5;
    text-transform: uppercase;
    @media screen and (max-width: 1100px) {
        text-align: center;
        font-size: 2rem;
    }
`;
const Content = styled.p`
    font-size: 1.4rem;
    font-weight: 200;
    line-height: 1.4;
    color: #5f5555;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    @media screen and (max-width: 1100px) {
        text-align: center;
    }

`;
const HighlightedText = styled.span`
    color: #FF7B27;
`;
const PartnerButton = styled.a`
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    border-radius: 10px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
    margin-top: 0.75rem;
    background-color: #846140;
    color: ${theme.white};
    width: calc(100% - 30px);
    text-align: center;
    padding: 10px 0;
    margin-right: 30px;
    z-index: 9999;
    @media screen and (max-width: 1100px) {
        margin-right: 0;
    }
`;

const LeftImage = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
  margin-left: 70px;
  @media screen and (max-width: 800px) {
    margin-top: 50px;
        margin-left: 0;
        height: auto;
        z-index: 99;
    }
`;

const LeftBot = styled.img`
  position: absolute;
  left:0;
  width: 20%;
  bottom: 0;
  z-index: 100;
  @media screen and (max-width: 800px) {
        width:50%;
    }
`;
const RightTop = styled.img`
  position: absolute;
  top:0;
  width: 20%;
  right: 0;
  z-index: 100;
  @media screen and (max-width: 800px) {
        width:50%;
    }
`;

interface DataProps {
    image: string;
    header: string;
    firstDesc: string;
    secDesc: string;
    button: string;
    highlight: string;
    rightUp: string;
    leftBotImg: string;
    rightTopImg: string;
}
function LandingFestival() {
    const data: DataProps = i18next.t('landingFestival', { returnObjects: true });
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleOpen = () => setIsOpen(true);
    return (
        <Background>
            <Grid>
            <LeftBot src={data.leftBotImg} />
                <LeftCell>
                    <LeftImage src={data.image} />        
                </LeftCell>
                <RightCell>
                    <Title>{data.firstDesc.split(data.highlight).map((segment, index, array) => 
                        index === array.length - 1
                        ? segment
                        : <>
                            {segment}
                            <HighlightedText>{data.highlight}</HighlightedText>
                        </>)}</Title>
                    <Content>{data.secDesc}</Content>
                    <PartnerButton onClick={handleOpen}>{data.button}</PartnerButton>
                    {isOpen && <LandingFormModal isOpen={isOpen} setIsOpen={setIsOpen} />}
                </RightCell>
                <RightTop src={data.rightTopImg} />
            </Grid>
        </Background>
    )
}
export default LandingFestival