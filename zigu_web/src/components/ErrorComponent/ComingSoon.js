import React, {useEffect} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh; // 화면 전체 높이로 설정
  background-color: transparent;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1rem;
`;

const SubHeading = styled.h2`
  font-size: 1.5rem;
  color: #777777;
`;

function ComingSoon() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container>
      <Heading>Our team is preparing the connecting page.</Heading>
      <SubHeading>Please wait a moment. We'll be launching soon!</SubHeading>
    </Container>
  );
}

export default ComingSoon;
