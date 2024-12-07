import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Header} from '../../../Component/ContentBox/TwoColBoxesSection';
import Wrapper from '../../../Component/Wrapper/Wrapper';
const Container = styled.section`
  width: 100%;
  background-color: transparent;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 800px) {
    height: auto;
    flex-direction: column;
  }
`;
const Background = styled.div`
  width: 100%;
  background-color: #2a5647;
  height: 400px;
  display: flex;
  z-index: 1;
  @media screen and (max-width: 800px) {
    height: auto;
    margin: 50px 0px;
  }
`;
const InnerContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;
  height: 370px;
  width: 100%;
  z-index: 10;
  @media screen and (max-width: 800px) {
    height: auto;
    flex-direction: column;
  }
`;
const LeftBox = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;
const Image = styled.img`
  padding-top: 3px;
  height: 470px;
  object-fit: contain;
  @media screen and (max-width: 800px) {
    height: auto;
    width: 90%;
  }
`;
const RightBox = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 800px) {
    width: 90%;
  }
`;
const HeaderText = styled(Header)`
  color: #f18d5b;
  font-family: 'Fredoka';
`;
export const ContentText = styled.span`
  color: white;
  font-size: 1.5rem;
  padding: 30px 0px;
  width: 100%;
  @media screen and (max-width: 800px) {
    text-align: center;
  }
`;
export default function GetInTouch() {
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  // 화면 크기에 따라 isLargeScreen 상태를 설정합니다.
  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 800);
    }

    // resize 이벤트 리스너를 추가합니다.
    window.addEventListener('resize', handleResize);
    // 초기 설정을 위해 함수를 한 번 호출합니다.
    handleResize();

    // 컴포넌트 언마운트 시 이벤트 리스너를 제거합니다.
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const data = {
    header: 'Get in touch!',
    content:
      "EarthMera's green users will be a significant stepping stone for your green business.",
    image: 'Images/partnership4Image.png',
  };
  return (
    <Container>
      {!isLargeScreen && (
        <LeftBox>
          <Image src={data.image} />
        </LeftBox>
      )}
      <Background>
        <Wrapper>
          <InnerContainer>
            {isLargeScreen && (
              <LeftBox>
                <Image src={data.image} />
              </LeftBox>
            )}

            <RightBox>
              <HeaderText>{data.header}</HeaderText>
              <ContentText>{data.content}</ContentText>
            </RightBox>
          </InnerContainer>
        </Wrapper>
      </Background>
    </Container>
  );
}
