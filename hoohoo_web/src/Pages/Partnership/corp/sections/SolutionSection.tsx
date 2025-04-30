import i18next from 'i18next';
import React from 'react';
import styled from 'styled-components';
import {
  Container,
  Desc,
  HorizonContainer,
  LeftBox,
  RightBox,
} from '../../../../components/ContentBox/TwoColBoxesSection';
import {theme} from '../../../../style';
const Header = styled.h1`
  font-size: 3rem;
  color: ${theme.darkGray};
  text-align: left;
  font-weight: 600;
  margin: 0px;
  line-height: 1.1;
  white-space: pre-line;
  width: 100%;
  @media screen and (max-width: 1000px) {
    text-align: center;
  }
  @media screen and (max-width: 600px) {
    font-size: 2rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.5rem;
  }
`;
const LeftView = styled(LeftBox)`
  row-gap: 1rem;
`;
const Content = styled(Desc)`
  width: 70%;
  align-self: flex-start;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
  @media screen and (max-width: 500px) {
    font-size: 1rem;
  }
`;
const TagLine = styled.p`
  font-size: 1.2rem;
  color: ${theme.darkGray};
  text-align: left;
  font-weight: 400;
  margin: 0px;
  line-height: 1.1;
  white-space: pre-line;
  width: 100%;
  @media screen and (max-width: 1000px) {
    text-align: center;
  }
  @media screen and (max-width: 500px) {
    font-size: 1rem;
  }
`;
const RightView = styled(RightBox)`
  width: 75%;
`;
const SolutionImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
function SolutionSection() {
  const localizedText: any = i18next.t('EMCorpSolution', {returnObjects: true});
  return (
    <Container>
      <HorizonContainer style={{position: 'relative'}}>
        <LeftView>
          <TagLine>{localizedText.tag}</TagLine>
          <Header>{localizedText.title}</Header>

          <Content language={i18next.language}>
            {localizedText.description}
          </Content>
        </LeftView>
        <RightBox>
          <SolutionImage src={'/Images/em_corp_2p.png'} />
        </RightBox>
      </HorizonContainer>
    </Container>
  );
}

export default SolutionSection;
