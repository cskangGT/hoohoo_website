import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../style';
import i18next from 'i18next';
import Wrapper from '../../../Component/Wrapper/Wrapper';
export const Bg = styled.section<{bgcolor?: string}>`
  width: calc(100%);
  height: auto;
  background-color: ${props => props.bgcolor? props.bgcolor:'#EFE7DF'};
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1000px){
        height: auto;
    }
`; 
const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 0 15px;
    @media screen and (max-width: 1000px){
        margin-top: 82px;
    }
`;
const HeaderBox = styled.div`
  width: 100%;
  display:flex;
  justify-content: center;
  padding: 40px 0;
`;
const HeaderText = styled.h1`
  font-size: 3.2rem;
  font-family: 'Fredoka';
  font-weight: bold;
  text-align: center;
    color: ${theme.darkGray};
    @media screen and (max-width: 700px) {
        font-size: 2.4rem;
    }
`;


const Image = styled.img`
  width:70%;
  margin-top: 30px;
  @media screen and (max-width: 700px) {
        width: 95%;
    }
`;
function Bag() {
    
    const data : any= i18next.t('bag', { returnObjects: true });
    return (
        <Bg>
            <Wrapper>
            <Container >
                <HeaderBox>
                    <HeaderText dangerouslySetInnerHTML={{__html:data.header }}/>
                    </HeaderBox>
                
                        <Image src={data.image} />
                
        </Container >
            </Wrapper>
        </Bg>
    )
}
export default Bag;