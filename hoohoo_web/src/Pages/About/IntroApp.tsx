import React, { useState } from 'react';
import styled from 'styled-components';
import { slideInFromTop, theme } from '../../style';
import i18next from 'i18next';
import Wrapper from '../../Component/Wrapper/Wrapper';
import { LeftBox, RightBox, Image } from '../../Component/ContentBox/TwoColBoxesSection'
import { Desc } from '../../Component/ContentBox/TwoColBoxesSection';
const Bg = styled.div`
  width: calc(100%);
  display: flex;
  justify-content: center;
  background-color: #323012;
  align-items: center;
`; 
const Container = styled.div`
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  @media screen and (max-width: 700px){
        flex-direction: column;
        margin-bottom: 40px;
    }
`;
const LeftCell = styled(LeftBox)`
  margin-bottom: 60px;
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
const ContentText = styled(Desc)`
  padding-top: 30px;
  color: ${theme.white};
`;
export default function IntroApp() {
    
    const data : any = i18next.t('introApp', { returnObjects: true });
    return (
        <Bg>
            <Wrapper>
                <Container>
                    <LeftCell><Image src={data.image}/></LeftCell>
                    <RightBox>
                        <Header 
                            dangerouslySetInnerHTML={{__html: data.header}} />
                        <Line />
                        <ContentText>{data.content}</ContentText>
                    </RightBox>
                </Container>
            
            </Wrapper>
        </Bg>
    )
}