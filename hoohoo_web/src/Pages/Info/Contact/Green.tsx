import React from 'react'
import styled from 'styled-components';
import { Container, Header } from '../../../Component/ContentBox/TwoColBoxesSection';
import Wrapper from '../../../Component/Wrapper/Wrapper';
import { VerticalSection } from './IdealCustomer';
import { BackgroundImage } from '../../About/OurTeam/TeamIntro';
import { theme } from '../../../style';
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
const Button = styled.button`
  padding: 10px 20px;
  margin: 20px 0;
  text-decoration: none;
  font-size: 3rem;
  border-radius: 30px;
  overflow: hidden;
  color: ${theme.white};
  background-color: #122D08;
  @media screen and (max-width: 700px) {
        font-size: 2rem;
    }
`;
export default function Green() {
    const data ={
        "bgImage": "Images/greenBgImg.png",
        "header" : "Green platform<br />Green users<br />Green products",
        "subheader": " Let's make the Earth greener together.",
        "button": "Contact Us"
    }
  return (
    <Bg image={data.bgImage}>
        <Wrapper>
            <VerticalSection>
            <SectionHeader dangerouslySetInnerHTML={{__html:data.header}} />
                <SubHeader>
                    {data.subheader}
                </SubHeader>
                <Button onClick={()=> window.location.href = "mailto:devceohoony@gmail.com"}>{data.button}</Button>
            </VerticalSection>
        </Wrapper>
    </Bg>
  )
}