import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import LandingFormModal from './LandingFormModal';
import i18next from 'i18next';
const Background = styled.section`
    background-color: #fffefe;
    display: flex;
    width: 100%;
    border-radius: 40px;
    overflow-x: hidden;
    margin-top: 50px;
`;
const Cell = styled.div`
    width: 100%;
    display: flex;
    position: relative;
    justify-content: space-between;
    @media screen and (max-width: 800px) {
        flex-direction: column;
    }
`;
const LeftCell = styled.div`
    position: relative;
    display: flex;
    width: 60%;
    overflow: visible;
    @media screen and (max-width: 1100px) {
        width: 100%;
        align-items: center;
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
    text-transform: uppercase;
    color: ${theme.darkGray};
    letter-spacing: .4px;
    margin-top: 40px;
    margin-bottom: 0.8rem;
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1.5;
    font-family: 'Fredoka';
    @media screen and (max-width: 800px) {
        text-align: center;
        font-size: 2rem;
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
        font-size: 1.5rem;
    }
`;
const Title2 = styled.h3`
    margin-top: 0.5rem;
    margin-bottom: 0.2rem;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.5;
    padding-left: 5px;
    color: #FF7B27;
    @media screen and (max-width: 800px) {
        margin-top: 0.7rem;   
        font-size: 1.5rem;
    }
`;
const Content = styled.p`
    letter-spacing: -0.5px;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${theme.darkGray};
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    @media screen and (max-width: 800px) {
        text-align: center;
        font-size: 1.3rem;
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
    margin: 1rem 0;
    margin-top: 40px;
    background-color: #006DFF;
    color: ${theme.white};
    width: 50%;
    text-align: center;
    padding: 12px 50px;
    font-family: 'Fredoka';
    text-transform: uppercase;
    @media screen and (max-width: 1100px) {
        font-size: 22px;
        margin-right: 0;
        margin-top: 20px;
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
  width: 100%;
  height: 100%;
  @media screen and (max-width: 1100px) {
        position: relative;
        top: 0;
        left: 0;
        height: auto;
    }
`;
const HighlightedText = styled.span`
    color: #FF7B27;
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
    const data: DataProps = i18next.t('b2c', { returnObjects: true });

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleOpen = () => setIsOpen(true);
    return (
        <Background>
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
        
        </Background>
    )
}
export default LandingB2C
