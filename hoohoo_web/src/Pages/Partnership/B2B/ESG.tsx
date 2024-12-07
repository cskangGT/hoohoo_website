import i18next from 'i18next';
import React from 'react';
import styled from 'styled-components';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import {theme} from '../../../style';
export const Bg = styled.section`
  width: calc(100%);
  height: 750px;
  background-color: #efe7df;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1000px) {
    height: auto;
  }
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.2s ease 0s;
  padding: 3rem 15px;
  @media screen and (max-width: 1000px) {
    margin-top: 82px;
  }
`;
const HeaderBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 60px;
`;
const HeaderText = styled.h1`
  font-size: 3.5rem;
  font-family: 'Fredoka';
  font-weight: bold;
  text-align: center;
  color: ${theme.darkGray};
  @media screen and (max-width: 700px) {
    font-size: 2.4rem;
  }
`;

const HorizonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;
const LeftBox = styled.div`
  align-items: center;
  justify-content: start;
  display: flex;
  width: 60%;
  flex-direction: column;
  color: ${theme.darkGray};
  text-align: center;
  padding: 0 40px;
  line-height: 1.2;
  @media screen and (max-width: 1000px) {
    padding: 0 10px;
    width: 90%;
    text-align: center;
  }
  @media screen and (max-width: 500px) {
    padding: 30px 10px;
    width: 90%;
    text-align: center;
  }
`;
const Desc = styled.p`
  font-size: 1.5rem;
  line-height: 1.3;
  width: 100%;
  opacity: 0.8;
  text-align: left;
  margin: 20px 0;
  @media screen and (max-width: 1000px) {
    text-align: center;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.4rem;
  }
`;
const RightBox = styled.div`
  width: calc(20%);
  display: flex;
  margin: 0;
  @media screen and (max-width: 1000px) {
    width: 50%;
  }
  @media screen and (max-width: 500px) {
    width: 50%;
  }
`;

const Image = styled.img`
  width: 100%;
`;
function PartnershipIntro() {
  const data: any = i18next.t('esg', {returnObjects: true});
  return (
    <Bg>
      <Wrapper>
        <Container>
          <HeaderBox>
            <HeaderText>{data.header}</HeaderText>
          </HeaderBox>
          <HorizonContainer>
            <RightBox>
              <Image src={data.image} />
            </RightBox>
            <LeftBox>
              <Desc>{data.content}</Desc>
            </LeftBox>
          </HorizonContainer>
        </Container>
      </Wrapper>
    </Bg>
  );
}
export default PartnershipIntro;
