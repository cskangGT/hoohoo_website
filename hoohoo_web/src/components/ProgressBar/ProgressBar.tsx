import React from 'react';
import styled from 'styled-components';
import {theme} from '../../style';

interface ProgressBarProps {
  progress: number; // 0부터 100까지의 값
  height?: string;
  backgroundColor?: string;
  progressColor?: string;
}
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProgressBarContainer = styled.div<{
  height: string;
  backgroundColor: string;
}>`
  width: 100%;
  max-width: 150px;
  margin-top: 40px;
  height: ${props => props.height};
  background-color: ${props => props.backgroundColor};
  border-radius: 999px;
  overflow: hidden;
`;

const Progress = styled.div<{width: number; progressColor: string}>`
  width: ${props => props.width}%;
  height: 100%;
  background-color: ${props => props.progressColor};
  border-radius: 999px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent 25%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 75%
    );
    background-size: 200% 100%;
    /* animation: shimmer 1.5s infinite; */
  }

  /* @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  } */
`;

function ProgressBar({
  progress,
  height = '8px',
  backgroundColor = '#E0E0E0',
  progressColor = theme.green || '#8AE65C', // 이미지에 보이는 연두색
}: ProgressBarProps) {
  // 진행률이 0-100 범위 내에 있도록 보장
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <Container>
      <ProgressBarContainer height={height} backgroundColor={backgroundColor}>
        <Progress width={clampedProgress} progressColor={progressColor} />
      </ProgressBarContainer>
    </Container>
  );
}

export default ProgressBar;
