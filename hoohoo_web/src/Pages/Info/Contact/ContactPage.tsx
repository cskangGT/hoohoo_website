import React, {useEffect} from 'react';
import styled from 'styled-components';
import {BgImage} from '../../../style';
import ContactIntro from './ContactIntro';
import Green from './Green';
import IdealCustomer from './IdealCustomer';
import Retention from './Retention';
const ContentBox = styled.section`
  padding-top: 20px;
  justify-content: center;
  width: 100%;
  display: flex;
`;
export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <BgImage>
      <ContactIntro />
      <ContentBox>
        <IdealCustomer />
      </ContentBox>
      <ContentBox>
        <Retention />
      </ContentBox>
      <ContentBox>
        <Green />
      </ContentBox>
    </BgImage>
  );
}
