import React, { useEffect } from 'react';
import styled from 'styled-components';
import DropBIntro from './DropBIntro';
import Download from '../About/Vision/Download';
import Wrapper from '../../Component/Wrapper/Wrapper';
import { BgImage } from '../../style';
const ContentBox = styled.section`
    padding-top: 20px;
    justify-content: center;
  width: 100%;
  display: flex;
`;

function MainDropB() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <BgImage>
            <Wrapper>
                <React.Fragment >
                    <ContentBox id="sketch">
                        <DropBIntro />
                    </ContentBox>
                    <ContentBox id="download_dropb">
                        <Download dropb={true} />
                    </ContentBox>
                </React.Fragment>
            </Wrapper>
        </BgImage>
    )
}
export default MainDropB