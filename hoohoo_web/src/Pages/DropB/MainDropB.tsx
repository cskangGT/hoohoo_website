import React from 'react';
import styled from 'styled-components';
import DropBIntro from './DropBIntro';
import Download from '../IntroPage/Download';
import Wrapper from '../../Component/Wrapper/Wrapper';
import { BgImage } from '../../style';
const ContentBox = styled.section`
    padding-top: 20px;
    justify-content: center;
  width: 100%;
  display: flex;
`;
function MainDropB() {
    return (
        <BgImage>
            <Wrapper>
                <React.Fragment >
                    <ContentBox id="sketch">
                        <DropBIntro />
                    </ContentBox>
                    <ContentBox >
                        <Download dropb={true} />
                    </ContentBox>
                </React.Fragment>
            </Wrapper>
        </BgImage>
    )
}
export default MainDropB