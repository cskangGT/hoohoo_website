import React, {ReactNode} from 'react';
import styled from 'styled-components';

interface MobileViewFrameProps {
  children: ReactNode;
  backgroundColor?: string;
  containerBackgroundColor?: string;
}

const OuterContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${'#121212'};
  padding: 0;
  margin: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const MobileContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100vh;
  max-height: 100vh;
  margin: 0 auto;
  background-color: ${'#1e1e1e'};
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  position: relative;
  display: flex;
  flex-direction: column;

  border-left: 1px solid #333333;
  border-right: 1px solid #333333;
`;

const MobileContent = styled.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

function MobileViewFrame({children}: MobileViewFrameProps) {
  return (
    <OuterContainer>
      <MobileContainer>
        <MobileContent>{children}</MobileContent>
      </MobileContainer>
    </OuterContainer>
  );
}

export default MobileViewFrame;
