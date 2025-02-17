import React from 'react';
import styled from 'styled-components';
import { Header } from '../../../components/ContentBox/TwoColBoxesSection';
import Wrapper from '../../../components/Wrapper/Wrapper';
import { theme } from '../../../style';
import { BackgroundImage } from '../../About/OurTeam/TeamIntro';
import { VerticalSection } from './IdealCustomer';
const SectionHeader = styled(Header)`
  text-align: center;
  line-height: 1.5;
  padding: 40px 0;
  font-size: 2.5rem;
  font-family: 'Fredoka';
`;
const SubHeader = styled(Header)`
  text-align: center;
  font-size: 1.4rem;
  padding: 20px;
`;
const Bg = styled(BackgroundImage)`
  height: 900px;
  margin: 0;
  @media screen and (max-width: 700px) {
    height: auto;
  }
`;
const Button = styled.a`
  padding: 10px 20px;
  margin: 20px 0;
  text-decoration: none;
  font-size: 2rem;
  border-radius: 30px;
  overflow: hidden;
  color: ${theme.white};
  background-color: #122d08;
  @media screen and (max-width: 700px) {
    font-size: 2rem;
  }
`;
export default function Support() {
  const data = {
    bgImage: 'Images/greenBgImg.png',
    header: "Need Help?<br />Have Questions?<br />We're Here for You",
    subheader:
      "Your feedback and questions are important to us.<br />You can also email us directly at <a href='mailto:support@earthmera.com'>support@earthmera.com</a>.",
    button: 'Contact Support',
  };
  return (
    <Bg image={data.bgImage}>
      <Wrapper>
        <VerticalSection>
          <SectionHeader dangerouslySetInnerHTML={{__html: data.header}} />
          <SubHeader dangerouslySetInnerHTML={{__html: data.subheader}} />
          <Button href={'mailto:support@earthmera.com?subject=Support'}>
            {data.button}
          </Button>
        </VerticalSection>
      </Wrapper>
    </Bg>
  );
}
