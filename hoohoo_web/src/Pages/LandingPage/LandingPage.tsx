import React from 'react';
import styled from 'styled-components';
import Wrapper from '../../Component/Wrapper/Wrapper';
import LandingFestival from './LandingFestival';
import LandingReward from './LandingReward';
import LandingOrganizer from './LandingOrganizer';
import LandingEnv from './LandingEnv';
const Background = styled.div`
    background: url("Images/bg.svg") center top / cover no-repeat;
    // background-size: cover;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow-x: hidden;
`;
const ContentBox = styled.section`
    padding-top: 20px;
    justify-content: center;
  width: 100%;
  display: flex;
`;
function LandingPage() {

    return (
        <React.Fragment>

            <LandingFestival />
            <LandingReward></LandingReward>

            <LandingOrganizer></LandingOrganizer>

            <LandingEnv></LandingEnv>
        </React.Fragment>
    )
}
export default LandingPage