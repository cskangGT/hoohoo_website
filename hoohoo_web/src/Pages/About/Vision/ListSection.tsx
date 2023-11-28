import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../style';

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
type BoxProps = {
    isBot: boolean;
}
const EachBox = styled.div<BoxProps>`
    padding: 0 35px;
    height: 550px;
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
`;
const Image = styled.img`
    width: 100%;
    height: auto;
    object-fit: contain;
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