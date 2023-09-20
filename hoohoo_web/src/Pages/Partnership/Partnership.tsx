import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import Frame from '../../Component/Frame';
import SketchContents from './SketchContents';
import Fundraising from './Fundraising';
const ContentBox = styled.section`
    padding-top: 20px;
    justify-content: center;
  width: 100%;
  display: flex;
`;
function Partnership() {

    return (
        <Frame>
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