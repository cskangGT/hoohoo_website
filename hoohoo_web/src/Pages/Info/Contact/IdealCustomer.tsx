import i18next from 'i18next';
import React from 'react';
import styled from 'styled-components';
import {Header} from '../../../Component/ContentBox/TwoColBoxesSection';
import Wrapper from '../../../Component/Wrapper/Wrapper';
export const VerticalSection = styled.section`
  width: 100%;
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SectionHeader = styled(Header)`
  text-align: center;
  line-height: 1.5;
  padding: 15px 0;
  font-size: 3rem;
  font-family: 'Fredoka';
`;
const Image = styled.img`
  width: 40%;
  padding: 15px 0;
  object-fit: contain;
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;
const SubHeader = styled.p`
  width: 70%;
  font-size: 2rem;
  padding: 15px;
  text-align: center;
  font-weight: 700;
  @media screen and (max-width: 700px) {
    width: 90%;
  }
`;
const Content = styled(SubHeader)`
  font-weight: 400;
  font-size: 1.5rem;
  text-align: center;
  padding: 15px;
`;
export default function IdealCustomer() {
  const data: any = i18next.t('idealcustomer', {returnObjects: true});
  return (
    <Wrapper>
      <VerticalSection>
        <SectionHeader dangerouslySetInnerHTML={{__html: data.header}} />
        <Image src={data.img} />
        <SubHeader>{data.subheader}</SubHeader>
        <Content dangerouslySetInnerHTML={{__html: data.content}} />
      </VerticalSection>
    </Wrapper>
  );
}
