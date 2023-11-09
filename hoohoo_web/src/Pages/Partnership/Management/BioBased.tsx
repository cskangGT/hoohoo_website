import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../style';
import i18next from 'i18next';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import LinedHeader from '../../../Component/ContentBox/LinedHeader';
import { Desc } from '../../../Component/ContentBox/TwoColBoxesSection';
const Bg = styled.div<{image: string}>`
  width: calc(100%);
  height: 700px;
  display: flex;
  background-image: url(${props=> props.image});
  background-size: cover; // 배경 이미지가 컨테이너를 가능한 많이 채우도록 설정
  background-position: center;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1000px){
        height: 700px;
    }
`; 
const Container = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;

  align-items: right;
  color: ${theme.white};
  padding-right: 15px;
`;

function BioBased() {
    
    const data : any =  i18next.t('bio-based', { returnObjects: true });
    return (
        <Bg image={data.image}>
            <Wrapper>
                <Container>
                <LinedHeader 
                            style={{textAlign: 'right'}}
                            data={{header:data.header}}  />
                            <Desc style={{textAlign: 'right', color:theme.white}} dangerouslySetInnerHTML={{__html: data.content}} />
                </Container>
            
            </Wrapper>
        </Bg>
    )
}
export default BioBased;