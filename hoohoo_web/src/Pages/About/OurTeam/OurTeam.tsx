import React, { useEffect } from 'react';
import styled from 'styled-components';
import TeamProfiles from './TeamProfiles';
import Gallery from './Gallery';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import { BgImage, theme } from '../../../style';
import TeamIntro from './TeamIntro';
import Strength from './Strength';
import Mindset from './Mindset';

import FootContact from '../../../Component/Footer/FootContact';
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
    return (<>
        <BgImage>
            <TeamIntro />
               <BgImage bgcolor='#393E46'>
                <Wrapper>
                    <ContentBox>
                        <Strength />
                    </ContentBox>
                    <ContentBox>
                        <Mindset />
                    </ContentBox>
                </Wrapper>
               </BgImage>
            <Wrapper>
                <ContentBox>
                    <TeamProfiles />
                </ContentBox>
                <ContentBox>
                    <Gallery />
                </ContentBox>
                
            </Wrapper>
            
        </BgImage>
        <hr style={{ color: theme.darkGray, margin: 0 }} />
        <FootContact />
        </>
    )
}
export default OurTeam