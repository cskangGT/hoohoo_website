import React, { useEffect } from 'react';
import styled from 'styled-components';
import SketchContents from './SketchContents';
import AboutUs from './AboutUs';
import Wrapper from '../../Component/Wrapper/Wrapper';
import { BgImage } from '../../style';
import IntroEarthMera from './IntroEarthMera';
const ContentBox = styled.section`
    padding-top: 20px;
    justify-content: center;
  width: 100%;
  display: flex;
  margin-top: 82px;
  @media screen and (max-width: 700px){
    margin-top: 40px;
  }
`;
function Partnership() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <BgImage>
            <Wrapper>
                <ContentBox>
                    <AboutUs />
                </ContentBox>
                <ContentBox id="sketch">
                    <SketchContents />
                </ContentBox>
                <ContentBox>
                    <IntroEarthMera />
                </ContentBox>
            </Wrapper>
        </BgImage>
    )
}
export default Partnership