import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {theme} from '../../../../style';

const Container = styled.div`
  display: flex;
  align-items: stretch;
  flex: 1;
  position: relative;
  width: 100%;
  column-gap: 30px;
  margin: 0px 15px;
  @media screen and (max-width: 1100px) {
    column-gap: 25px;
  }
  @media screen and (max-width: 700px) {
    column-gap: 20px;
  }
  @media screen and (max-width: 500px) {
    width: calc(100% - 40px);
    padding: 0px 20px;
    column-gap: 16px;
  }
`;
const NumberContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
`;
const NumberCircle = styled.div`
  background-color: #00bf63;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  border-radius: 50%;
  z-index: 10;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 500px) {
    width: 40px;
    font-size: 1rem;
    height: 40px;
  }
`;

const VerticalLine = styled.div<{hasNext: boolean}>`
  position: absolute;
  align-self: center;
  justify-self: center;
  z-index: 8;
  height: 100%;
  flex: 1;
  width: 4px;
  background-color: #a7a7a7;
  display: ${({hasNext}) => (hasNext ? 'block' : 'none')};
`;

const Content = styled.div`
  align-content: flex-start;
  padding-bottom: 60px;
`;

const Subtitle = styled.h3`
  font-size: 2rem;
  font-weight: 500;
  padding-top: 10px;
  margin: 0 0 60px 0;
  color: ${theme.darkGray};
  @media screen and (max-width: 1100px) {
  }
  @media screen and (max-width: 700px) {
    font-size: 1.5rem;
    margin: 0 0 60px 0;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.2rem;
    margin: 0 0 40px 0;
  }
`;

const Description = styled.p`
  font-size: 1.3rem;
  line-height: 1.3;
  color: ${theme.darkGray};
  width: 80%;
  margin: 0;
  font-weight: 300;
  word-break: keep-all;
  text-align: left;
  @media screen and (max-width: 1000px) {
    margin: 20px 0;
  }
  @media screen and (max-width: 500px) {
    margin: 10px 0;
    width: 100%;
    font-size: 1.1rem;
  }
`;
const ImageBox = styled.div`
  width: auto;
`;
const ImageWrapper = styled.div<{isInsideContent: boolean}>`
  margin-right: ${({isInsideContent}) => (isInsideContent ? '0' : '20px')};
  margin-bottom: ${({isInsideContent}) => (isInsideContent ? '10px' : '30px')};
  background-color: #ebebeb;
  border-radius: 15px;
  padding: 20px;
  display: inline-block;
`;
const Image = styled.img`
  width: 300px;
  height: auto;

  border-radius: 8px;
  @media screen and (max-width: 1100px) {
    width: 200px;
  }
  @media screen and (max-width: 800px) {
    width: 300px;
  }
  @media screen and (max-width: 600px) {
    width: 250px;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;
type HowWorkItemProps = {
  data: {
    image: string;
    subtitle: string;
    description: string;
    hasNext: boolean;
  };
  index: number;
};
function HowWorkItem({data, index}: HowWorkItemProps) {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 800);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    window.addEventListener('resize', handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <Container>
      {!isMobile && (
        <ImageWrapper isInsideContent={false}>
          <Image src={data.image} alt="step image" />
        </ImageWrapper>
      )}
      <NumberContainer>
        <NumberCircle>{index + 1}</NumberCircle>
        <VerticalLine hasNext={data.hasNext} />
      </NumberContainer>
      <Content>
        {isMobile && (
          <ImageBox>
            <ImageWrapper isInsideContent={true}>
              <Image src={data.image} alt="step image" />
            </ImageWrapper>
          </ImageBox>
        )}
        <Subtitle>{data.subtitle}</Subtitle>
        <Description>{data.description}</Description>
      </Content>
    </Container>
  );
}

export default HowWorkItem;
