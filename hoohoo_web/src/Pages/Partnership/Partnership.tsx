import React from 'react';
import styled from 'styled-components';
import Frame from '../../Component/Frame';
import SketchContents from './SketchContents';
import Fundraising from './Fundraising';
import AboutUs from './AboutUs';
const ContentBox = styled.section`
    padding-top: 20px;
    justify-content: center;
  width: 100%;
  display: flex;
`;
function Partnership() {

    return (
        <Frame>
            <ContentBox>
                <AboutUs />
            </ContentBox>
            <ContentBox id="sketch">
                <SketchContents />
            </ContentBox>
            <ContentBox>
                <Fundraising></Fundraising>
            </ContentBox>
        </Frame>
    )
}
export default Partnership