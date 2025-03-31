import i18next from 'i18next';
import React from 'react';
import {FaArrowLeft} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {theme} from '../../style';
import useWindowResize from '../hooks/useWindowResize';

interface ProgressBarProps {
  progress: number; // 0부터 100까지의 값
  height?: string;
  backgroundColor?: string;
  progressColor?: string;
  setProgress: (progress: number) => void;
}
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  position: relative;
  height: 50px;
`;
const ProgressBarContainer = styled.div<{
  height: string;
  backgroundColor: string;
}>`
  width: 100%;
  max-width: 150px;
  margin-top: 40px;
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  left: 50%;
  height: ${props => props.height};
  background-color: ${props => props.backgroundColor};
  border-radius: 999px;
  overflow: hidden;
`;
const BackButtonContainer = styled.div`
  width: 130px;
  height: 40px;
  background-color: transparent;

  margin-left: 30px;
  @media screen and (max-width: 600px) {
    width: 56px;
    height: 56px;
    padding: 0px;
    margin-left: 0px;
  }
`;
export const BackButton = styled.button`
  width: 130px;
  height: 40px;
  background-color: transparent;
  border: none;
  border-radius: 40px;
  margin-left: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: ${theme.fontSize.rg};
  color: ${theme.inActiveGray};
  margin-top: 30px;
`;
export const BackButtonIcon = styled(FaArrowLeft)`
  padding: 20px;
  font-size: ${theme.fontSize.md};
`;
const SmallSkipButton = styled.button`
  padding: ${theme.spacing.sm};
  color: ${theme.inActiveGray};
  font-size: ${theme.fontSize.rg};
  font-weight: 600;
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-right: ${theme.spacing.rg};
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
  setProgress,
  progressColor = theme.green || '#8AE65C', // 이미지에 보이는 연두색
}: ProgressBarProps) {
  // 진행률이 0-100 범위 내에 있도록 보장
  const {width: resizedWidth} = useWindowResize();
  const localizedTexts: any = i18next.t('ProgressBar', {
    returnObjects: true,
  });
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const navigate = useNavigate();
  const goBack = () => {
    setProgress(progress - 25);
    navigate(-1);
  };
  return (
    <Container>
      {progress > 25 &&
        (resizedWidth > 600 ? (
          <BackButton onClick={goBack}>{localizedTexts.back}</BackButton>
        ) : (
          <BackButtonIcon onClick={goBack} size={16} />
        ))}
      <ProgressBarContainer height={height} backgroundColor={backgroundColor}>
        <Progress width={clampedProgress} progressColor={progressColor} />
      </ProgressBarContainer>
      {progress === 75 ? (
        resizedWidth > 600 ? (
          <BackButton onClick={() => navigate('/setup/profile')}>
            {localizedTexts.skip}
          </BackButton>
        ) : (
          <SmallSkipButton onClick={() => navigate('/setup/profile')}>
            {localizedTexts.skip}
          </SmallSkipButton>
        )
      ) : (
        progress > 25 && <BackButtonContainer />
      )}
    </Container>
  );
}

export default ProgressBar;
