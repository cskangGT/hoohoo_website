import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
const Container = styled.section`
    // background: ${props => props.bg ? 'url(\'Images/3rd_background.svg\')' : 'url(\'Images/basic_background.png\')'} no-repeat center;
    // background-size: cover;
    width: 100%;
    display: flex;
    padding: 5rem 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;
const ContentBox = styled.div`
    max-width: 1140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
`;
const HeaderBox = styled.div`
    margin-top: 15px;
    align-items: center;
    width: 70%;
    max-width: 1140px;
`;

const Header = styled.h1`
    font-size: 5rem;
    font-weight: bold;
    text-align:center;
    color: ${theme.white};
    line-height: 1;
`;
const ImageBox = styled.div`
    max-width: 1140px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    width: 100%;
    grid-row-gap: 1rem;
    grid-column-gap: 25px;
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr 1fr;
    // grid-auto-columns: 1fr;
    display: grid;
`;
const EachBox = styled.div`
    width: 375px;
    height: 600px;
    position: relative;
    background: linear-gradient(170deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.05) 100%);
    border-color: ${theme.white};
    border-width: 2px;
    border-radius: 20px;
`;
const Image = styled.img`
    // padding-bottom: 100px;
    position: absolute;
    bottom: 100px; 
    width: 100%;
    height: auto;
`;
const Bottom = styled.img`
    bottom: 0;
    position: absolute;
    width: 100%;
`;
function ListSection({ data, header, isBot }) {
    var isHeader = header === '' ? false : true;
    console.log('index', isBot)
    return (
        <Container bg={isBot}>
            <ContentBox>
                {isHeader && <HeaderBox>
                    <Header>{header}</Header>
                </HeaderBox>}

                <ImageBox>
                    {data.map((item, index) => (<EachBox>
                        <Image src={item.imagePath}></Image></EachBox>
                    ))}

                </ImageBox>
            </ContentBox>

        </Container>
    )
}
export default ListSection;