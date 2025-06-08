import React, {useEffect} from 'react';
import styled from 'styled-components';

import {BgImage} from '../../../style';
import {BusinessInquiryForm} from './BusinessInquiryForm';
const Container = styled.div`
  width: 100%;

  margin: 100px auto;
`;
export const SupportWrapper = styled.div`
  width: calc(100%);
  max-width: 600px;
  margin: 0 auto;

  @media screen and (max-width: 1200px) {
    max-width: 600px;
  }

  @media screen and (max-width: 1000px) {
    max-width: 600px;
  }

  @media screen and (max-width: 850px) {
    max-width: 600px;
  }

  @media screen and (max-width: 700px) {
    max-width: 550px;
  }

  @media screen and (max-width: 550px) {
    max-width: 400px;
  }
  @media screen and (max-width: 400px) {
    max-width: 380px;
  }
  @media screen and (max-width: 380px) {
    max-width: 100%;
  }
`;
function BusinessSupportPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <BgImage>
      <SupportWrapper>
        <Container>
          <BusinessInquiryForm />
        </Container>
      </SupportWrapper>
    </BgImage>
  );
}

export default BusinessSupportPage;
