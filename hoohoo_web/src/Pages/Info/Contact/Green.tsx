import React from 'react';
import styled from 'styled-components';
import {Header} from '../../../components/ContentBox/TwoColBoxesSection';
import Wrapper from '../../../components/Wrapper/Wrapper';
import {theme} from '../../../style';
import {BackgroundImage} from '../../About/OurTeam/TeamIntro';
import {VerticalSection} from './IdealCustomer';
const SectionHeader = styled(Header)`
  text-align: center;
  line-height: 1.5;
  padding: 40px 0;
  font-size: 3rem;
  font-family: 'Fredoka';
`;
const SubHeader = styled(Header)`
  text-align: center;
  font-size: 3rem;
  padding: 20px;
`;
const Bg = styled(BackgroundImage)`
  height: 1000px;
  margin: 0;
  @media screen and (max-width: 700px) {
    height: auto;
  }
`;
const Button = styled.a`
  padding: 10px 20px;
  margin: 20px 0;
  text-decoration: none;
  font-size: 3rem;
  border-radius: 30px;
  overflow: hidden;
  color: ${theme.white};
  background-color: #122d08;
  @media screen and (max-width: 700px) {
    font-size: 2rem;
  }
`;
export default function Green() {
  const data = {
    bgImage: 'Images/greenBgImg.png',
    header: 'Green platform<br />Green users<br />Green products',
    subheader: " Let's make the Earth greener together.",
    button: 'Contact Us',
  };
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const emailAddress = 'support@earthmera.com';
    window.location.href = `mailto:${emailAddress}`;

    // 폴백(fallback) 처리
    setTimeout(() => {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`,
        '_blank',
      );
    }, 300);
  };
  return (
    <Bg image={data.bgImage}>
      <Wrapper>
        <VerticalSection>
          <SectionHeader>{data.header}</SectionHeader>
          <SubHeader>{data.subheader}</SubHeader>
          <Button onClick={handleEmailClick}>{data.button}</Button>
        </VerticalSection>
      </Wrapper>
    </Bg>
  );
}
