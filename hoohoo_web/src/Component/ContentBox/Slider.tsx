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
  transition: transform 0.3s ease;
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
  color: ${theme.white};
  font-size: 2rem;
  z-index: 10;

  &:focus {
    outline: none;
  }
`;
const LeftArrow = styled(ArrowButton)`
  left: 0px;
`;

const RightArrow = styled(ArrowButton)`
right: 0;
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

  // const handleLeftClick = () => {
  //     if (currentSlide === 1) {
  //         setCurrentSlide(0);
  //     }
  // };

  // const handleRightClick = () => {
  //     if (currentSlide === 0) {
  //         setCurrentSlide(1);
  //     }
  // };

  // const handlers = useSwipeable({
  //     onSwipedLeft: () => {
  //         handleRightClick();
  //     },
  //     onSwipedRight: () => {
  //         handleLeftClick();
  //     },
  //     preventScrollOnSwipe: true,
  //     trackMouse: true,
  // });

  // useEffect(() => {
  //     const slideInterval = setInterval(() => {
  //         setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  //     }, 10000);

  //     return () => {
  //         clearInterval(slideInterval);
  //     };
  // }, [images.length]);

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