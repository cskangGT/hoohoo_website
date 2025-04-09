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
  z-index: 9999;
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
const ByText = styled.span`
  font-size: ${theme.fontSize.rg};
  color: ${theme.inActiveGray};
  padding-right: 4px;
`;
const EmText = styled.span`
  font-size: ${theme.fontSize.rg};
  color: ${theme.inActiveGray};
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: ${theme.inActiveGray};
`;
function PowerByEM() {
  function handleClick() {
    window.open('https://earthmera.com/', '_blank');
  }
  return (
    <Container>
      <ZIGU>
        Z<GreenText>I</GreenText>GU{' '}
      </ZIGU>{' '}
      <ByText>by </ByText> <EmText onClick={handleClick}> EarthMera Co.</EmText>
    </Container>
  );
}

export default PowerByEM;
