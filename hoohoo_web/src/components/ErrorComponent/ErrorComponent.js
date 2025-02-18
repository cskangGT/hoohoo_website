import styled from 'styled-components';
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
function ErrorComponent() {
  return <Container>
    <h1>This component Crashed</h1>
  </Container>;
}

export default ErrorComponent;
