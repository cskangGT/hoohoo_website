import React from 'react';
import styled from 'styled-components';
import {BgImage} from '../../../style';
import Support from './Support';
const ContentBox = styled.section`
  padding-top: 20px;
  justify-content: center;
  width: 100%;
  display: flex;
`;
function SupportingPage() {
  return (
    <BgImage>
      <ContentBox>
        <Support />
      </ContentBox>
    </BgImage>
  );
}

export default SupportingPage;
