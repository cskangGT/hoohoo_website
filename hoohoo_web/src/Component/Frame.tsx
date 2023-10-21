import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../src/style';
import Nav from './Nav/Nav';
import Footer from './Footer/Footer';

const Container = styled.div`
    width: 100%;
    height: 100%;
    min-height:100vh;
    max-width:100vw;
    padding:0;
    display: block;
    margin: 0px;
    align-items:center;
    background-color: ${theme.darkGray};
`;
const ContactBox = styled.div`
   background-color: ${theme.darkGray};
   display: flex;
   justify-content: center;
   padding: 0 10px;
`;
const ContactColumnBox = styled.div`
  display:flex;
  flex-direction: column;
  align-items:center;
`;
const ContactText = styled.h3`
    margin: 26px 10px ;
    font-size: 1.3rem;
    text-align: center;
  color: ${theme.white};
`;

const LinktoEmail = styled.a`
  text-decoration: none;
  color: ${theme.darkGray};
  background-color: ${theme.mainNeon};
  height: 50px;
  border-radius: 20px;
  border-color: ${theme.darkGray};
  width:200px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 26px;
  &:hover {
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  }
`;
type FrameProps = {
  children: React.ReactNode;
};

function Frame({ children }: FrameProps) {
  const [isKorean, setIsKorean] = useState(false);
  return (
    <Container>
      <Nav setIsKorean={setIsKorean} isKorean={isKorean} />
      {children}
      <ContactBox id="contact" key="contact">
        {isKorean ? <ContactColumnBox><ContactText>비즈니스 파트너십 또는 기타 문의사항을 원하시면 아래의 버튼을 클릭하세요.</ContactText>
          <LinktoEmail href="mailto:devceohoony@gmail.com" data-l10n-id="footer_contactus">
            문의하기</LinktoEmail></ContactColumnBox> : <ContactColumnBox><ContactText>Interested in partnering with us or have any questions? </ContactText>
          <LinktoEmail href="mailto:devceohoony@gmail.com" data-l10n-id="footer_contactus">
            Contact Us</LinktoEmail></ContactColumnBox>}
      </ContactBox>
      <hr style={{ color: '#f1f1f1', margin: 0 }} />
      <Footer isKorean={isKorean} />
    </Container>)
}
export default Frame;