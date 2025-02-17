import React, { useEffect } from 'react';
import styled from 'styled-components';
import Wrapper from '../../components/Wrapper/Wrapper';
import { BgImage } from '../../style';
import Download from '../Home/Download';
import DropBIntro from './DropBIntro';
const ContentBox = styled.section`
  padding-top: 20px;
  justify-content: center;
  width: 100%;
  display: flex;
`;

function MainDropB() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <BgImage>
      <Wrapper>
        <React.Fragment>
          <ContentBox id="sketch">
            <DropBIntro />
          </ContentBox>
          <ContentBox id="download_dropb">
            <Download dropb={true} />
          </ContentBox>
        </React.Fragment>
      </Wrapper>
    </BgImage>
  );
}
export default MainDropB;
