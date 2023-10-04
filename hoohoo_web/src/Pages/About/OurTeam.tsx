import React from 'react';
import styled from 'styled-components';
import TeamIntro from './TeamIntro';
import Gallary from './Gallary';
import Wrapper from '../../Component/Wrapper/Wrapper';
const ContentBox = styled.section`
    padding-top: 20px;
    justify-content: center;
  width: 100%;
  display: flex;
`;
function OurTeam() {

    return (
        <Wrapper>
            <ContentBox>
                <TeamIntro />
            </ContentBox>
            <ContentBox>
                <Gallary />
            </ContentBox>
        </Wrapper>
    )
}
export default OurTeam