import React, { useEffect } from 'react';
import styled from 'styled-components';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import { BgImage } from '../../../style';
import R3 from './R3';
import BioBased from './BioBased';
import Difference from './Difference';
import Bag from './Bag';
const ContentBox = styled.section`
    justify-content: center;
  width: calc(100%);
  display: flex;
`;
function ESGManagement() {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <BgImage>
            <ContentBox>
          <R3></R3>
          </ContentBox>
          <ContentBox>
            <BioBased />
          </ContentBox>
          <ContentBox>
            <Difference />
          </ContentBox>
          <ContentBox>
            <Bag />
          </ContentBox>
        </BgImage>
    )
}
export default ESGManagement
