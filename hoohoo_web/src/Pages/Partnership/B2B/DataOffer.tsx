import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../style';
import i18next from 'i18next';
import Wrapper from '../../../Component/Wrapper/Wrapper';
const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 700px) {
    margin-bottom: 1.5rem;
    flex-direction:column;
}
`;
const CardContainer = styled.div`
    position: static;
    display: grid;
    height: auto;
    width: 31%;
    min-height: auto;
    grid-template-rows: repeat(3, min-content) 1fr;
    grid-template-columns: 100%;
    color: ${theme.white};
    place-items: center;
    padding-bottom: 20px;
    border-radius: 20px;
    border: 1px solid ${theme.white};
    @media screen and (max-width: 700px) {
        width: 100%;
        margin: 10px 0;
    }
`;
const PhotoBox = styled.div`
    padding: 35px 50px;
    padding-bottom: 50px;
    width: 220px;
    display: flex; 
    justify-content: center;
    @media screen and (max-width: 700px) {
        padding-bottom: 1.2rem;
        padding-top: 1.5rem;
    }
`;
const CompHeader = styled.span`
    padding-bottom: 20px;
    font-family: 'Fredoka';
    font-size: 30px;
    width: 95%;
    text-align:center;
    @media screen and (max-width: 700px) {
        padding-bottom: 1.2rem;
        font-size: 1.3rem;
    }
`;
const CompContent = styled.span`
    font-size: 20px;
    width: 80%;
    text-align:center;
    @media screen and (max-width: 700px) {
        padding-bottom: 1.2rem;
        font-size: 1rem;
    }
`;
const Image = styled.img`
  height: 150px;
  object-fit: contain;
`;
const HeaderText = styled.h1`
  font-size: 3.5rem;
  font-family: 'Fredoka';
  text-align: left;
    color: ${theme.white};
    margin-bottom: 30px;
    @media screen and (max-width: 700px) {
        font-size: 2.4rem;
    }
`;
const Container = styled.div`
    width: 100%;
    display: flex;
    margin: 0px auto;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    transition: all 0.2s ease 0s;
    padding: 3rem 15px;
    background-color: ${theme.blue };
`;
export const HeaderBox = styled.div`
  padding-left: 30px;
  @media screen and (max-width: 700px) {
        padding-left: 0px;
    }
`;
type CompProps = {
    compHeader : string;
    compContent: string;
    compImage: string;
}

function DataOffer() {
    
    const dataoffer : any= i18next.t('offer', { returnObjects: true });
    const compData :CompProps[]= dataoffer.comp
    return (
    <Container>
        <Wrapper>
            <HeaderBox>
                <HeaderText>{dataoffer.header}</HeaderText>
            </HeaderBox>

            <ContentBox>
            {compData.map((item : CompProps)=>(
                <CardContainer>
                    <PhotoBox>
                        <Image src={item.compImage}/>
                    </PhotoBox>
                    <CompHeader>{item.compHeader}</CompHeader>
                    <CompContent>{item.compContent}</CompContent>
                </CardContainer>
            ))}
            </ContentBox>
            </Wrapper></Container>
    )
}
export default DataOffer;