import React from 'react';
import styled from 'styled-components';
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
`;
function EarthMeraLogo({size}: {size: number}) {
  const ratio = 5 / 7;
  return (
    <LogoContainer style={{width: size, height: size}}>
      <img
        src={'/Images/G9.png'}
        style={{width: size * ratio, height: size * ratio}}
        alt="EarthMera Logo"
      />
    </LogoContainer>
  );
}

export default EarthMeraLogo;
