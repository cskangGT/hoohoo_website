import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faPinterestP } from '@fortawesome/free-brands-svg-icons';
const Background = styled.footer`
    background-color: #1e1e1e;
    padding: 40px 0;
    margin: 0 -15px;
`;
const Container = styled.div`
    max-width: 100%;
    margin: 0 auto;
    padding: 0 20%;
    
`;
const Box = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    @media (max-width: 800px) {
      flex-direction: column;
  }
`;
const Column = styled.div`
    display: flex;
    flex-direction : column;
    padding: 0 15px;
`;
const FooterBottom = styled.div`
  padding: 10px 0;
  position: relative;
  max-width: 1200px;
`;
const FooterTitle = styled.h3`
  color: #f1f1f1;
`;
const BusinessDetail = styled.p`
  font-size: 14px;
  line-height: 22.4px;
  color: #f1f1f1;
`;
const RowBox = styled.div`
  display : flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  padding: 10px;
  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
    align-content: center;
    text-align: center;
}
`;

const LinktoEmail = styled.a`
  text-decoration: none;
  color: #9d9d9d;
  padding: 0 15px;
`;
const FooterButton = styled.a`
    padding: 5px 25px;
    background-color: transparent;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    color: ${theme.white};
    margin: 5px 0;
    &:hover {
      background-color: #313131;
        color: ${theme.mainNeon};
    }
`;
const IconBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: -5px;
    @media (max-width: 800px) {
      position: absolute;
      right: 0;
      top: 0;
    }
`;
const IconButton = styled.a`
  padding-left: 5px;
  padding-top: 5px;
  width: 40px;
  height: 40px;
`;

function Buttons({ text1, action1, text2, action2 }) {
  return (
    <Column>
      <FooterButton onClick={action1}>{text1}</FooterButton>
      <FooterButton onClick={action2}>{text2}</FooterButton>
    </Column>
  );
}
function Ibutton({ icon, action }) {
  return (
    <IconButton onClick={action}>
      <FontAwesomeIcon icon={icon} size='xl' style={{ color: "#f1f1f1" }} />
    </IconButton>
  )
}

function Footer() {
  var language = 'EN';
  return (
    <Background>
      <Container>
        <Box>
          {
            language === 'KR' ? <Column>
              <FooterTitle>어스메라(Earthmera)</FooterTitle>
              <BusinessDetail> 대표이사 : 강성훈
                <br /> 이메일 : devceohoony@gmail.com
              </BusinessDetail>
            </Column> : <Column>
              <FooterTitle>Earthmera</FooterTitle>
              <BusinessDetail> CEO : Seonghoon Kang
                <br /> Email : devceohoony@gmail.com
              </BusinessDetail>
            </Column>
          }

          {
            language === 'KR' ? <RowBox>
              <Buttons text1="소개글" action1={() => alert('About Us clicked!')}
                text2="이용약관" action2={() => alert('Terms of Use clicked!')} />
              <Buttons text1="광고" action1={() => alert('Advertising clicked!')}
                text2="개인정보처리방침" action2={() => alert('Privacy Policy clicked!')} />
            </RowBox> : <RowBox>
              <Buttons text1="About Us" action1={() => alert('About Us clicked!')}
                text2="Terms of Use" action2={() => alert('Terms of Use clicked!')} />
              <Buttons text1="Advertising" action1={() => alert('Advertising clicked!')}
                text2="Privacy Policy" action2={() => alert('Privacy Policy clicked!')} />

            </RowBox>
          }
          <IconBox>
            <Ibutton icon={faInstagram} action={() => alert('Instagram clicked!')} />
            <Ibutton icon={faPinterestP} action={() => alert('Pinterest clicked!')} />
          </IconBox>
        </Box>
        <FooterBottom>
          {/* <hr style={{ color: '#f1f1f1' }} /> */}
          {
            language === 'EN' ?
              <Box style={{ justifyContent: 'normal' }}>
                <LinktoEmail href="mailto:devceohoony@gmail.com" data-l10n-id="footer_contactus">
                  Contact Us</LinktoEmail>
                <BusinessDetail style={{ marginLeft: 20 }}>Copyright&copy; 2023 by Hoohoo, All rights reserved.</BusinessDetail>
              </Box> :
              <Box style={{ justifyContent: 'normal' }}>
                <LinktoEmail href="mailto:devceohoony@gmail.com" data-l10n-id="footer_contactus">
                  문의하기</LinktoEmail>
                <BusinessDetail style={{ marginLeft: 20 }}>Copyright&copy; 2023 by Hoohoo, All rights reserved.</BusinessDetail>
              </Box>
          }
        </FooterBottom>
      </Container>

    </Background>
  );
}
export default Footer;