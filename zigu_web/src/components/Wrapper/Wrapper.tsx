import React from 'react';
import styled from 'styled-components';
const Wrap = styled.div`
  width: calc(100%);
  max-width: 1200px;
  margin: 0 auto;
  
  @media screen and (max-width: 1200px) {
    max-width: 1100px;
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
type WrapProps = {
  children: React.ReactNode;
};
function Wrapper({children}: WrapProps) {
  return <Wrap>{children}</Wrap>;
}
export default Wrapper;
