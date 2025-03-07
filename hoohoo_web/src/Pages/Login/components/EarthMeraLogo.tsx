import React from 'react';
import styled from 'styled-components';
import {theme} from '../../../style';
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.darkGray};
  border-radius: 10px;
`;
function EarthMeraLogo({size}: {size: number}) {
  const ratio = 4 / 7;
  return (
    <LogoContainer style={{width: size, height: size}}>
      <img
        src={'/Images/icon_image.png'}
        style={{width: size * ratio, height: size * ratio}}
        alt="EarthMera Logo"
      />
    </LogoContainer>
  );
}

export default EarthMeraLogo;
