import React from 'react';
import styled from 'styled-components';
import {theme} from '../../style';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipContent = styled.div`
  position: absolute;
  top: calc(100% + 15px);

  left: 80%;
  transform: translateX(-80%);
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background-color: rgba(64, 64, 64, 0.9);
  color: white;
  border-radius: 16px;
  font-size: ${theme.fontSize.md};
  line-height: 1.5;
  white-space: nowrap;
  opacity: 1;

  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 80%;
    transform: translateX(-80%);
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent rgba(64, 64, 64, 0.9) transparent;
  }
`;

const CustomTooltip: React.FC<TooltipProps> = ({children, content}) => {
  return (
    <TooltipContainer>
      {children}
      <TooltipContent dangerouslySetInnerHTML={{__html: content}} />
    </TooltipContainer>
  );
};

export default CustomTooltip;
