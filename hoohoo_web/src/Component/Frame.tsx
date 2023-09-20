import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../src/style';
import Nav from './Nav/Nav';
import Footer from './Footer/Footer';
import Download from '../Pages/IntroPage/Download';
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
const BgImage = styled.div`
    background: url("Images/bg.svg") center top / cover no-repeat;
    // background-size: cover;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow-x: hidden;
`;

const ContactBox = styled.div`
// height: 200px;
   background-color: ${theme.darkGray};
   display: flex;
   justify-content: center;
`;
const ContactColumnBox = styled.div`
  display:flex;
  flex-direction: column;
  align-items:center;
`;
const ContactText = styled.h3`
    margin: 26px 0 ;
    font-size: 22px;
  color: ${theme.white};
`;
const ContentBox = styled.section`
    padding-top: 20px;
    justify-content: center;
  width: 100%;
  display: flex;
`;
const LinktoEmail = styled.button`
  text-decoration: none;
  background-color: ${theme.mainNeon};
  cursor: pointer;
  height: 50px;
  border-radius: 20px;
  border-color: ${theme.darkGray};
  width:200px;
  font-weight: bold;
  margin-bottom: 26px;
  &:hover {
    // background-color: #313131;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  }
`;
type FrameProps = {
    children: React.ReactNode;
    dropb?: boolean;
};

function Frame({ children, dropb }: FrameProps) {
    const [isKorean, setIsKorean] = useState(false);
    return (
        <Container>
            <BgImage>
                <Nav setIsKorean={setIsKorean} isKorean={isKorean} />
                {children}
                <ContactBox id="contact">
                    {isKorean ? <ContactColumnBox><ContactText>비즈니스 파트너십 또는 기타 문의사항을 원하시면 아래의 버튼을 클릭하세요.</ContactText>
                        <LinktoEmail form="mailto:devceohoony@gmail.com" data-l10n-id="footer_contactus">
                            문의하기</LinktoEmail></ContactColumnBox> : <ContactColumnBox><ContactText>Interested in partnering with us or have any questions? </ContactText>
                        <LinktoEmail form="mailto:devceohoony@gmail.com" data-l10n-id="footer_contactus">
                            Contact Us</LinktoEmail></ContactColumnBox>}
                </ContactBox>
                <hr style={{ color: '#f1f1f1', margin: 0 }} />
                <Footer isKorean={isKorean} />
            </BgImage>
        </Container>)
}
export default Frame;