import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../style';
import i18next from 'i18next';
import Wrapper from '../../../Component/Wrapper/Wrapper';
const Bg = styled.div`
  width: calc(100%);
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1000px){
        height: auto;
    }
`; 
const Container = styled.div`
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 82px;
`;
const Image = styled.img`
  width: 100%;
`;
function R3() {
    
    const data : any =  {
        image: "Images/esg1pimage.png"
    }
    return (
        <Bg>
            <Wrapper>
                <Container>
<Image src={data.image} />
                </Container>
            
            </Wrapper>
        </Bg>
    )
}
export default R3;