import i18next from 'i18next';
import React from 'react';
import styled from 'styled-components';
import {
  Desc,
  Image,
  LeftBox,
  RightBox,
} from '../../../components/ContentBox/TwoColBoxesSection';
import Wrapper from '../../../components/Wrapper/Wrapper';
import {theme} from '../../../style';
const Bg = styled.div`
  width: calc(100%);
  display: flex;
  justify-content: center;
  background-color: #f6f4f1;
  align-items: center;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  @media screen and (max-width: 700px) {
    flex-direction: column;
    margin-bottom: 40px;
  }
`;
const LeftCell = styled(LeftBox)`
  margin-bottom: 60px;
`;
const Line = styled.div`
  background-color: ${theme.darkGray};
  width: 30%;
  height: 2px;
  @media screen and (max-width: 700px) {
    align-self: center;
  }
`;
const Header = styled.h2`
  padding: 30px 0;
  font-size: 6rem;
  line-height: 1;
  width: 100%;
  font-family: 'Fredoka';
  color: ${theme.darkGray};
  text-align: left;
  @media screen and (max-width: 1100px) {
    font-size: 4rem;
  }
  @media screen and (max-width: 700px) {
    text-align: center;
    font-size: 3rem;
  }
`;
const ContentText = styled(Desc)`
  padding-top: 30px;
  color: ${theme.darkGray};
`;
export default function IntroApp() {
  const data: any = i18next.t('introApp', {returnObjects: true});
  return (
    <Bg>
      <Wrapper>
        <Container>
          <LeftCell>
            <Image src={data.image} />
          </LeftCell>
          <RightBox>
            <Header>{data.header}</Header>
            <Line />
            <ContentText>{data.content}</ContentText>
          </RightBox>
        </Container>
      </Wrapper>
    </Bg>
  );
}
