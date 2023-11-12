import React from 'react';
import { useSwipeable } from 'react-swipeable';
import styled from 'styled-components';
import { theme } from '../../style';

interface SlidersProps {
  currentSlide: number;
  handleLeftClick: () => void;
  handleRightClick: () => void;
  pageNumber: number;
  children: any;
  isModalOpen?: boolean;
}

const SlideContainer = styled.div<{ currentSlide: number }>`
width: 100%;
  display: flex;
  transition: transform 0.5s ease-in-out;
    transform: translateX(-${props => props.currentSlide * 100}%);
`;
const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.darkGray};
  font-size: 2rem;
  z-index: 1000;
  padding: 10px;
  &:focus {
    outline: none;
  }
`;
const LeftArrow = styled(ArrowButton)`
  left: 0px;
  
`;

const RightArrow = styled(ArrowButton)`
  right: 0px;
`;
const Container = styled.div`
  width: 100%;
  position: relative;
`;
const Slider: React.FC<SlidersProps> = ({ currentSlide, handleLeftClick, handleRightClick, children, pageNumber, isModalOpen }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if(!isModalOpen)
      handleRightClick();
    },
    onSwipedRight: () => {
      if(!isModalOpen)
      handleLeftClick();
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <Container {...handlers} >
      {currentSlide === 0 ? <></> : <LeftArrow onClick={handleLeftClick}>&lt;</LeftArrow>}

      <SlideContainer currentSlide={currentSlide}>
        {children}
      </SlideContainer>

      {currentSlide !== pageNumber - 1 ? <RightArrow onClick={handleRightClick}>&gt;</RightArrow> : <></>}
    </Container>
  );
};

export default Slider;