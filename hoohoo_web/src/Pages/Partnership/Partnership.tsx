import React from 'react';
import styled from 'styled-components';
import SketchContents from './SketchContents';
import Fundraising from './Fundraising';
import AboutUs from './AboutUs';
import Wrapper from '../../Component/Wrapper/Wrapper';
const ContentBox = styled.section`
    padding-top: 20px;
    justify-content: center;
  width: 100%;
  display: flex;
`;
function Partnership() {

    return (
        <Wrapper>
            <ContentBox>
                <AboutUs />
            </ContentBox>
            <ContentBox id="sketch">
                <SketchContents />
            </ContentBox>
            <ContentBox>
                <Fundraising />
            </ContentBox>
        </Wrapper>
    )
}
export default Partnership