import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from './style'
import { theme } from '../../style';
import Wrapper from '../../Component/Wrapper/Wrapper';
import LandingFormModal from './LandingFormModal';
import i18next from 'i18next';
const Background = styled.div`
    background-color: transparent;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 40px;
`;
const Grid = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    overflow: hidden;
    margin-bottom: 100px;
    @media screen and (max-width:1100px) {
        flex-direction: column;
        margin-bottom: 30px;
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
    overflow: hidden;
    width: 40%;
    margin-bottom: 120px;
    z-index: 100;
    @media screen and (max-width: 1100px) {
        width: 100%;
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
    font-weight: 500;
    line-height: 1.4;
    @media screen and (max-width: 1100px) {
        text-align: center;
        font-size: 2rem;
    }
`;
const Content = styled.p`
    font-size: 1.2rem;
    font-weight: 200;
    line-height: 1.5;
    color: #5f5555;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    @media screen and (max-width: 1100px) {
        text-align: center;
    }

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
    background-color: ${theme.darkGray};
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

const RightUpper = styled.img`
  position: absolute;
  height: 40%;
  right: -5%;
  top: -10%;
  
`;
interface DataProps {
    image: string;
    header: string;
    firstDesc: string;
    secDesc: string;
    button: string;
    rightUp: string;
}
interface Props {
    toggleAutoSliding: (state: boolean) => void;
    isOpen : boolean;
    setIsOpen: (state: boolean) => void;
}
function LandingFestival({ toggleAutoSliding, isOpen, setIsOpen }: Props) {
    const data: DataProps = i18next.t('landingFestival', { returnObjects: true });
    const handleOpen = () => {
        toggleAutoSliding(false);
        setIsOpen(true);
    };

    const handleClose = () => {
        toggleAutoSliding(true);
        setIsOpen(false);
    };
    return (
        <Background>
            <Wrapper>
                <Container>
                    <Grid>
                        <LeftCell>
                            <LeftImage src={data.image} />
                        </LeftCell>
                        <RightCell>
                            <Title>{data.firstDesc} </Title>
                            <Content>{data.secDesc}</Content>
                            <PartnerButton onClick={handleOpen}>{data.button}</PartnerButton>
                            {isOpen && <LandingFormModal isOpen={isOpen} handleClose={handleClose} />}
                        </RightCell>
                        <RightUpper src={data.rightUp} />
                    </Grid>
                </Container>
            </Wrapper>
        </Background>
    )
}
export default LandingFestival