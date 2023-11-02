import React, { useEffect } from 'react';
import styled from 'styled-components';
import TeamIntro from './TeamIntro';
import Gallery from './Gallery';
import Wrapper from '../../Component/Wrapper/Wrapper';
import { BgImage } from '../../style';
const ContentBox = styled.section`
    padding-top: 20px;
    justify-content: center;
  width: 100%;
  display: flex;
`;
function OurTeam() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <BgImage>
            <Wrapper>
                <ContentBox>
                    <TeamIntro />
                </ContentBox>
                <ContentBox>
                    <Gallery />
                </ContentBox>
            </Wrapper>
        </BgImage>
    )
}
export default OurTeam