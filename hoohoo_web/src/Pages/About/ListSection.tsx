import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style';

type Props = {
    bg: boolean;
}
const Container = styled.section<Props>`
    width: 100%;
    display: flex;
    padding: 5rem 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    transition: opacity 0.5s;
`;
const ContentBox = styled.div`
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
`;
const HeaderBox = styled.div`
    margin-top: 15px;
    align-items: center;
    width: 80%;
    max-width: 1200px;
`;
const Header = styled.h1`
    font-size: 3rem;
    font-weight: bold;
    text-align:center;
    color: ${theme.darkGray};
    line-height: 1;
    @media screen and (max-width: 1100px) {
        font-size: 2.3rem;
    }
    @media screen and (max-width: 500px) {
        font-size: 2rem;
    }
`;

const ImageBox = styled.div`
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    width: 100%;
    
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr 1fr;
    display: grid;
    @media screen and (max-width: 1100px) {
        height: auto;
        grid-template-columns: auto;
        grid-column-gap: 20px;
    grid-template-rows: 1fr 1fr 1fr;
    }
    @media screen and (max-width: 500px) {
        width: 70%;
        padding: 0 20px;
    }
`;
type BoxProps = {
    isBot: boolean;
}
const EachBox = styled.div<BoxProps>`
    padding: 0 35px;
    height: 550px;
    display: flex;
    flex-direction: column;
    align-items: center;

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
`;
const ActDesc = styled.span`
  text-align: center;
`;
const Image = styled.img`
    width: 100%;
    height: auto;
    object-fit: contain;
    
    @media screen and (max-width: 500px) {
        width: 80%;
    }
`;

type DataProps = {
    imagePath: string;
    head: string;
    desc: string;
}
type TotalProps = {
    data: DataProps[];
    isBot: boolean;
    id?: string;
}
function ListSection({ data, isBot, id }: TotalProps) {

    return (
        <Container bg={isBot} id={id}>
            <ContentBox>
                <ImageBox>
                    {data.map((item, index) => (
                        <EachBox key={index} isBot={isBot}>
                            <Image src={item.imagePath} key={index + "img"} />
                            <ActName>{item.head}</ActName>
                            <ActDesc>{item.desc}</ActDesc>
                        </EachBox>
                    ))}
                </ImageBox>
            </ContentBox>
        </Container>
    )
}
export default ListSection;