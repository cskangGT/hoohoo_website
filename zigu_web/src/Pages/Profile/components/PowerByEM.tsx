import React from 'react';
import styled from 'styled-components';
import {theme} from '../../../style';
const Container = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #282828;

  padding: ${theme.spacing.md} 0px;
`;
const ZIGU = styled.div`
  font-size: ${theme.fontSize.rg};
  color: ${theme.white};
  text-align: center;
  padding-right: ${theme.spacing.sm};
`;
const GreenText = styled.span`
  color: ${theme.mainNeon};
`;
const EmText = styled.span`
  font-size: ${theme.fontSize.rg};
  color: ${theme.inActiveGray};
  text-align: center;
`;
function PowerByEM() {
  return (
    <Container>
      <ZIGU>
        Z<GreenText>I</GreenText>GU{' '}
      </ZIGU>
      <EmText> by EarthMera</EmText>
    </Container>
  );
}

export default PowerByEM;
