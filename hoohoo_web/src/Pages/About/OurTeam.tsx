import React from 'react';
import styled from 'styled-components';
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
        <React.Fragment>
            <ContentBox>
                <TeamIntro />
            </ContentBox>
            <ContentBox>
                <Gallary />
            </ContentBox>
        </React.Fragment>
    )
}
export default OurTeam