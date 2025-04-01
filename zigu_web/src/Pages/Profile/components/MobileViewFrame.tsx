import React, {ReactNode, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {useProfile} from '../contexts/ProfileContext';

interface MobileViewFrameProps {
  children: ReactNode;
  backgroundColor?: string;
  containerBackgroundColor?: string;
  onScroll?: (event: Event) => void;
  getMobileContentRef?: (ref: HTMLDivElement | null) => void;
}

const OuterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;

  padding: 0;
  margin: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const MobileContainer = styled.div<{$isDarkMode: boolean}>`
  width: 100%;
  max-width: 600px;
  height: 100%;
  min-height: ${window.innerHeight}px;

  margin: 0 auto;
  background-color: ${'#1e1e1e5f'};
  border-radius: 0;
  overflow: hidden;
  box-shadow: 2px 10px 20px rgba(0, 0, 0, 0.9);
  position: relative;
  display: flex;
  flex-direction: column;

  /* border-left: 1px solid #333333;
  border-right: 1px solid #333333; */
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

function MobileViewFrame({
  children,
  onScroll,
  getMobileContentRef,
}: MobileViewFrameProps) {
  const {isDarkMode} = useProfile();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (getMobileContentRef) {
      getMobileContentRef(contentRef.current);
    }
  }, [getMobileContentRef]);

  useEffect(() => {
    const content = contentRef.current;
    if (content && onScroll) {
      content.addEventListener('scroll', onScroll);
      return () => {
        content.removeEventListener('scroll', onScroll);
      };
    }
  }, [onScroll]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (onScroll) {
      onScroll(e as unknown as Event);
    }
  };

  return (
    <OuterContainer>
      <MobileContainer $isDarkMode={isDarkMode}>
        <MobileContent ref={contentRef} onScroll={handleScroll}>
          {children}
        </MobileContent>
      </MobileContainer>
    </OuterContainer>
  );
}

export default MobileViewFrame;
