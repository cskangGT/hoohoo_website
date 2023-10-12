import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import PartnersWays from './PartnersWays';
import PartnersCardComponent from '../../Component/ContentBox/PartnersCardComponent';
import { useNavigate } from 'react-router-dom';
const Container = styled.section`
    width: calc(100% - 30px);
    display: flex;
    margin: 0px auto;
    justify-content: flex-start;
    align-items: center;
    transition: all 0.2s ease 0s;
    padding: 0 15px;
`;
const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    justify-content: center;
`;
const HeaderBox = styled.div`
  display:flex;
  flex-direction: column;
  color: ${theme.white};
  text-align: center;
  margin-bottom: 60px;
  line-height: 1.2;
  align-items: center;
`;

const FirstHeader = styled.h2`
  font-size: 36px;
  font-weight: 300;
  @media screen and (max-width: 700px) {
    font-size: 1.7rem;
  }
`;
const SecondHeader = styled.span`
    width: 60%;
    font-size: 25px;
    line-height: 1.3;
    opacity: 0.7;
    @media screen and (max-width: 700px) {
    font-size: 1.2rem;
  }
`;
const CardBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 1100px){
    flex-direction: column;
  }
`;
const CardBox = styled.div`
    display: flex;
    flex-direction: row;
    @media screen and (max-width: 780px){
    flex-direction: column;
    }
`;
const Card = styled.div`
    width: 290px;
    margin: 20px auto;
    box-sizing: border-box;
    padding: 20px 12px;
    text-align: center;
    align-items: center;
    background: linear-gradient(258deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%);
    border: 1px solid rgba(255, 255, 255, 0.06);
    @media screen and (min-width: 1100px) {
        width: 262px;
        height: 276px;
        margin: 20px 12px 120px;
        padding: 40px 30px;
        border-radius: 20px;
        box-shadow: rgba(30, 68, 108, 0.08) 0px 30px 60px 0px;
        text-align: left;
    }
`;
const CardImage = styled.img`
  height: 64px;
  margin: 0 0 10px;
`;
const CardHead = styled.h4`
    font-size: 18px;
    line-height: 140%;
    margin-bottom: 8px;
    font-weight: 400;
    color: ${theme.subNeon};
`;
const CardContent = styled.p`
    font-family: 'Poppins', sans-serif;
    font-weight: 200;
    font-size: 16px;
    line-height: 140%;
    color: rgba(252, 240, 240, 0.7);
`;
const PartnersCardBox = styled.div`
    // background: linear-gradient(253deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.05) 100%);
    width: calc(100% - 30px);
    border-radius: 20px;
    display: flex;
    align-items: center;
    margin-top: 100px;
    padding-bottom: 75px;
    justify-content: center;
    @media screen and (max-width: 1100px){
        flex-direction: column;
    }
    @media screen and (max-width: 700px) {
        padding-left: 15px;
        padding-right: 15px;
    }
`;
type DataType = {
    image: string;
    head: string;
    content: string;
};
type CardType = {
    image: string;
    msg: string;
    button: string;
};


const SupportContainer = styled.div`
    box-shadow: rgba(0, 0, 0, 0.08) 0px 40px 80px 0px;
    background: linear-gradient(253deg, rgba(200, 200, 200, 0.1) 10%, rgba(252, 230, 187, 0.3) 30%);
    backdrop-filter: blur(20px);
    border-radius: 10px;
    width: auto;
    padding: 10px 10px 30px;
    margin: 0px 12px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 1100px) {
        padding: 10px 12px 35px;
    }
    @media screen and (max-width: 700px) {
        width: 100%;
    }
`;
const Image = styled.img`
    width: 45%;
    height: auto;
    border-radius: 5px;
    margin : 10px 10px;
    @media screen and (max-width: 700px) {
        width: 90%;
    }
`;
const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  @media screen and (max-width: 700px) {
     flex-direction: column;
    }
`;
const SupportContent = styled.h3`
  margin: 20px;
  color: ${theme.white};
  font-weight: 600;
  width: 40%;
  text-align: center;
  @media screen and (max-width: 700px) {
     width: 100%;
     margin: 30px 20px;
    }
`;
const SupportBtn = styled.a`
    text-decoration: none;
    display: flex;
    background-color: ${theme.subNeon};
    height: 50px;
    border-radius: 20px;
    border : none;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
    width:288px;
    /* margin: 40px 0px; */
    margin: 20px;
    font-weight: 600;
    justify-content: center;
    align-items:center;
    text-align: center;
    cursor: pointer;
    color: ${theme.darkGray};
    &:hover {
        background-color: ${theme.mainNeon};
        box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.7);
    }
`;
const ContactEach = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 700px) {
     flex-direction: column;
    }
`;
const CardContentBox = styled.div`
    display:flex;
    flex-direction: column;
    width: 100%;
`;


function Fundraising() {
    const navigate = useNavigate();
    function handleClick() {
        navigate(`/coming_soon`);
    }
    const data: DataType[] = [{
        image: "Images/connect.png",
        head: "Connect",
        content: "We find a corporate investor to sponsor your festival."
    }, {
        image: "Images/golive.png",
        head: "Go live",
        content: "Your campaign goes live with Eco-Action through our EarthMera."
    }, {
        image: "Images/donate.png",
        head: "Action",
        content: "Users donate their sweatcoins to hit your fundraising goal."
    }, {
        image: "Images/release.png",
        head: "Release",
        content: "When the sweatcoin target is hit, the donor releases the funds."
    }];
    const cardData: CardType[] = [
        {
            image: "Images/c1.jpg",
            msg: "Are you opening festival?",
            button: "CONNECT TO EARTHMERA"
        },
        {
            image: "Images/p1.jpg",
            msg: "Are you a sponsor?",
            button: "SUPPORT EARTHMERA"
        }
    ]
    const dataChanged =
    {
        images: ["Images/c1.jpg", "Images/p1.jpg"],
        content: [{
            msg: "Are you a festival organizer?",
            button: "CONNECT TO EARTHMERA"
        }, {
            msg: "Are you a sponsor?",
            button: "SUPPORT EARTHMERA"
        }]
    }
    return (
        <Container>
            <ContentBox>
                <HeaderBox>
                    <FirstHeader>
                        Fundraising in EarthMera
                    </FirstHeader>
                    <SecondHeader>
                        Every week, we feature charitable campaigns for our users to support through their sweatcoins.
                    </SecondHeader>
                </HeaderBox>
                <CardBoxContainer>
                    {
                        data.map((item, index) => (
                            <Card key={index}>
                                <CardImage src={item.image} key={'image' + index} />
                                <CardHead>
                                    {item.head}
                                </CardHead>
                                <CardContent>
                                    {item.content}
                                </CardContent>
                            </Card>
                        ))
                    }
                </CardBoxContainer>
                <PartnersCardBox>
                    <SupportContainer>
                        <ImageBox><Image src={dataChanged.images[0]} />
                            <Image src={dataChanged.images[1]} /></ImageBox>
                        <CardContentBox>
                            {
                                dataChanged.content.map((item, i) => (<ContactEach>
                                    <SupportContent>{item.msg}</SupportContent>
                                    <SupportBtn onClick={(event) => {
                                        event.preventDefault()
                                        handleClick()
                                    }}>{item.button}</SupportBtn></ContactEach>
                                ))}
                        </CardContentBox>

                    </SupportContainer>
                    {/* {
                        cardData.map((item, index) => (
                            <PartnersCardComponent key={index} item={item} />
                        ))
                    } */}
                </PartnersCardBox>
                <PartnersWays />
            </ContentBox>
        </Container >
    )
}
export default Fundraising;