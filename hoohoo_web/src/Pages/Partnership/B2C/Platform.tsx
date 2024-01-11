import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import { BgImage, theme } from '../../../style';

import PlatformIntro from './PlartformIntro';
import HowWork from './HowWork';
import Community from './Community';
import Rewards from './Rewards';
import Pioneer from './Pioneer';
import i18next from 'i18next';
import { useLocation } from 'react-router-dom';
import { Category } from '../../../Component/Blog/BlogCard';
import CategorySection from './CategorySection';
const IntroBox = styled.section`
    justify-content: center;
  width: 100%;
  display: flex;
  
`;
const ContentBox = styled.div`
  width: calc(100%);
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1000px){
    margin-bottom: 40px;
    height: auto;
  }
`;
const NoHeight = styled(ContentBox)`
  height: auto;
`;
function Platform() {
    const location = useLocation();
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        if (location.hash === '#action' && sectionRef.current) {
          sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [location]);
    const data :any= i18next.t('community', { returnObjects: true });

    return (
        <BgImage>
            <IntroBox>
               <PlatformIntro />
            </IntroBox>
            <Wrapper>
                <ContentBox ref={sectionRef} id="action">
                    <HowWork />
                </ContentBox>
                <NoHeight>
                    <CategorySection />
                </NoHeight>
                <ContentBox>
                    <Rewards />
                </ContentBox>
                </Wrapper>
                    <BgImage bgcolor={'#EFE7DF'}>
                        <Wrapper>
                        {
                            data.map((item : any, index:number)=> (
                                <ContentBox>
                                    <Community data={item} index={index}/>
                                </ContentBox>
                            ))
                        }
                        <ContentBox>
                            <Pioneer />
                        </ContentBox>
                    </Wrapper>
            </BgImage>
        </BgImage>
    )
}
export default Platform