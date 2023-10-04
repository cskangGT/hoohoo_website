import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faPinterestP, faTiktok, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';

const Background = styled.footer`
    background-color: ${theme.darkGray};
    display: block;
    padding: 40px 0;
    @media (max-width: 1000px) {
      min-width: 600px;
    }
    @media screen and (max-width: 700px){
         min-width: 450px;
        }
        @media screen and (max-width: 500px){
         min-width: 380px;
        }
`;
const Container = styled.div`
    max-width: 980px;
    padding-left: 22px;
    padding-right: 22px;
    margin: 0 auto;
    @media screen and (max-width: 700px){
         
      }
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
  display: flex;
  position: relative;
  max-width: 1200px;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 800px) {
    flex-direction : column;
    justify-content: center;
    align-items: center;
  }
`;
const FooterTitle = styled.h3`
  color: #f1f1f1;
`;
const BusinessDetail = styled.p`
  font-size: 0.7rem;
  line-height: 24px;
  color: #f1f1f1;
`;
const RowBox = styled.div`
  display : flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  // margin-top: -10px;
  padding: 10px;
  padding-top: 25px;
  padding-bottom:0;
  padding-right: 0px;
  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
    align-content: center;
    text-align: center;
}
`;


const FooterButton = styled.a`
    font-size: 14px;
    padding: 2px 10px;
    background-color: transparent;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    color: ${theme.white};
    // margin-bottom: 3px;
    // margin-top: 4px;
    // margin: 2px 0;
    &:hover {
      background-color: #313131;
      color: ${theme.white};
        // color: ${theme.mainNeon};
    }
`;
const IconBox = styled.div`
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    margin-top: -5px;
    @media (max-width: 800px) {
      justify-content: center;
      
    }
`;
const IconButton = styled.a`
  text-align: center;
  width: 40px;
  height: 40px;
  &:hover {
    opacity: 0.7;
  }
`;
type Button = {
  text1: string;
  action1: () => void;
  text2: string;
  action2: () => void;
}
type IbuttonProps = {
  icon: any;
  url: string;
  style?: {};
}
type FooterProps = {
  isKorean: boolean;
}
function Buttons({ text1, action1, text2, action2 }: Button) {
  return (
    <Column>
      <FooterButton onClick={action1} style={{ marginTop: 11 }}>{text1}</FooterButton>
      <FooterButton onClick={action2} style={{ marginTop: 2 }}>{text2}</FooterButton>
    </Column>
  );
}
function Ibutton({ icon, url, style }: IbuttonProps) {
  return (
    <IconButton href={url} style={style} target="_blank">
      <FontAwesomeIcon icon={icon} size='xl' style={{ color: "#f1f1f1", paddingTop: 7 }} />
    </IconButton>
  )
}

function Footer({ isKorean }: FooterProps) {
  const navigate = useNavigate();
  return (
    <Background>
      <Container>
        <Box>
          {
            isKorean ? <Column>
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
            isKorean ? <RowBox>
              <Buttons text1="소개글" action1={() => navigate(`/about_team`)}
                text2="제휴" action2={() => navigate(`/partnership`)} />
              <Buttons text1="이용약관" action1={() => navigate('/term_of_use')}
                text2="개인정보처리방침" action2={() => navigate(`/privacy`)} />
            </RowBox> : <RowBox>
              <Buttons text1="About Us" action1={() => navigate(`/about_team`)}
                text2="Partnership" action2={() => navigate(`/partnership`)} />
              <Buttons text1="Terms of Use" action1={() => navigate('/term_of_use')}
                text2="Privacy Policy" action2={() => navigate(`/privacy`)} />
            </RowBox>
          }
        </Box>
        <FooterBottom>
          {/* <hr style={{ color: '#f1f1f1' }} /> */}
          {/* <Box style={{ justifyContent: 'space-between' }}> */}
          <BusinessDetail style={{ paddingLeft: 15 }}>Copyright&copy; 2023 by EarthMera, All rights reserved.</BusinessDetail>
          <IconBox>
            <Ibutton icon={faInstagram} url={'https://instagram.com/earthmera_?igshid=MzRlODBiNWFlZA=='} />
            <Ibutton icon={faLinkedinIn} url={'https://www.linkedin.com/company/earthmera/'} />
            <Ibutton icon={faPinterestP} url={'#'} />
            <Ibutton icon={faTiktok} url={'#'} />
            <Ibutton icon={faYoutube} url={'https://www.youtube.com/@Earthmera'} />
          </IconBox>
        </FooterBottom>
      </Container>
    </Background>
  );
}
export default Footer;