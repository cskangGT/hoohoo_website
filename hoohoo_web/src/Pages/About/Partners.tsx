import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import i18next from 'i18next';
const Container = styled.div`
    width: 100%;
    display: flex;
    margin: 0px auto;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    transition: all 0.2s ease 0s;
    padding: 5rem 15px;
    @media screen and (max-width: 600px){
        margin-top: 70px;
    }
`;
const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    justify-content: center;
`;
const HeaderBox = styled.div`
  color: ${theme.darkGray};
  text-align: center;
  margin-bottom: 30px;
  line-height: 1.2;
`;

const FirstHeader = styled.span`
  font-size: 1.3rem;
`;
const SecondHeader = styled.h2`
    font-size: 2rem;
    line-height: 0.8;
`;
const SlickBar = styled.div`
  margin: 0;
  padding: 0;
  width: 30%;
  @media screen and (max-width: 600px){
        width: 100%;
        
    }
`;
const LongBar = styled.div`
  margin-bottom: 20px;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1100px){
    justify-content: center;
    margin-bottom: 0;
  }
  @media screen and (max-width: 600px){
    margin: 10px 0;
        flex-direction: row;  
        
    }
`;
const DescBox = styled.div`
  margin : 20px 5px;
  display: flex;
  width: auto;
  @media screen and (max-width: 1000px){
    margin: 0 5px;     
  }
    @media screen and (max-width: 500px){
        margin: 40px 3px;
    }
`;
interface OutlineProps {
    op: number;
    slideIndex: number;
}
const Outline = styled.button<OutlineProps>`
    opacity: ${props => props.op === props.slideIndex ? 1 : 0.3};
    background : none;
    border: none;
    cursor: pointer;
    margin-right: 10px;
    font-size: 20px;
  outline: none;
  display: block;
  float: left;
  height: 100%;
  min-height: 1px;
  border-radius: 20px;
  margin : 20px 0;
  @media screen and (max-width: 600px){
        margin: 5px 0;
        flex-direction: row;
    }
`;
const OutlineText = styled.h3`
    color: ${theme.darkGray};
    @media screen and (max-width: 600px){
        font-size: 1.1rem;
        margin: 0 0.5rem;
    }
`;

const HorizonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 500px){
        flex-direction: column;
    }
`;
const Desc = styled.p`
    font-size: 1.4rem;
    line-height: 1.6;
    width: 100%;
    color: ${theme.darkGray};
    opacity: 0.8;
    margin: 0 5px;
    @media screen and (max-width: 1100px){
      text-align:center;
      margin: 20px 0;
    }
    @media screen and (max-width: 700px){
        width: 100%;
        font-size: 1rem;
        
    }
`;
const RightBox = styled.div`
    box-sizing: border-box;
    width: 500px;
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: linear-gradient(170deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.05) 100%);
    border-radius: 20%;
    border: 2px solid rgba(255, 255, 255, 0.05);
    margin: auto;
    @media screen and (max-width: 500px){
        margin-top: 10px;
        width: 360px;
        height: 300px;
    }
`;
const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 30px; 
  overflow: hidden; 
`;
const Image = styled.img`
  width: 100%;  
  height: 100%;
  object-fit: contain;
  overflow: hidden;
  border-radius: 30px;
`;
const ImageButton = styled.button`
  text-decoration: none;
  background-color: transparent;
  border: 0;
`;
type Data = {
    "header": string;
    "subHeader": string;
    "list": string[];
    "content": SubDataType;
}
type SubDataType = {
    [key: string]: {
        "header": string;
        "imagePath": string;
        "description": string;
    }
}
function Partners() {
    const [slideIndex, setSlideIndex] = useState<number>(0);
    const [isText, setIsText] = useState<boolean>(false);
    const data: Data = i18next.t('partners', { returnObjects: true });

    const imagePaths = Object.values(data.content).map(item => item.imagePath);
    const desc: string[] = Object.values(data.content).map(item => item.description);
    const handleButtonClick = () => {
        setIsText(!isText); // 버튼 클릭 시 isText 상태를 반전
    };
    const handleOutline = (index: number) => {
        setSlideIndex(index);
        setIsText(false);
    }
    return (
        <Container>
            <ContentBox>
                <HeaderBox>
                    <FirstHeader>
                        {data.header}
                        <SecondHeader><br />{data.subHeader}</SecondHeader>
                    </FirstHeader>
                </HeaderBox>
                <HorizonContainer>
                    <SlickBar>
                        <LongBar>
                            {data.list.map((item, index) => (
                                <Outline key={index} op={index} slideIndex={slideIndex} onClick={() => { handleOutline(index) }}>
                                    <OutlineText>{item}</OutlineText>
                                </Outline>
                            ))}
                        </LongBar>
                    </SlickBar>

                    <DescBox>
                        <RightBox>
                            <ImageButton onClick={handleButtonClick}>
                                {!isText ? <ImageWrapper><Image src={imagePaths[slideIndex]} /></ImageWrapper>
                                    : <Desc>{desc[slideIndex]}</Desc>}
                            </ImageButton>
                        </RightBox>
                    </DescBox>
                </HorizonContainer>
            </ContentBox>
        </Container >
    )
}
export default Partners;