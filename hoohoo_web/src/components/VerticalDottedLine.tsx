import React from 'react';
import styled from 'styled-components';

interface VerticalDottedLineProps {
  height?: string;
  color?: string;
  dotSize?: number;
  dotGap?: number;
  width?: number;
}

const LineContainer = styled.div<{
  height: string;
  width: number;
}>`
  position: relative;
  height: ${props => props.height};
  width: ${props => props.width}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DottedLine = styled.div<{
  color: string;
  dotSize: number;
  dotGap: number;
}>`
  position: relative;
  height: 100%;
  width: ${props => props.dotSize}px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
      to bottom,
      transparent 0%,
      ${props => props.color} 15%,
      ${props => props.color} 85%,
      transparent 100%
    );
    background-size: ${props => props.dotSize}px
      ${props => props.dotSize + props.dotGap}px;
    background-position: 0 0;
    background-repeat: repeat-y;
    mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      black 15%,
      black 85%,
      transparent 100%
    );
    mask-size: 100% 100%;
    -webkit-mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      black 15%,
      black 85%,
      transparent 100%
    );
    -webkit-mask-size: 100% 100%;
  }
`;

const VerticalDottedLine: React.FC<VerticalDottedLineProps> = ({
  height = '100%',
  color = '#CCCCCC',
  dotSize = 2,
  dotGap = 4,
  width = 1,
}) => {
  return (
    <LineContainer height={height} width={width}>
      <DottedLine color={color} dotSize={dotSize} dotGap={dotGap} />
    </LineContainer>
  );
};

export default VerticalDottedLine;
