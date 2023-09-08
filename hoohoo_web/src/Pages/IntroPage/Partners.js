import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../style';

const Container = styled.div`
    width: 100%;
    max-width: 1070px;
    display: flex;
    margin: 0px auto;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    transition: all 0.2s ease 0s;
    padding: 0px 15px;
`;
const ContentBox = styled.div`

    max-width: 1140px;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    justify-content: center;
`;
const HeaderBox = styled.div`
  color: ${theme.white};
  text-align: center;
  margin-bottom: 60px;
  line-height: 1.2;
`;

const FirstHeader = styled.span`
  font-size: 18px;
`;
const SecondHeader = styled.h2`
    font-size: 36px;
    line-height: 0.8;
`;
const SlickBar = styled.div`
  overflow: visible;
  margin: 0;
  padding: 0;
`;
const LongBar = styled.div`
  margin-bottom: 20px;
  display: flex;
  @media screen and (max-width: 1100px){
    justify-content: center;
    margin-bottom: 0;
}
`;
const Outline = styled.button`
    opacity: ${props => props.op === props.slideIndex ? 1 : 0.3};
    background : none;
    border: none;
    margin-right: 10px;
  outline: none;
  display: block;
  float: left;
  height: 100%;
  min-height: 1px;

`;
const OutlineText = styled.h3`
    color: ${theme.white};
`;
const DescBox = styled.div`
  margin : 20px 5px;
  display: flex;
  @media screen and (max-width: 950px){
    flex-direction: column;  
    margin: 0 5px;     
}
`;
const LeftBox = styled.div`
    align-items: center;
    justify-content: start;
    display: flex;
    height: 353px;
    flex-direction row;
    @media screen and (max-width: 1100px){
        justify-content: center;
    }
`;
const Desc = styled.p`
    font-size: 24px;
    line-height: 1.6;
    width: 500px;
    color: ${theme.white};
    opacity: 0.8;
    @media screen and (max-width: 1100px){
    text-align:center;
    }
`;
const RightBox = styled.div`
    box-sizing: border-box;
    width: 352px;
    height: 352px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: linear-gradient(170deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.05) 100%);
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.05);
    margin:  auto;
    margin-bottom: 50px;
    // @media screen and (min-width: 1140px){
    //     width: 382px;
    //     height: 382px;
    //     position: absolute;
    //     right: 0px;
        // top: 50%;
    //     transform: translateY(-50%);
    // }
`;
const FText = styled.span`
    margin-bottom: 8px;
    font-size: 86px;
    font-weight: 900;
    font-family: Inter, sans-serif;
    color: ${theme.white};
    letter-spacing: 1px;
    line-height: 1.2;
    text-transform: uppercase;
    text-align: center;
}
`;
const SText = styled.span`
font-weight: 500;
font-family: Inter, sans-serif;
color: rgb(255, 255, 255);
font-size: 18px;
line-height: 1.2;
text-align: center;
@media screen and (min-width: 1140px){
    font-size: 24px;
}
`;
function Partners() {

    const [slideIndex, setSlideIndex] = useState(0);
    const list = ["Partners", "NHS", "Government"];

    const desc = ["The value of a sweatcoin is derived from our wide-reaching partnerships. From brands that want to connect with health conscious audiences, insurers wishing to encourage healthier lifestyle choices and governments looking to reduce healthcare costs.",
        "Sweatcoin work with the NHS to deliver Healthy Incentive programmes across the country, using personalised data-driven approaches to deliver sustained behaviour change.",
        "Sweatcoin helps users become +20% more active each day, even after 6 months — this has the potential to transform public health, by using Sweatcoin as a prevention tool for sustained behaviour change."]
    return (
        <Container>
            <ContentBox>
                <HeaderBox>
                    <FirstHeader>
                        How do EarthMera
                        <SecondHeader><br />get their value?</SecondHeader>
                    </FirstHeader>
                </HeaderBox>
                <SlickBar>
                    <LongBar>
                        {list.map((item, index) => (
                            <Outline op={index} slideIndex={slideIndex} onClick={() => { setSlideIndex(index) }}>
                                <OutlineText>{item}</OutlineText>
                            </Outline>
                        ))}
                    </LongBar>
                </SlickBar>
                <DescBox>
                    <LeftBox>
                        <Desc>{desc[slideIndex]}</Desc>
                    </LeftBox>
                    <RightBox>
                        {
                            slideIndex === 0 ? <React.Fragment>
                                <FText>600+</FText><SText>partners</SText>
                            </React.Fragment> : slideIndex === 1 ? <SText>SecondImage</SText> : <SText>ThirdImage</SText>
                        }
                    </RightBox>
                </DescBox>


            </ContentBox>
        </Container >
    )
}
export default Partners;