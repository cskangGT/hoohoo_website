import React, { useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import i18next from 'i18next';
const SectionBox = styled.section`
    padding-bottom: 5rem;
    width: calc(100% - 30px);
    display: flex;
    align-items: center;
    padding-top: 5rem;
    margin: 0 15px;
    margin-top: 50px;
    @media screen and (max-width: 700px) {
        margin-top: 40px;
    }
`;
const ContainerBox = styled.div`
  width: 100%;
  display:flex;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
    padding: 10px 15px;
    padding-bottom: 40px;
    overflow: hidden;
    background-color: transparent;
    border-radius: 40px;
`;

const StepBox = styled.div`
  overflow: hidden;
  padding: 10px 0;
  width: 100%;
  display: flex; 
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Image = styled.img`
    width: 70%;
  object-fit: cover;
  object-position: 50% 50%;
  @media screen and (max-width: 700px) {
        font-size: 1rem;
        width: 50%;
    }
`;
const Number = styled.span`
  padding: 10px 0;
  font-size: 3rem;
  line-height: 1.2;
  width: 100%;
  font-weight: 700;
  text-transform: uppercase;
  text-align:center;
  transform: scaleX(0.7);
  letter-spacing: -1px;
  @media screen and (max-width: 700px) {
        font-size: 2rem;
    }
`;
const LongText = styled.span`
  font-size: 0.85rem;
  font-weight: 400;
  width: 100%;
  display: flex;
  text-transform: uppercase;
  text-align:center;
  @media screen and (max-width: 700px) {
        font-size: 1rem;
        width: 70%;
    }
`;
const HeaderBox = styled.div`
  width: 100%;
  align-items: center;
  margin-bottom: 40px;
  @media screen and (max-width: 700px) {
        width: 80%;
    }
`;
const HeaderText = styled.h2`
    text-transform: uppercase;
    font-size: 3rem;
    text-align: center;
    color: ${theme.darkGray};
    @media screen and (max-width: 700px) {
        font-size: 2rem;
    }
`;
const ContentBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  @media screen and (max-width: 700px) {
        flex-direction: column;
        align-items: center;
    }
`;
const Plus = styled.img`
  width: 120px;
  padding: 40px 0; 
  @media screen and (max-width: 700px) {
        width:80px;
    }
`;
const Equal = styled.img`
    width: 140px;
    padding: 40px 0;
    @media screen and (max-width: 700px) {
        width: 100px;
        transform: rotate(90deg);
    }
`;
interface StepProps {
    image: string;
    text: string;
    number: string;
}
interface DataProps {
    data: StepProps;
}
function Step({ data }: DataProps) {
    return (
        <StepBox>
            <Image src={data.image} />
            <Number>
                {data.number}
            </Number>
            <LongText>
                {data.text}
            </LongText>
        </StepBox>
    )
}
function TakeSteps() {
    const data: any = i18next.t('takesteps', { returnObjects: true });
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <SectionBox>
            <ContainerBox>
                <HeaderBox>
                    <HeaderText>
                        {data["header"]}
                    </HeaderText>
                </HeaderBox>
                <ContentBox>
                    <Step data={data["first"]} />
                    <Plus src={data["plus"]} />
                    <Step data={data["second"]} />
                    <Plus src={data["plus"]} />
                    <Step data={data["third"]} />
                    <Equal src={data["equal"]} />
                    <Step data={data["change"]} />
                </ContentBox>
            </ContainerBox>
        </SectionBox >)
}
export default TakeSteps;