import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import Frame from '../../Component/Frame';
import TeamIntro from './TeamIntro';
import Gallary from './Gallary';
const ContentBox = styled.section`
    padding-top: 20px;
    justify-content: center;
  width: 100%;
  display: flex;
`;
function OurTeam() {

    return (
        <Frame>
            <ContentBox>
                <TeamIntro />
            </ContentBox>
            <ContentBox>
                <Gallary />
            </ContentBox>
        </Frame>
    )
}
export default OurTeam