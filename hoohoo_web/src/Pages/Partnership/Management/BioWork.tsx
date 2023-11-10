import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../style';
import i18next from 'i18next';
import LinedHeader from '../../../Component/ContentBox/LinedHeader';
import { Desc,LeftBox, RightBox, Image } from '../../../Component/ContentBox/TwoColBoxesSection';

const Container = styled.div`
  width:100%;
  display: flex;
  justify-content: center;
  color: ${theme.white};
  margin-top: 50px;
  @media screen and (max-width: 500px){
        flex-direction: column-reverse;
        align-items: center;
    }
`;

export default function BioWork() {
    const data : any =  i18next.t('biowork', { returnObjects: true });
    return (
                <Container>
                    <RightBox style={{marginTop: 40}}>
                        <LinedHeader 
                            data={{header:data.header}}  />
                        <Desc dangerouslySetInnerHTML={{__html: data.content}} />
                    </RightBox>
                    <LeftBox>
                        <Image src={data.image} />
                    </LeftBox>
                    
                </Container>
    )
}