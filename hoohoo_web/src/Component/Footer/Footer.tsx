import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {theme} from '../../style';

import {
  faInstagram,
  faLinkedinIn,
  faPinterestP,
  faTiktok,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import i18next from 'i18next';
import {useNavigate} from 'react-router-dom';
import ManageAccModal from '../../Pages/DeleteAccount/ManageAccModal';

const Background = styled.footer`
  background-color: transparent;
  display: block;
  padding: 40px 0;
  @media (max-width: 1000px) {
    min-width: 600px;
  }
  @media screen and (max-width: 700px) {
    min-width: auto;
  }
`;
const Container = styled.div`
  max-width: 980px;
  display: block;
  padding: 0 22px;
  margin: 0 auto;
  @media screen and (max-width: 700px) {
    margin: 0 0;
    padding: 0 10px;
    width: calc(100% - 20px);
  }
`;
const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
  }
`;
const HeaderColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  @media (max-width: 800px) {
    padding: 0px 15px;
    width: calc(100% - 40px);
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  
`;
const FooterBottom = styled.div`
  padding: 10px 0;
  display: flex;
  position: relative;
  max-width: 1200px;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 800px) {
    flex-direction: column;
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
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  padding: 10px;
  padding-top: 25px;
  padding-bottom: 0;
  padding-right: 10px;
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
};
type IbuttonProps = {
  icon: any;
  url?: string;
  style?: {};
};
function Buttons({text1, action1, text2, action2}: Button) {
  return (
    <Column>
      <FooterButton onClick={action1} style={{marginTop: 11}}>
        {text1}
      </FooterButton>
      <FooterButton onClick={action2} style={{marginTop: 2}}>
        {text2}
      </FooterButton>
    </Column>
  );
}
function Ibutton({icon, url, style}: IbuttonProps) {
  return (
    <IconButton href={url} style={style} target="_blank">
      <FontAwesomeIcon
        icon={icon}
        size="xl"
        style={{color: theme.darkGray, paddingTop: 7}}
      />
    </IconButton>
  );
}

function Footer() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const data: any = i18next.t('Footer', {returnObjects: true});
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('modal') === 'open') {
      setIsOpen(true);
    } else if (searchParams.get('support') === 'yes') {
      navigate('/support');
    }
  }, [location.search]);
  return (
    <Background>
      <Container>
        <Box>
          <HeaderColumn>
            <FooterTitle>{data.title}</FooterTitle>
            <BusinessDetail>
              {' '}
              {data.ceo}
              <br /> {data.email} : devceohoony@gmail.com
            </BusinessDetail>
          </HeaderColumn>

          <RowBox>
            <Buttons
              text1={data.menuButtons.about}
              action1={() => navigate(`/about_team`)}
              text2={data.menuButtons.partnership}
              action2={() => navigate(`/partnership`)}
            />
            <Buttons
              text1={data.menuButtons.terms}
              action1={() => navigate('/terms_of_use')}
              text2={data.menuButtons.privacy}
              action2={() => navigate(`/privacy`)}
            />
            <Buttons
              text1={data.menuButtons.manage}
              action1={() => setIsOpen(true)}
              text2=""
              action2={() => {}}
            />
          </RowBox>
        </Box>
        <FooterBottom>
          <BusinessDetail style={{paddingLeft: 15}}>
            Copyright&copy; 2024 EarthMera. All rights reserved.
          </BusinessDetail>
          <IconBox>
            <Ibutton
              icon={faInstagram}
              url={
                'https://www.instagram.com/earthmera_global?igsh=YXRicWw5dzd4eDVy&utm_source=qr'
              }
            />
            <Ibutton
              icon={faLinkedinIn}
              url={'https://www.linkedin.com/company/earthmera/'}
            />
            <Ibutton icon={faTiktok}
              url={'https://www.tiktok.com/@earthmera_global'} />
            <Ibutton
              icon={faYoutube}
              url={'https://www.youtube.com/@Earthmera'}
            />
          </IconBox>
        </FooterBottom>
      </Container>
      <ManageAccModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </Background>
  );
}
export default Footer;
