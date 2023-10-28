import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from './style'

import Wrapper from '../../Component/Wrapper/Wrapper';
import LandingFormModal from './LandingFormModal';
import i18next from 'i18next';
const Background = styled.div`
    background-color: transparent;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border-radius: 40px;
    overflow: hidden;
    
`;
const Grid = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    @media screen and (max-width: 1100px) {
        flex-direction: column-reverse;
    }
`;
const RightCell = styled.div`
    display: flex;
    position: relative;
    width: 60%;
    overflow: visible;
    @media screen and (max-width: 1100px) {
        width: 100%;
        align-items: center;
    }
`;
const LeftCell = styled.div`
    justify-content:center;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 55%;
    overflow: hidden;
    padding: 20px 20px;
    padding-top: 0px;
    @media screen and (max-width: 1100px) {
        width: calc(100% - 30px);
        padding: 30px 15px;
        align-items: center;
        margin-bottom: 30px;
    }
`;
const HeaderBox = styled.div`
  display: flex;
`;
const Header = styled.h4`
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 1;
    padding-left: 5px;
    color: #216C53;
    text-transform: uppercase;

    @media screen and (max-width: 700px) {
        font-size: 1rem;
    }
`;
const Title = styled.h1`
    color: #216C53;
    letter-spacing: .4px;
    margin-top: 0.4rem;
    margin-bottom: 0.8rem;
    font-size: 5rem;
    font-weight: 700;
    line-height: 1.2;
    width: 95%;
    text-transform: uppercase;
    @media screen and (max-width: 800px) {
        text-align: center;
        font-size: 2rem;
    }
`;
const Content = styled.p`
    font-size: 1.1rem;
    font-weight: 200;
    width: 90%;
    line-height: 1.5;
    color: rgba(180, 255, 250, 1);
    margin-top: 0.5rem;
    margin-bottom: 3rem;
    color: #216C53;
    @media screen and (max-width: 1100px) {
        text-align: center;
    }

`;
const Button = styled.a`
    font-size: 1.5rem;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    border-radius: 10px;
    margin-top: 0.75rem;
    color: #FF914D;
    border: 4px solid #216C53;
    background-color :transparent;
    display: flex;
    border-radius: 40px;
    text-align: center;
    padding: 10px 70px;
    margin-left: 80px;
    @media screen and (max-width: 1100px) {
        margin : auto;
    }
`;
const LeftEclipse = styled.img`
  width: 13rem;
`;
const EclipseBox = styled.div`
    top: -5rem;
    left: -10rem;
  position: absolute;
  transform: rotate(180deg);
`;
const RightImage = styled.img`
  object-fit: cover;
  position: absolute;
  top: 20px;
  left: -50px;
  width: 100%;
  @media screen and (max-width: 1100px) {
        position: relative;
        top: 0;
        left: 0;
    }
`;
interface DataProps {
    image: string;
    header: string;
    decoImage: string;
    firstDesc: string;
    secDesc: string;
    button: string;
}
interface Props {
    toggleAutoSliding: (state: boolean) => void;
    isOpen : boolean;
    setIsOpen: (state: boolean) => void;
}
function LandingOrganizer({ toggleAutoSliding,  isOpen, setIsOpen }: Props) {
    const data: DataProps = i18next.t('landingOrganizer', { returnObjects: true });
    // const [isOpen, setIsOpen] = useState<boolean>(false);
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
                <Container style={{ overflow: 'hidden' }}>
                    <Grid>
                        <LeftCell>
                            <HeaderBox>
                                <Header>{data.header}</Header>
                            </HeaderBox>
                            <EclipseBox><LeftEclipse src={data.decoImage} /></EclipseBox>
                            <Title>{data.firstDesc} </Title>
                            <Content>{data.secDesc}</Content>
                            <Button onClick={handleOpen}>{data.button}</Button>
                            {isOpen && <LandingFormModal isOpen={isOpen} handleClose={handleClose} />}
                        </LeftCell>
                        <RightCell>
                            <RightImage src={data.image} />
                        </RightCell>
                    </Grid>
                </Container>
            </Wrapper>
        </Background>
    )
}
export default LandingOrganizer;