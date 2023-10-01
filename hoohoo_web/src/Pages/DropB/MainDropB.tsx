import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Frame from '../../Component/Frame';
import DropBIntro from './DropBIntro';
import Download from '../IntroPage/Download';
const ContentBox = styled.section`
    padding-top: 20px;
    justify-content: center;
  width: 100%;
  display: flex;
`;
function MainDropB() {
    return (
        <React.Fragment >
            <ContentBox id="sketch">
                <DropBIntro />
            </ContentBox>
            <ContentBox >
                <Download dropb={true} />
            </ContentBox>
        </React.Fragment>
    )
}
export default MainDropB