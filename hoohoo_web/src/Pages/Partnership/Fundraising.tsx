import React, { useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import PartnersWays from './PartnersWays';
import PartnersCardComponent from '../../Component/ContentBox/PartnersCardComponent';
import { useNavigate } from 'react-router-dom';
import i18next from 'i18next';
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
  color: ${theme.darkGray};
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
    color: ${theme.darkGray};
`;
const CardContent = styled.p`
    font-family: 'Poppins', sans-serif;
    font-weight: 200;
    font-size: 16px;
    line-height: 140%;
    color: #2d2d30;
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

const CardContentBox = styled.div`
    display:flex;
    flex-direction: column;
    width: 100% - 40px;
    padding: 30px 20px;
    margin: 20px 0;
    background-color: rgba(57,62,70, 0.25);
    border-radius: 40px;
    position: relative;
    overflow: hidden;
`;
const SolutionHeader = styled.h1`
  text-align: left;
  font-size: 3rem;
  margin-left: 70px;
  @media screen and (max-width: 700px) {
       margin-left: 0;
       text-align: center;
       font-size: 1.5rem;
    }
`;
const RowSpace = styled.div`
  display: flex;
    width: 100%;
    @media screen and (max-width: 700px) {
       flex-direction: column;
    }
`;
const LeftSpace = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;
  @media screen and (max-width: 700px) {
       width: 100%;
    }
`;
const RightSpace = styled.div`
  width: 45%;
  position: relative;
  @media screen and (max-width: 700px) {
       width: 100%;
       height: 350px;
    }
`;
const ImageL = styled.img`
  position: absolute;
  width:350px;
  top: 50%;
  right: 100px;
  z-index: 100;
  @media screen and (max-width: 700px) {
       width: 250px;
       top: 20%;
        right: 25%;
    }
`;

const ImageR = styled.img`
  position: absolute;
  width:230px;
  top: -60%;
  right:50px;
  @media screen and (max-width: 700px) {
    top: 0%;
        right: 0;
    }
`;
const SolSubTitle = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;
const Tt = styled.div`
  display: flex;
  margin-bottom: 20px;
  margin-left: 20%;
  @media screen and (max-width: 700px) {
       margin-left: 0;
    }
`;
const NumberTitle = styled.span`
  font-size: 3.5rem;
  font-weight: 600;
`;
const TextTitle = styled.span`
padding-top: 27px;
padding-left: 20px;
  font-size: 2rem;
  font-weight: 400;
`;
const CT = styled.span`
    
`;
interface Item {
    item: SubTitleProps
}
interface SubTitleProps {
    index: string;
    header: string;
    contents: string;
}
const CTdiv = styled.div`
  padding-left: 32%;
  @media screen and (max-width: 700px) {
    padding-left: 20px;
    }
`;
const ModelContentBox = styled.div`
  display: flex;
  width: 100%;
`;

function SubTitle({ item }: Item) {
    return (
        <SolSubTitle>
            <Tt ><NumberTitle>{item.index}</NumberTitle>
                <TextTitle>{item.header}</TextTitle>
            </Tt>
            <CTdiv>
                <CT>{item.contents}</CT>
            </CTdiv>
        </SolSubTitle>
    )
}
const FutureHeader = styled.span`
  font-size: 10rem;
  width: 100%;
  font-weight: 600;
  padding-left: 40px;
  line-height: 1;
  letter-spacing: -12px;
  @media screen and (max-width: 700px) {
    font-size: 5rem;
    letter-spacing: -5px;
    }
`;
const TrashImage = styled.img`
  width: 100%;
  border-radius: 20px;
`;
const GearImage = styled.img`
  margin: 20px;
  margin-left: 50px;
  width:70px;
  height: 70px;
  @media screen and (max-width: 700px) {
    width: 30px;
    margin-left: 30px;
    height: 30px;
    }
`;
const ModelText = styled.span`
  font-size: 1.5rem;
  padding-right: 10px;
  @media screen and (max-width: 700px) {
    font-size: 1rem;
    padding-bottom: 20px;
    }
`;
const SmallHeader = styled.span`
  font-size: 4rem;
  line-height: 1.4;
  width: 100%;
  padding-left: 50px;
  font-weight: 500;
`;

function Fundraising() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const totalData: any = i18next.t('fundraising', { returnObjects: true });
    const data: DataType[] = totalData.fundsData;
    const cardData: CardType[] = totalData["cardData"]
    const modelData = totalData["modelData"]
    const sd: any = totalData["solutionData"]
    const solutionData: SubTitleProps[] = sd["list"]
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

                <CardContentBox>
                    <SolutionHeader>EarthMera's Solution</SolutionHeader>
                    <RowSpace>
                        <LeftSpace>
                            {
                                solutionData.map((item, index) => (
                                    <SubTitle item={item} />
                                ))
                            }
                        </LeftSpace>
                        <RightSpace>
                            <ImageL src={sd["Imagef"]} />
                            <ImageR src={sd["Imageb"]} />
                        </RightSpace>
                    </RowSpace>
                </CardContentBox>
                <CardContentBox>
                    <RowSpace>
                        <LeftSpace>
                            <FutureHeader>{modelData.first_header}</FutureHeader>
                            <SmallHeader>{modelData.second_header}</SmallHeader>
                            <ModelContentBox>
                                <GearImage src={modelData.compImage} />
                                <ModelText>{modelData.content}</ModelText>
                            </ModelContentBox>
                        </LeftSpace>
                        <RightSpace>
                            <TrashImage src={modelData.image} />
                        </RightSpace>
                    </RowSpace>
                </CardContentBox>
                <PartnersCardBox>
                    {
                        cardData.map((item, index) => (
                            <PartnersCardComponent key={index} item={item} />
                        ))
                    }
                </PartnersCardBox>
                <PartnersWays />
            </ContentBox>
        </Container >
    )
}
export default Fundraising;