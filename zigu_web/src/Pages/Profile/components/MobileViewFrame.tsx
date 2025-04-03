import React, {ReactNode, useEffect, useRef} from 'react';
import {MdOutlineDarkMode, MdOutlineLightMode} from 'react-icons/md';
import styled from 'styled-components';
import {theme} from '../../../style';
import {useProfile} from '../contexts/ProfileContext';

interface MobileViewFrameProps {
  children: ReactNode;
  backgroundColor?: string;
  containerBackgroundColor?: string;
}

const OuterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  align-items: center;
  background-color: transparent;
  overflow-y: auto;
  position: relative;
  padding: 0;
  margin: 0;
  /* overflow: hidden; */
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
const DarkModeButton = styled.button<{$isDarkMode: boolean}>`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
  background-color: ${props =>
    props.$isDarkMode ? theme.white : theme.darkGray};
  color: ${props => (props.$isDarkMode ? theme.darkGray : theme.white)};
  border: none;
  cursor: pointer;

  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 25px;
  height: 50px;
  width: 50px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};

  z-index: 103;
  @media (max-width: 760px) {
    display: none;
  }
  @media (max-width: 600px) {
    height: 50px;
    width: 50px;
    padding: ${theme.spacing.sm} 8px;
    font-size: ${theme.fontSize.md};
    border-radius: 25px;
  }
  @media (max-width: 400px) {
    height: 40px;
    padding: ${theme.spacing.sm} 4px;
    font-size: ${theme.fontSize.rg};
    width: 40px;
    border-radius: 20px;
  }
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
  const {isDarkMode, setIsDarkMode} = useProfile();
  const outerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  function handleDarkMode() {
    setIsDarkMode(!isDarkMode);
  }
  useEffect(() => {
    const outer = outerRef.current;
    const content = contentRef.current;
    if (!outer || !content) return;

    // wheel 이벤트를 막고, 내부 scrollTop을 직접 조작
    const onWheel = (e: WheelEvent) => {
      e.preventDefault(); // 바깥 레이어의 기본 스크롤 방지
      content.scrollTop += e.deltaY; // 내부 컨텐츠를 스크롤
    };
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const deltaY = startY - e.touches[0].clientY;
      content.scrollTop += deltaY;
      startY = e.touches[0].clientY;
    };

    outer.addEventListener('wheel', onWheel, {passive: false});
    outer.addEventListener('touchstart', onTouchStart, {passive: false});
    // outer.addEventListener('touchmove', onTouchMove, {passive: false});

    return () => {
      outer.removeEventListener('wheel', onWheel);
      outer.removeEventListener('touchstart', onTouchStart);
      // outer.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <OuterContainer ref={outerRef}>
      <MobileContainer $isDarkMode={isDarkMode}>
        <MobileContent ref={contentRef}>{children}</MobileContent>
      </MobileContainer>
      <DarkModeButton onClick={handleDarkMode} $isDarkMode={isDarkMode}>
        {!isDarkMode ? (
          <MdOutlineDarkMode size={30} color={theme.white} />
        ) : (
          <MdOutlineLightMode size={30} color={theme.darkGray} />
        )}
      </DarkModeButton>
    </OuterContainer>
  );
}

export default MobileViewFrame;
