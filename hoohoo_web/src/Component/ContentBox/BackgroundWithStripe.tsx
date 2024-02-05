import React from 'react';
import styled from 'styled-components';
import { slideInFromTop } from '../../style';

// Define the types for your component's props
interface BackgroundWithStripeProps {
  backgroundImage: string;
  children?: React.ReactNode;
}

const Background = styled.div<{ backgroundImage: string }>`
  animation: ${slideInFromTop} 0.7s ease-out forwards;
  width: 100%;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
  flex-direction: column;
  height: 960px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
  overflow: visible;
  @media screen and (max-width: 1000px){
    height: auto;
  }
  `;

const WhiteStripe = styled.div`
  position: absolute;
  top: calc(50% - 75);
  left: 0;
  width: 100%;
  height: 150px;
  background-color: white;
  z-index: 10;
`;

// Create your component using the styled components
const BackgroundWithStripe: React.FC<BackgroundWithStripeProps> = ({ backgroundImage, children }) => {
  return (
    <Background backgroundImage={backgroundImage}>
      <WhiteStripe />
      {children}
    </Background>
  );
};

export default BackgroundWithStripe;
