import React from 'react';
import styled from 'styled-components';
import {theme} from '../../../style';
const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: ${theme.spacing.md} 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid rgba(13, 12, 34, 0.05);
  }

  span {
    margin: 0 ${theme.spacing.sm};
    color: #6e6d7a;
    opacity: 0.5;
    font-size: ${theme.fontSize.sm};
  }
`;
function LineDivider({text}: {text: string}) {
  return (
    <Divider>
      <span>{text}</span>
    </Divider>
  );
}

export default LineDivider;
