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
  flex-direction: column;
  height: 600px;
  @media screen and (max-width: 1000px){
        
    }
`;
const LeftCell = styled(LeftBox)`
    width: 80%;
    @media screen and (max-width: 1000px){
        width: 90%;
    }
`;
const RightCell = styled(RightBox)`
    width: 60%;
    @media screen and (max-width: 1000px){
        width: 80%;
    }
`;
const Title = styled.p<{second?: boolean}>`
  width: 100%;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  margin: ${props => props.second? 0 : 40}px;
  text-align: left;
  justify-self: center;
  align-self: center;
  @media screen and (max-width: 1000px){
        width: 80%;
        text-align: center;
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
const RowBox = styled.div`
  display: flex;
  width: 70%;
  justify-self: flex-start;
  align-self: start;
  margin: 30px 0;
  @media screen and (max-width: 1000px){
        flex-direction: column;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
`;
const Img = styled(Image)`
  width: 70%;
  @media screen and (max-width: 1000px){
        margin-top: 40px;
        width: 90%;
    }
`;
const ContentText = styled(Desc)`
  color: ${theme.darkGray};
  @media screen and (max-width: 1000px){
        font-size: 22px;
    }
`;
export default function FutureModel() {
    
    const data : any =  i18next.t('futureModel', { returnObjects: true });
    return (
        <Container>
            <Header 
                    dangerouslySetInnerHTML={{__html: data.header}} />
                    <Title>{data.sub}</Title>

                <ContentText>{data.subcontent}</ContentText>
            <RowBox>
                <Title second={true}>{data.sub2}</Title>
                <Img src={data.image}/>
            </RowBox>
        </Container>
    )
}