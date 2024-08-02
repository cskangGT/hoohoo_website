import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faPinterestP, faTiktok, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';

const Background = styled.footer`
    background-color: transparent;
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
    padding: 0 22px;
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
  color: ${theme.darkGray};
`;
const BusinessDetail = styled.p`
  font-size: 1rem;
  line-height: 24px;
  color: ${theme.darkGray};
`;
const RowBox = styled.div`
  display : flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
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
    color: ${theme.darkGray};
    &:hover {
      color: ${theme.darkGray};
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
  url?: string;
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
      <FontAwesomeIcon icon={icon} size='xl' style={{ color: theme.darkGray, paddingTop: 7 }} />
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
              <FooterTitle>어스메라(EarthMera)</FooterTitle>
              <BusinessDetail> 대표이사 : Sung Kang
                <br /> 이메일 : devceohoony@gmail.com
              </BusinessDetail>
            </Column> : <Column>
              <FooterTitle>EarthMera</FooterTitle>
              <BusinessDetail> CEO : Sung Kang
                <br /> Email : devceohoony@gmail.com
              </BusinessDetail>
            </Column>
          }
          {
            isKorean ? <RowBox>
              <Buttons text1="팀 어스메라" action1={() => navigate(`/about_team`)}
                text2="제휴" action2={() => navigate(`/partnership`)} />
              <Buttons text1="이용약관" action1={() => navigate('/terms_of_use')}
                text2="개인정보처리방침" action2={() => navigate(`/privacy`)} />
            </RowBox> : <RowBox>
              <Buttons text1="About Us" action1={() => navigate(`/about_team`)}
                text2="Partnership" action2={() => navigate(`/partnership`)} />
              <Buttons text1="Terms of Use" action1={() => navigate('/terms_of_use')}
                text2="Privacy Policy" action2={() => navigate(`/privacy`)} />
            </RowBox>
          }
        </Box>
        <FooterBottom>
          <BusinessDetail style={{ paddingLeft: 15 }}>Copyright&copy; 2024 EarthMera. All rights reserved.</BusinessDetail>
          <IconBox>
            <Ibutton icon={faInstagram} url={'https://www.instagram.com/earthmera_global?igsh=YXRicWw5dzd4eDVy&utm_source=qr'} />
            <Ibutton icon={faLinkedinIn} url={'https://www.linkedin.com/company/earthmera/'} />
            <Ibutton icon={faPinterestP} style={{ opacity: 1 }} />
            <Ibutton icon={faTiktok} style={{ opacity: 1 }} />
            <Ibutton icon={faYoutube} url={'https://www.youtube.com/@Earthmera'} />
          </IconBox>
        </FooterBottom>
      </Container>
    </Background>
  );
}
export default Footer;