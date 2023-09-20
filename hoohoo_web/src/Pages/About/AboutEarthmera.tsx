import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import Frame from '../../Component/Frame';
import AboutUs from './AboutUs';
import Partners from './Partners';
const ContentBox = styled.section`
    padding-top: 20px;
    justify-content: center;
  width: 100%;
  display: flex;
`;
function AboutEarthmera() {

    return (
        <Frame>
            <ContentBox id="about">
                <AboutUs />
            </ContentBox>
            <ContentBox id="partners">
                <Partners />
            </ContentBox>
        </Frame>
    )
}
export default AboutEarthmera