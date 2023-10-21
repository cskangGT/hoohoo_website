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
}

const SlideContainer = styled.div<{ currentSlide: number }>`
width: 100%;
  display: flex;
  transition: transform 0.5s ease-in-out;
    transform: translateX(-${props => props.currentSlide * 100}%);
`;

const Slide = styled.div`
  min-width: 100%;
  box-sizing: border-box;
  display: flex;
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
  z-index: 10;

  &:focus {
    outline: none;
  }
`;
const LeftArrow = styled(ArrowButton)`
  left:70px;
  @media screen and (max-width:1400px) {
    left: 0px;
  }
  @media screen and (max-width:550px) {
    left: 10px;
  }
`;

const RightArrow = styled(ArrowButton)`
  right: 70px;
  @media screen and (max-width:1400px) {
    right: 0px;
  }
  @media screen and (max-width:550px) {
    right: 10px;
  }
`;
const Container = styled.div`
  width: 100%;
`;
const Slider: React.FC<SlidersProps> = ({ currentSlide, handleLeftClick, handleRightClick, children, pageNumber }) => {
  // const [currentSlide, setCurrentSlide] = useState<number>(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      handleRightClick();
    },
    onSwipedRight: () => {
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
        {/* {React.Children.map(children, child => (
          <Slide>{child}</Slide>
        ))} */}
      </SlideContainer>

      {currentSlide !== pageNumber - 1 ? <RightArrow onClick={handleRightClick}>&gt;</RightArrow> : <></>}
    </Container>
  );
};

export default Slider;