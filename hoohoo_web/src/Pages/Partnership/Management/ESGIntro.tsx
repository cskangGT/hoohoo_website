import React, { useState } from 'react';
import styled from 'styled-components';
import { slideInFromTop, theme } from '../../../style';
import i18next from 'i18next';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import { LeftBox, RightBox, Image } from '../../../Component/ContentBox/TwoColBoxesSection'
const Bg = styled.div`
  width: calc(100%);
  display: flex;
  justify-content: center;
  background-color: #29492B;
  align-items: center;
`; 
const Container = styled.div`
  width:100%;
  animation: ${slideInFromTop} 0.7s ease-out forwards;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  @media screen and (max-width: 700px){
        flex-direction: column;
    }
`;
const Line = styled.div`
  background-color: ${theme.white};
  width: 30%;
  height: 2px;
  @media screen and (max-width: 700px){
        align-self: center;
    }
`;
const Header = styled.h2`
padding: 30px 0;
  font-size: 6rem;
  line-height: 1;
  width: 100%;
  font-family:'Fredoka';
  color: ${theme.white};
  text-align: left;
  @media screen and (max-width: 1100px){
        font-size: 4rem;
    }
    @media screen and (max-width: 700px){
        text-align:center;
        font-size: 3rem;
    }
`;
const LogoGrid = styled.div`
  margin: 30px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  @media screen and (max-width: 700px){
        margin-bottom: 60px;
    }
`;
const LogoImage = styled.img`
  width: 100px;
  @media screen and (max-width:1100px){
        width: 70px;
        
    }
  @media screen and (max-width: 700px){
        width: 60px;
        
    }
  @media screen and (max-width: 500px){
        width: 60px;
        
    }
`;
function ESGIntro() {
    
    const data : any =  {
        image: "Images/esg1pbg.png",
        leftImage: "Images/esg1pleft.png",
        logos: ["Images/esg1plogo1.png", "Images/esg1plogo2.png","Images/esg1plogo3.png","Images/esg1plogo4.png"],
        header: "Introduce EarthMera <br /> Bio-bag"
    }
    return (
        <Bg>
            <Wrapper>
                <Container>
                    <LeftBox style={{marginBottom: 30}}><Image src={data.leftImage}/></LeftBox>
                    <RightBox>
                        <Header 
                            dangerouslySetInnerHTML={{__html: data.header}} />
                        <Line />
                        <LogoGrid>
                        {
                            data.logos.map((item : string, index : number)=> (
                                <LogoImage src={item} key={index} />
                            ))
                        }
                        </LogoGrid>
                    </RightBox>
                </Container>
            
            </Wrapper>
        </Bg>
    )
}
export default ESGIntro;