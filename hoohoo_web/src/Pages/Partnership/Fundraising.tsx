import React from 'react';
import styled from 'styled-components';

import i18next from 'i18next';
import { theme } from '../../style';
const Container = styled.section`
    width: calc(100% - 30px);
    display: flex;
    margin: 30px auto;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease 0s;
    padding: 0 15px;
`;
const LL1 = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  background-color: #050A30;
  border-radius: 20px;
  text-align: center;
`;
const LL1Image = styled.img`
  position: absolute;
  width: 60px;
  height: 60px;
  left: 50%;
  transform: translateX(-50%);
  top: -30px;
`;
const LL1Text = styled.span`
    color: ${theme.white};
    width: 100%;
  font-size: 2rem;
  line-height: 1.1;
  font-weight: 500;
  padding-top: 40px;
`;
const Text = styled.span`
    color: ${theme.white};
    padding-left: 10px;
  font-size: 1.3rem;
  line-height: 1.1;
  font-weight: 500;
`;
const Text1M = styled.span`
  color: #93ff3f;
  font-size: 2rem;
  line-height: 1.1;
  font-weight: 500;
`;
const LL2 = styled.div`
    display: flex;
    width: 100%;
    border-radius: 20px;
  text-align: center;
  justify-content: center;
  align-items: center;
    background-color: #293E72;
`;

const LL3 = styled.div`
    display: flex;
    height: 250px;
    width: 100%;
  position: relative;
  background-color: #050A30;
  border-radius: 20px;
  text-align: center;
  justify-content: center;
  align-items: center;

`;
const LL3Text = styled.h2`
  text-align: center;
  width: 100%;
  color: ${theme.white};
  font-size: 2rem;
  line-height: 1.1;
  font-weight: 500;
`;
const TextBox = styled.div`
    display: flex;
    width: 100%;
    border-radius: 20px;
    background-color: ${theme.white};
  text-align: center;
  justify-content: center;
  align-items: center;
  /* border: 3px solid rgba(0,0,0, 0.2); */
`;
const BlackText = styled.span`
  color: ${theme.darkGray};
  width: 100%;
  font-size: 1.2rem;
  line-height: 1.3;
  font-weight: 400;
  padding: 0 10px;
`;

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px;
  @media (max-width: 600px) {
    width: 65%;
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const LeftMostColumn = styled.div`
  grid-column: 1 / 2;
  display: grid;
  grid-template-rows: 1fr 1fr 2fr;
  gap: 16px;
  width: 100%;
  @media (max-width: 600px) {
    gap: 8px;
  }
`;

const BigBot = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr;
  gap: 16px;
  width: 100%;
`;
const BigTop = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr;
  gap: 16px;
`;

const ImageBox = styled.div`
  border-radius: 20px;
  width:100%;
`;
const Image = styled.img`
  object-fit: contain;
  width:100%;
`;
function Fundraising() {
  const data: any = i18next.t('fundraising', { returnObjects: true });

  return (
    <Container>
      <GridContainer>
        <LeftMostColumn>
          <LL1><LL1Image src={data["ll1"]["image"]} />
            <LL1Text>{data["ll1"]["text"]}</LL1Text></LL1>
          <LL2><Text1M>{data["ll2"].part1}</Text1M><Text>{data["ll2"].part2}</Text></LL2>
          <LL3><LL3Text>{data["ll3"]}</LL3Text></LL3>
        </LeftMostColumn>
        <BigBot>
          <TextBox>
            <BlackText>
              {data["l1"]}
            </BlackText>
          </TextBox>
          <ImageBox><Image src={data["l2"]} /></ImageBox>
        </BigBot>
        <BigTop>
          <ImageBox><Image src={data["r1"]} /></ImageBox>
          <TextBox><BlackText>
            {data["r2"]}
          </BlackText></TextBox>
        </BigTop>
        <BigBot>
          <TextBox><BlackText>
            {data["rr1"]}
          </BlackText></TextBox>
          <ImageBox><Image src={data["rr2"]} /></ImageBox>
        </BigBot>
      </GridContainer>
    </Container >
  )
}
export default Fundraising;