import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {theme} from '../../style';
import {Container} from './style';

import Wrapper from '../../Component/Wrapper/Wrapper';
import LandingFormModal from './LandingFormModal';

const Background = styled.div`
  /* background: url("Images/bg.svg") center top / cover no-repeat; */
  background-color: #a6a6a6;
  // background-size: cover;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow-x: hidden;
`;
const HeaderBox = styled.div`
  background-color: transparent;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 500px) {
    width: 60%;
  }
`;

const Header = styled.h1`
  color: ${theme.white};
  letter-spacing: 0.4px;
  margin-top: 0.4rem;
  margin-bottom: 0.8rem;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  width: 100%;
  text-align: center;
  /* text-shadow: 5px 1px px black; */
  text-shadow: 10px 6px 10px rgba(0, 0, 0, 0.3);
  @media screen and (max-width: 800px) {
    font-size: 2rem;
  }
`;
const Button = styled.a`
  position: absolute;
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  border-radius: 10px;
  margin-top: 0.75rem;
  color: ${theme.white};
  background-color: ${theme.darkGray};
  display: flex;
  border-radius: 40px;
  text-align: center;
  padding: 10px 2rem;
  bottom: 15%;
  left: 50%;
  text-transform: uppercase;
  transform: translateX(-50%);
  @media screen and (max-width: 1100px) {
    font-size: 1rem;
  }
`;
const BelowBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const LeftText = styled.h4`
  width: auto;
  color: ${theme.darkGray};
  font-size: 2rem;
  display: flex;
  padding-left: 10rem;
  margin-bottom: 7rem;
  @media screen and (max-width: 1100px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 500px) {
    padding-left: 3rem;
  }
`;
const RightText = styled.h4`
  width: auto;
  color: ${theme.darkGray};
  font-size: 2rem;
  display: flex;
  justify-content: flex-end;
  padding-right: 5rem;
  margin-top: 7rem;
  @media screen and (max-width: 1100px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 500px) {
    padding-right: 1rem;
  }
`;
const Image = styled.img`
  position: absolute;
  width: 100%;
  object-fit: cover;
  top: 3rem;
`;
const Line = styled.img`
  width: 100%;
  object-fit: cover;
  height: 103%;
  position: absolute;
`;

const LogoBox = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LogoImage = styled.img`
  width: 50px;
  height: 50px;
`;
const LogoText = styled.p`
  padding-left: 10px;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  text-transform: uppercase;
`;
const LogoContainer = styled.div`
  display: flex;
  width: 100%;
`;
function Logo() {
  return (
    <LogoBox>
      <LogoImage src="Images/earthmera_logo_white_ver.png" />
      <LogoText>EarthMera</LogoText>
    </LogoBox>
  );
}
const SliderContainer = styled.div`
  overflow: hidden;
  width: 100%;
  height: 300px; // 높이를 원하는대로 설정하세요
  position: relative;
`;

const SliderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1s ease-in-out;
`;

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({images}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex, images.length]);

  return (
    <SliderContainer>
      {images.map((image, index) => (
        <SliderImage
          key={index}
          src={image}
          alt={`Slide ${index}`}
          style={{
            transform: `translateX(${(index - currentIndex) * 100}%)`,
            position: index === currentIndex ? 'relative' : 'absolute',
          }}
        />
      ))}
    </SliderContainer>
  );
};
interface Props {
  toggleAutoSliding: (state: boolean) => void;
}
function LandingOrganizer({toggleAutoSliding}: Props) {
  const data = {
    header: 'Take photos, Take rewards.',
    headerSec: "That's it.",
    leftMsg: 'The world',
    rightMsg: 'will have changed.',
    centerImage: 'Images/3page_pics_without_btn.svg',
    button: 'Save the earth',
    logo: 'Images/earthmera_logo_white_ver.png',
    logoText: 'Earthmera',
    line: 'Images/solid_line.svg',
    images: [
      'Images/imgBlack1.svg',
      'Images/imgBlack2.svg',
      'Images/img3_mid.svg',
      'Images/ImgColor4.svg',
      'Images/imgColor5.svg',
    ],
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => {
    toggleAutoSliding(false);
    setIsOpen(true);
  };

  const handleClose = () => {
    toggleAutoSliding(true);
    setIsOpen(false);
  };

  return (
    <Background>
      <Wrapper>
        <Container style={{overflow: 'hidden', flexDirection: 'column'}}>
          <HeaderBox>
            <Header>{data.header}</Header>
            <Header>{data.headerSec}</Header>
          </HeaderBox>
          <BelowBox>
            <Line src={data.line} />
            <LeftText>{data.leftMsg}</LeftText>
            <ImageSlider images={data.images} />
            {/* <Image src={data.centerImage} /> */}
            <Button onClick={handleOpen}>{data.button}</Button>
            {isOpen && (
              <LandingFormModal isOpen={isOpen} handleClose={handleClose} />
            )}
            <RightText>{data.rightMsg}</RightText>
          </BelowBox>
          <LogoContainer>
            <Logo></Logo>
          </LogoContainer>
        </Container>
      </Wrapper>
    </Background>
  );
}
export default LandingOrganizer;
