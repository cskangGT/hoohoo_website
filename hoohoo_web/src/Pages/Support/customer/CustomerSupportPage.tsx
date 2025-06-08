import React, {useEffect} from 'react';
import styled from 'styled-components';
import {BgImage} from '../../../style';
import {SupportWrapper} from '../business/BusinessSupportPage';
import {CustomerSupportInquiryForm} from './CustomerSupportInquiryForm';
const Container = styled.div`
  width: 100%;

  margin: 100px 0px;
`;
function CustomerSupportPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <BgImage>
      <SupportWrapper>
        <Container>
          <CustomerSupportInquiryForm />
        </Container>
      </SupportWrapper>
    </BgImage>
  );
}

export default CustomerSupportPage;
