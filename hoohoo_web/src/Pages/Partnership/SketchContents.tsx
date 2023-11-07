import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import i18next from 'i18next';

const Container = styled.section`
    justify-content: center;
    width: 100%;
    display: flex;
    @media screen and (max-width: 1100px) {
        width: 60%;
    }
    @media screen and (max-width: 1100px) {
        width: 75%;
    }
`;
const Grid = styled.div`
    width: 100%;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr;
    grid-auto-columns: 1fr;
    display: grid;
    margin-top: 6rem;
    margin-bottom: 10rem;
    @media screen and (max-width: 1100px) {
        grid-row-gap: 1rem;
        grid-template-columns: 1fr;
        justify-items: center;
        margin-bottom: 5rem;
    }
`;
const Box = styled.div`
  border-radius: 30px;
  color: ${theme.darkGray};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  background-color: #E1E7ED;
`;
const Image = styled.img`
    max-width: 55%;
    width: 100%;
    position: relative;
    padding: 1.5rem;
`;
const FirstText = styled.h3`
    color: #111425;
    margin-top: 0.2rem;
    margin-bottom: 0.5rem;
    font-size: 1.55rem;
    font-weight: 600;
    line-height: 1.5;
`;
const SecondText = styled.p`
    max-width: 55%;
    margin-bottom: 2rem;
    text-align:center;
    color: #5a5c81;
    margin-top: 0.3rem;
    font-size: 1rem;
    line-height: 1.85;
`;

interface DataItem {
    [key: string]: {
        headerText: string;
        content: string;
    };
}

const SketchContents: React.FC = () => {
    const data: DataItem = i18next.t('sketch', { returnObjects: true });
    const images = Object.keys(data);
    return (
        <Container>
            <Grid>
                {
                    images.map((imagePath, index) => (
                        <Box key={index} >
                            <Image src={imagePath} />
                            <FirstText> {data[imagePath].headerText} </FirstText>
                            <SecondText > {data[imagePath].content} </SecondText>
                        </Box>
                    ))
                }
            </Grid>
        </Container>
    );
}
export default SketchContents;