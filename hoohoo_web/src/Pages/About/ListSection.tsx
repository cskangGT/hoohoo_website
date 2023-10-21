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
const SecondImageBox = styled.div`
    width: 100%;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-columns: 1fr;
    align-items: stretch;
    justify-items: stretch;
    display: grid;
    margin-top: 50px;
    margin-bottom: 100px;
    justify-content: center;
    @media screen and (max-width: 1100px) {
        height: auto;
        grid-template-columns: auto;
        grid-column-gap: 30px;
        grid-template-rows: 1fr 1fr 1fr;
    }
`;
const FirstImageBox = styled.div`
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    width: 100%;
    grid-row-gap: 1rem;
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr 1fr;
    display: grid;
    height: 840px;
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
    width: 340px;
    height: ${props => props.isBot ? 600 : 800}px;
    position: relative;
    background: linear-gradient(170deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.05) 100%);
    border-color: ${theme.white};
    border-width: 2px;
    border-radius: 20px;
    @media screen and (max-width: 500px) {
        height: ${props => props.isBot ? 300 : 450}px;
        width: 300px;
    }
`;
const Image = styled.img`
    position: absolute;
    margin-left: 5px;
    bottom: 70px; 
    width: 100%;
    height: auto;
    object-fit: contain;
    @media screen and (max-width: 500px) {
        bottom: 30px; 
        width: 70%;
        left: 50%;
        transform: translateX( -50%);
    }
`;

type DataProps = {
    imagePath: string;
}
type TotalProps = {
    data: DataProps[];
    header: string;
    isBot: boolean;
    id?: string;
}
function ListSection({ data, header, isBot, id }: TotalProps) {
    var isHeader = header === '' ? false : true;
    console.log('id', id)
    return (
        <Container bg={isBot} id={id}>
            <ContentBox>
                {isHeader && <HeaderBox>
                    <Header>{header}</Header>
                </HeaderBox>}
                {
                    isBot ? <SecondImageBox>
                        {data.map((item, index) => (<EachBox key={index} isBot={isBot}>
                            <Image src={item.imagePath} key={index + "img"} /></EachBox>
                        ))}
                    </SecondImageBox> : <FirstImageBox>
                        {data.map((item, index) => (<EachBox key={index} isBot={isBot}>
                            <Image src={item.imagePath} key={index + "img"} /></EachBox>
                        ))}
                    </FirstImageBox>
                }
            </ContentBox>

        </Container>
    )
}
export default ListSection;