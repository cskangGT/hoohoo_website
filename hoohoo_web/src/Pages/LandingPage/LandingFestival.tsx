import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from './style'
import { theme } from '../../style';
import Wrapper from '../../Component/Wrapper/Wrapper';
import LandingFormModal from './LandingFormModal';
const Background = styled.div`
    background: url("Images/1pBg.svg") center top / cover no-repeat;
    // background-size: cover;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;
const Grid = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
    margin: 80px 0;
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
    width: 40%;
    margin-bottom: 120px;
    z-index: 100;
    @media screen and (max-width: 1100px) {
        width: 100%;
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
    color: ${theme.white};
    @media screen and (max-width: 1100px) {
        margin-top: 2rem;
    }
`;
const Title = styled.h1`
    color: ${theme.white};
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
    color: rgba(180, 255, 250, 1);
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
  width: 100%;
  height: 100%;
  @media screen and (max-width: 1100px) {
        position: relative;
        top: 0;
        left: 0;
        height: auto;
    }
`;

const LeftDown = styled.img`
  position: absolute;
    width: 40%;
    bottom: -25%;
    left: -10%;
    @media screen and (max-width: 1100px) {
        width: auto;
        height: 20%;
        bottom:-18%;
    }
`;
const RightUpper = styled.img`
  position: absolute;
  height: 40%;
  right: -8%;
  top: -10%;
  
`;
function LandingFestival() {
    const data =
    {
        header: "Earthmera",
        image: "Images/1p_trash_pic.svg",
        firstDesc: "Save up to $324,400 in festival cleaning costs for free",
        secDesc: "At major festivals, approximately 600 individuals are paid $15 per hour for cleaning during a span of three days. However, we encourage over 400,000 festival attendees to help maintain cleanliness.",
        button: "Try it Free",
        leftDown: "Images/1p_left_under_side_half_circle.svg",
        rightUp: "Images/1p_right_side_half_circle.svg"
    }
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleOpen = () => setIsOpen(true);
    return (
        <Background>
            <Wrapper>
                <Container>
                    <Grid>
                        <LeftCell>
                            <LeftImage src={data.image} />
                        </LeftCell>
                        <RightCell>
                            <Header>{data.header}</Header>
                            <Title>{data.firstDesc} </Title>
                            <Content>{data.secDesc}</Content>
                            <PartnerButton onClick={handleOpen}>{data.button}</PartnerButton>
                            {isOpen && <LandingFormModal isOpen={isOpen} setIsOpen={setIsOpen} />}
                        </RightCell>
                        <LeftDown src={data.leftDown} />
                        <RightUpper src={data.rightUp} />

                    </Grid>

                </Container>
            </Wrapper>
        </Background>
    )
}
export default LandingFestival