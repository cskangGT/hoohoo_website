import React, { useEffect } from 'react';
import styled from 'styled-components';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import { BgImage } from '../../../style';
import ESGIntro from './ESGIntro';
import BioBased from './BioBased';
import Difference from './Difference';
import Bag, { Bg } from './Bag';
import BioWork from './BioWork';
import Ticket from './Ticket';
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
            <ESGIntro/>
          </ContentBox>
          <ContentBox>
            <BioBased />
          </ContentBox>
          <Bg>
            <Wrapper>
              <ContentBox>
                <Difference />
              </ContentBox>
              <ContentBox>
                <BioWork />
              </ContentBox>
          </Wrapper>
          </Bg>
          {/* <ContentBox>
            <Ticket />
          </ContentBox> */}
          <ContentBox>
            <Bag />
          </ContentBox>
        </BgImage>
    )
}
export default ESGManagement
