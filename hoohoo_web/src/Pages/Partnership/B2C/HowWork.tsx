import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../style';
import LinedHeader from '../../../Component/ContentBox/LinedHeader';
import i18next from 'i18next';
import Wrapper from '../../../Component/Wrapper/Wrapper';
const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100%);
    padding-top: 60px;
`;
const ImageBox = styled.div`
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    width: 100%;
    position: relative;
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    display: grid;
    @media screen and (max-width: 1000px) {
        height: auto;
        grid-template-columns: auto;
        width: 70%;
        grid-column-gap: 20px;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    }
    @media screen and (max-width: 500px) {
        width: 80%;
        padding: 0 20px;
    }
`;

const EachBox = styled.div`
    padding: 0 35px;
    height: 550px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: linear-gradient(170deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.05) 100%);
    border-color: ${theme.white};
    border-width: 2px;
    border-radius: 20px;
    z-index: 10;
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
`;
const TapeBgImage = styled.img`
  height: 150px;
  z-index: 1;
  position: absolute;
  left: -70px;
  right: 20px;
  top:80px;
  @media screen and (max-width: 1000px) {
    display: none;
    }
`;
const Image = styled.img`
    /* width: 100%; */
    height: 315px;
    object-fit: contain;
`;
type DataProps = {
    imagePath: string;
    head: string;
    desc: string;
}
function HowWork() {
    const data : any= i18next.t('howwork', { returnObjects: true });
    return (
        <Wrapper>
            <ContentBox>
                <LinedHeader data={data.title} color={theme.darkGray} />
                <ImageBox>
                    <TapeBgImage src={data.bgImage}></TapeBgImage>
                    {data.steps.map((item : DataProps, index : number) => (
                        <EachBox key={index}>
                            <Image src={item.imagePath} key={index + "img"} />
                            <ActName>{item.head}</ActName>
                            <ActDesc>{item.desc}</ActDesc>
                        </EachBox>
                    ))}
                </ImageBox>
            </ContentBox>
        </Wrapper>
    )
}
export default HowWork;