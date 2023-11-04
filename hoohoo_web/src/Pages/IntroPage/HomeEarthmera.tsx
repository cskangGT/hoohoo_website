import React, { useEffect } from 'react';
import styled from 'styled-components';
import IntroSection from './IntroSection';


import { BgImage } from '../../style';

const Wrap = styled.div`
  width: calc(100%);
  max-width: 1300px; 
  margin: 0 auto;
  @media screen and (max-width: 1400px) {
    max-width: 1300px;
  }
  @media screen and (max-width: 1200px) {
    max-width: 1200px;
  }

  @media screen and (max-width: 1000px) {
    max-width: 850px;
  }

  @media screen and (max-width: 850px) {
    max-width: 750px;
  }

  @media screen and (max-width: 700px) {
    max-width: 550px;
  }

  @media screen and (max-width: 550px) {
    max-width: 400px;
  }
`;


function HomeEarthmera() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <BgImage>
      <Wrap>
        <IntroSection />
      </Wrap>
    </BgImage>
  );
}
export default HomeEarthmera; 