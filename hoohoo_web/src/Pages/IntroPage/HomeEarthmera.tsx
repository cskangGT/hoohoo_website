import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import IntroSection from './IntroSection';
import NumberIconContent from '../../Component/ContentBox/NumberIconContent';
import ListSection from './ListSection';
import VideoSection from './Video'
import Frame from '../../Component/Frame';
import Download from './Download';
import Partners from './Partners';
import Blog from '../Blog/Blog';
const ContentBox = styled.section`
    padding-top: 20px;
    justify-content: center;
  width: 100%;
  display: flex;
`;

type ImageProps = {
    imagePath: string;
}

function HomeEarthmera() {
    const secondImages: ImageProps[] = [{
        imagePath: 'Images/2-1.webp'
    }, {
        imagePath: 'Images/2-2.webp'
    }, {
        imagePath: 'Images/2-3.webp'
    }];
    const thirdImages: ImageProps[] = [{
        imagePath: 'Images/3-1.webp'
    }, {
        imagePath: 'Images/3-2.webp'
    }, {
        imagePath: 'Images/3-3.webp'
    }];
    return (
        <React.Fragment>
            <IntroSection />
            <ContentBox id="partners">
                <Partners />
            </ContentBox>
            <ListSection id={"next"} data={secondImages} header='' isBot={false} />
            <ListSection id={"rewards"} data={thirdImages} header='REDEEM REWARDS WITH POINTS.' isBot={true} />
            <ContentBox key="table" id="table">
                <NumberIconContent />
            </ContentBox>
            <ContentBox key="video" id="video">
                <VideoSection />
            </ContentBox>
            <ContentBox id="download" key="download">
                <Download dropb={false} />
            </ContentBox>
        </React.Fragment>);
}
export default HomeEarthmera; 