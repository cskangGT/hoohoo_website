import React, { useEffect } from 'react';
import styled from 'styled-components';
import PartnersWays from './PartnersWays';
import PartnersCardComponent from '../../Component/ContentBox/PartnersCardComponent';
import i18next from 'i18next';
import Fundraising from './Fundraising';
const Container = styled.section`
    width: calc(100% - 30px);
    display: flex;
    margin: 0px auto;
    justify-content: flex-start;
    align-items: center;
    transition: all 0.2s ease 0s;
    padding: 0 15px;
    margin-bottom: 50px;
`;
const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    justify-content: center;
`;
const CardBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 60px auto;
  @media screen and (max-width: 1100px){
    flex-direction: column;
  }
`;
const PartnersCardBox = styled.div`
    // background: linear-gradient(253deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.05) 100%);
    width: calc(100%);
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
        padding: 0 15px;
        width: calc(100%);

    }
`;
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
    margin: 60px 0;
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
  
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @media screen and (max-width: 700px) {
       width: 100%;
       height: 400px;
    }
`;
const ImageL = styled.img`
  position: absolute;
  width:350px;
  top: 50%;
  right: 40px;
  z-index: 100;
  @media screen and (max-width: 700px) {
        width: 250px;
        top: 20%;
        right: 20%;
    }
`;

const ImageR = styled.img`
  position: absolute;
  width: 230px;
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
interface SolutionProps {
    list : SubTitleProps[];
    title: string;
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
  font-size: 8rem;
  width: 100%;
  font-weight: 600;
  line-height: 1;
  padding-left: 40px;
  letter-spacing: -4px;
  @media screen and (max-width: 700px) {
    text-align: center;
    padding-left: 0;
    font-size: 4rem;
    letter-spacing: -4px;
    }
`;
const TrashImage = styled.img`
  width: 80%;
  border-radius: 20px;
`;
const ModelText = styled.span`
  font-size: 1.6rem;
  padding-right: 10px;
  padding-left: 40px;
  @media screen and (max-width: 700px) {
    font-size: 1rem;
    padding-bottom: 20px;
    }
`;
const SmallHeader = styled.span`
  font-size: 2.5rem;
  line-height: 1.4;
  width: 100%;
  padding-left: 50px;
  font-weight: 500;
  margin-bottom: 30px;
  @media screen and (max-width: 700px) {
    text-align: center;
    padding-left: 0;
    font-size: 2rem;
    letter-spacing: -3px;
    }
`;



function IntroEarthMera() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const totalData: any = i18next.t('IntroEarthMera', { returnObjects: true });
    const cardData: CardType[] = totalData["cardData"]
    const modelData = totalData["modelData"]
    const sd: any = totalData["solutionData"]
    const solutionData: SubTitleProps[] = sd["list"]
    return (
        <Container>
            <ContentBox>
                <CardBoxContainer>
                    <Fundraising></Fundraising>
                </CardBoxContainer>
                <CardContentBox>
                    <SolutionHeader>{sd.title}</SolutionHeader>
                    <RowSpace>
                        <LeftSpace>
                            {
                                solutionData.map((item, index) => (
                                    <SubTitle item={item} key={index} />
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
export default IntroEarthMera;