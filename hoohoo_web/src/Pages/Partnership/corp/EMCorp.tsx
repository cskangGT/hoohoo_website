import React, { useEffect } from 'react';
import Wrapper from '../../../components/Wrapper/Wrapper';
import { BgImage } from '../../../style';
import CorpIntro from './sections/CorpIntro';
import CorpOurFeatures from './sections/CorpOurFeatures';
import SmartSustainability from './sections/SmartSustainability';
import SolutionSection from './sections/SolutionSection';

function EMCorp() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <BgImage>
      <CorpIntro />
      <Wrapper>
        <SolutionSection />
        <SmartSustainability />
      </Wrapper>
      <CorpOurFeatures />
    </BgImage>
  );
}

export default EMCorp;
