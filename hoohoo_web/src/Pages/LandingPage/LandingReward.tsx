import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from './style'
import { theme } from '../../style';
import LandingFormModal from './LandingFormModal';
import Wrapper from '../../Component/Wrapper/Wrapper';
const Background = styled.div`
    background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow: hidden;
`;
const Grid = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    @media screen and (max-width: 700px) {
        flex-direction: column;
    }
`;
const RightCell = styled.div`
    align-items: center;
    display: flex;
    width: 60%;
    overflow: visible;
    margin-bottom: 120px;
    position: relative;
    @media screen and (max-width: 700px) {
        width: 100%;
        margin-bottom: 30px;
    }
`;
const LeftCell = styled.div`
    justify-content:center;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 50%;
    padding: 50px 20px;
    margin-bottom: 120px;
    border-radius: 0 50% 50% 0;
    background-color: #2280EB;
    @media screen and (max-width: 700px) {
        width: calc(100% - 20px);
        padding: 10px 10px;
        padding-bottom: 90px;
        border-radius: 0 0 50% 50%;
        align-items: center;
        margin-bottom: 10px;
    }
`;
const LogoBox = styled.div`
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const LogoImage = styled.img`
  width: 50px;
  height: 50px;
`;

const HeaderBox = styled.div`
  display: flex;
`;
const Header = styled.h4`
    margin-top: 1.3rem;
    margin-bottom: 1rem;
    font-size: 2.5rem;
    font-weight: 300;
    line-height: 1.5;
    color: ${theme.white};
    padding-left: 10px;
    @media screen and (max-width: 700px) {
        font-weight: 500;

    }
`;
const Title = styled.h1`
    color: ${theme.white};
    letter-spacing: .4px;
    margin-top: 0.4rem;
    margin-bottom: 0.8rem;
    font-size: 5.3rem;
    font-weight: 500;
    line-height: 1.2;
    width: 95%;
    @media screen and (max-width: 700px) {
        text-align: center;
        font-size: 2rem;
    }
`;
const Content = styled.p`
    font-size: 1.2rem;
    font-weight: 200;
    width: 90%;
    line-height: 1.5;
    color: rgba(180, 255, 250, 1);
    margin-top: 0.5rem;
    margin-bottom: 3rem;
    @media screen and (max-width: 700px) {
        text-align: center;
    }

`;
const PartnerButton = styled.a`
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    border-radius: 10px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
    margin-top: 0.75rem;
    background-color: ${theme.darkGray};
    color: ${theme.white};
    display: flex;
    border-radius: 40px;
    text-align: center;
    padding: 10px 70px;
    margin-left: 50px;
    @media screen and (max-width: 700px) {
        margin-left: 0;
    }
`;

const RightImage = styled.img`
  object-fit: contain;
  width: 120%;
  height: 100%;
  @media screen and (max-width: 700px) {
        transform: rotate(90deg);
        width: 100%;
        height: 140%;
    }
`;
const RightMock = styled.img`
  position: absolute;
  width: 70%;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
`;
interface Props {
    toggleAutoSliding: (state: boolean) => void;
}
function LandingReward({ toggleAutoSliding }: Props) {
    const data =
    {
        header: "Earthmera",
        logo: "Images/og_earthmera_logo.png",
        rightImage: "Images/2p_half_circle.svg",
        mock: "Images/Verifying.svg",
        firstDesc: "Take rewards from eco-ations.",
        secDesc: "Earthmera promotes every eco-practices. Our small steps bring big changes to the Earth.",
        button: "Get Rewards"
    }
    const [isOpen, setIsOpen] = useState<boolean>(false);
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
                            <HeaderBox>
                                <LogoBox>
                                    <LogoImage src={data.logo} />
                                    <Header>{data.header}</Header>
                                </LogoBox>
                            </HeaderBox>
                            <Title>{data.firstDesc} </Title>
                            <Content>{data.secDesc}</Content>
                            <PartnerButton onClick={handleOpen}>{data.button}</PartnerButton>
                            {isOpen && <LandingFormModal isOpen={isOpen} handleClose={handleClose} />}
                        </LeftCell>
                        <RightCell>
                            <RightImage src={data.rightImage} />
                            <RightMock src={data.mock} />
                        </RightCell>
                    </Grid>
                </Container>
            </Wrapper>
        </Background>
    )
}
export default LandingReward