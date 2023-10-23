import React, { useEffect } from 'react';
import styled from 'styled-components';

import i18next from 'i18next';
import { theme } from '../../style';
const Container = styled.section`
    width: calc(100% - 30px);
    display: flex;
    margin: 30px auto;
    justify-content: flex-start;
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
    width: 100%;
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
// const LL2Text = styled.h2`
//   text-align: center;
//   width: 100%;
// `;
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
// const LL3Text = styled.h2`
//   text-align: center;
//   width: 100%;
// `;
const TextBox = styled.div`
    display: flex;
    width: 100%;
    border-radius: 20px;
  text-align: center;
  justify-content: center;
  align-items: center;
    background-color: #EBEBEB;
`;
const BlackText = styled.span`
  color: ${theme.darkGray};
  width: 100%;
  font-size: 0.9rem;
  line-height: 1.1;
  font-weight: 400;
  padding: 0 10px;
`;
// const L2 = styled.div`

// `;
// const R1 = styled.div`

// `;
// const R2 = styled.div`

// `;
// const RR1 = styled.div`

// `;
// const RR2 = styled.div`

// `;
const GridContainer = styled.div`
width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const LeftMostColumn = styled.div`
  grid-column: 1 / 2;
  display: grid;
  grid-template-rows: 1fr 1fr 2fr;
  gap: 16px;
`;

const BigBot = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr;
  gap: 16px;
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

    const data: any = {
        "ll1":
        {
            "image": "Images/og_earthmera_logo.png",
            "text": "EarthMera's Vision"
        },
        "ll2": {
            "part1": "B2B",
            "part2": "B2C"
        },
        "ll3": "Fundraising for EarthMera:",
        "l1": "We manufacture bio-based plastic bags. These bags not only boost AI detection accuracy but also have the potential to become a global standard for eco-friendly bags.",
        "l2": "Images/l2_bag.png",
        "r1": "Images/r1.png",
        "r2": "Taking EarthMera's AI model to the next level, we've developed a real-time computer vision object detection system that can precisely monitor the amount of waste inside the bag.",
        "rr1": "Venues where people gather in large numbers, such as theaters, sports arenas, or cinemas, have the potential to become our partners.",
        "rr2": "Images/rr2.png"
    }
    // = i18next.t('fundraising', { returnObjects: true });

    return (
        <Container>
            <GridContainer>
                <LeftMostColumn>
                    <LL1><LL1Image src={data["ll1"]["image"]} />
                        <LL1Text>{data["ll1"]["text"]}</LL1Text></LL1>
                    <LL2><Text>{data["ll2"].part1} → {data["ll2"].part2}</Text></LL2>
                    <LL3><Text>{data["ll3"]}</Text></LL3>
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
            {/* <ContentBox>
                <LeftBox>

                    <LL>
                        <LL1>
                            <LL1Image src={data["ll1"]["image"]} />
                            <LL1Text>{data["ll1"]["text"]}</LL1Text>
                        </LL1>
                        <LL2>
                            <LL2Text>
                                {data["ll2"]}
                            </LL2Text>
                        </LL2>
                        <LL3></LL3>
                    </LL>
                    <LR>

                    </LR>
                </LeftBox>
                <RightBox>

                </RightBox>
            </ContentBox> */}
        </Container >
    )
}
export default Fundraising;