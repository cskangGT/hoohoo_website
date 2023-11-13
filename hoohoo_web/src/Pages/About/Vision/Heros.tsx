import React, { useState } from 'react';
import styled from 'styled-components';
import { slideInFromTop, theme } from '../../../style';
import i18next from 'i18next';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import { LeftBox, RightBox, Image } from '../../../Component/ContentBox/TwoColBoxesSection'
import { Desc } from '../../../Component/ContentBox/TwoColBoxesSection';

const Container = styled.div`
  width:100%;
  animation: ${slideInFromTop} 0.7s ease-out forwards;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  margin-top: 100px;

  @media screen and (max-width: 1000px){
        flex-direction: column;
        height: auto;
        margin: 100px 0;
    }
`;
const LeftCell = styled(LeftBox)`
    width: 40%;
    @media screen and (max-width: 1000px){
        width: 80%;
    }
`;
const RightCell = styled(RightBox)`
    width: 60%;
    @media screen and (max-width: 1000px){
        width: 80%;
    }
`;
const Header = styled.h2`
padding: 30px 0;
  font-size: 2.5rem;
  line-height: 1;
  width: 100%;
  font-family:'Fredoka';
  color: ${theme.darkGray};
  text-align: left;
    @media screen and (max-width: 1000px){
        text-align:center;
    }
`;
const ContentText = styled(Desc)`
  color: ${theme.darkGray};
`;
export default function Heros() {
    
    const data : any =  i18next.t('heros', { returnObjects: true });
    return (
        <Container>
            <LeftCell><Image src={data.image}/></LeftCell>
            <RightCell>
                <Header 
                    dangerouslySetInnerHTML={{__html: data.header}} />
                <ContentText>{data.content}</ContentText>
            </RightCell>
        </Container>
    )
}