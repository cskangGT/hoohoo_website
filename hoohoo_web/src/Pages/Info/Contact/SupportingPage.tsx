import React from 'react'
import { BgImage } from '../../../style'
import styled from 'styled-components'
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
  )
}

export default SupportingPage
