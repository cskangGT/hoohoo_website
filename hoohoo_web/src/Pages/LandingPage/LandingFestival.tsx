import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from './style'
import { theme } from '../../style';
import Wrapper from '../../Component/Wrapper/Wrapper';
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
const Header = styled.h4`
    margin-top: 0.5rem;
    margin-bottom: 0.2rem;
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1.5;
    color: ${theme.darkGray};
    @media screen and (max-width: 1100px) {
        margin-top: 2rem;
    }
`;
const Title = styled.h1`
    color: ${theme.darkGray};
    letter-spacing: .4px;
    margin-top: 0.4rem;
    margin-bottom: 0.8rem;
    font-size: 3.5rem;
    font-weight: 700;
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
    color: #006dff;
`;
const PartnerButton = styled.a`
// margin : 20px 5px;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    border-radius: 10px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
    margin-top: 0.75rem;
    background-color: #00bf63;
    color: ${theme.white};
    width: calc(100% - 30px);
    text-align: center;
    padding: 10px 0;
    margin-right: 30px;
    @media screen and (max-width: 1100px) {
        margin-right: 0;
    }
`;

const LeftImage = styled.img`
  object-fit: cover;
  height: 110%;
  width: 100%;
  
  @media screen and (max-width: 1100px) {
        position: relative;
        top: 0;
        left: 0;
        height: auto;
    }
`;

const RightUpper = styled.img`
  position: absolute;
  height: 40%;
  right: -5%;
  top: -7%;
  
`;
interface DataProps {
    image: string;
    header: string;
    firstDesc: string;
    secDesc: string;
    button: string;
    rightUp: string;
}
function LandingFestival() {
    const data: DataProps = i18next.t('landingFestival', { returnObjects: true });

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleOpen = () => setIsOpen(true);
    return (
        <Background>
            <Grid>
                <LeftCell>
                    <LeftImage src={data.image} />
                </LeftCell>
                <RightCell>
                    <Title>{data.firstDesc.split("$324,400").map((segment, index, array) => 
                        index === array.length - 1
                        ? segment
                        : <>
                            {segment}
                            <HighlightedText>$324,400</HighlightedText>
                        </>)}</Title>
                    <Content>{data.secDesc}</Content>
                    <PartnerButton onClick={handleOpen}>{data.button}</PartnerButton>
                    {isOpen && <LandingFormModal isOpen={isOpen} setIsOpen={setIsOpen} />}
                </RightCell>
                <RightUpper src={data.rightUp} />

            </Grid>
        </Background>
    )
}
export default LandingFestival