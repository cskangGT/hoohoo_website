import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../style';
import LinedHeader from '../../../Component/ContentBox/LinedHeader';
import i18next from 'i18next';
import Wrapper from '../../../Component/Wrapper/Wrapper';
const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: calc(100%);
    padding: 40px 0;
    min-height: 600px;
    height: auto;
`;
const ImageBox = styled.div`
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    width: 100%;
    
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr 1fr;
    display: grid;
    @media screen and (max-width: 700px) {
        height: auto;
        grid-template-columns: auto;
        width: 80%;
        grid-column-gap: 20px;
    grid-template-rows: 1fr 1fr 1fr;
    }
    @media screen and (max-width: 500px) {
        width: 70%;
        padding: 0 20px;
    }
`;

const EachBox = styled.div`
    padding: 0 35px;
    height: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
justify-content: center;
    background: linear-gradient(170deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.05) 100%);
    border-color: ${theme.white};
    border-width: 2px;
    border-radius: 20px;
    @media screen and (max-width: 500px) {
        height: 450px;
        width: 300px;
    }
`;
const ActName = styled.h3`
text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1;
    margin-top:30px;
`;
const ActDesc = styled.span`
  text-align: center;
  text-transform: uppercase;
`;
const Image = styled.img`
    width: 100%;
    height: auto;
    object-fit: contain;
`;
type DataProps = {
    image: string;
    title: string;
    content: string;
}
function Difference() {
    const data : any= i18next.t('diff', { returnObjects: true });
    return (
        <Wrapper>
            <ContentBox>
                <LinedHeader data={{header:data.header}} color={theme.darkGray} style={{fontSize: '3rem', width: '100%'}}/>
                <ImageBox>
                    {data.items.map((item : DataProps, index : number) => (
                        <EachBox key={index}>
                            <Image src={item.image} key={index + "img"} />
                            <ActName>{item.title}</ActName>
                            <ActDesc>{item.content}</ActDesc>
                        </EachBox>
                    ))}
                </ImageBox>
            </ContentBox>
            </Wrapper>
    )
}
export default Difference;