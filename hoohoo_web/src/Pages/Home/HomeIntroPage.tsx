import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import BackgroundWithStripe from '../../Component/ContentBox/BackgroundWithStripe';
import {Header} from '../../Component/ContentBox/TwoColBoxesSection';
import {theme} from '../../style';
import {PartnerButton} from '../LandingPage/LandingB2C';
const TitleHeader = styled(Header)`
  color: ${theme.white};
  font-size: 3rem;
  font-family: 'Fredoka';
  font-weight: 600;
  z-index: 11;
  width: 70%;
  padding: 15px 0;
  text-align: center;
  @media screen and (max-width: 1000px) {
    width: 80%;
    font-size: 2.5rem;
    margin-top: 20px;
  }
  @media screen and (max-width: 500px) {
    width: 90%;
    font-size: 2rem;
  }
`;

const Image = styled.img`
  height: 450px;
  padding: 10px 0;
  z-index: 11;
  object-fit: contain;
  @media screen and (max-width: 1000px) {
    width: 90%;
  }
  @media screen and (max-width: 500px) {
    width: auto;
    height: 500px;
  }
`;

const SignUpText = styled.p`
  color: black;
  font-size: 20px;
  z-index: 11;
  font-family: 'Fredoka';
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  margin-bottom: 50px;
  @media screen and (max-width: 800px) {
    width: 80%;
    padding-bottom: 30px;
  }
`;
export const HomeTransitionButton = styled(PartnerButton)`
  font-family: 'Yanolga Yachae';
  font-weight: 600;
  background-color: #00bf63;
  color: white;
  /* height: 60px; */
  width: auto;
  align-items: center;
  justify-content: center;
  line-height: 1;
  text-align: center;
  padding: 15px 30px;
  /* @media screen and (max-width: 1200px){
      width: 300px;
    }
    @media screen and (max-width: 1000px){
      width: 300px;
    } */
`;
export default function HomeIntroPage() {
  const navigate = useNavigate();
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  function handleButton() {
    navigate('/submitform');
  }
  useEffect(() => {
    console.log('window.innerWidth', window.innerWidth);
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 800);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const data = {
    bgImage: 'Images/homebg1.jpeg',
    title: 'Every eco action in your daily life,<br />rewarding time!',
    image: 'Images/home1Image.png',
    topImage: 'Images/home1top.png',
    botImage: 'Images/home1bot.png',
    phoneImage: 'Images/home1ImageSmall.png',
    contentText: 'Sign up now, earn $5',
    buttonText: 'Go to sign up',
  };
  return (
    <BackgroundWithStripe backgroundImage={data.bgImage}>
      <TitleHeader dangerouslySetInnerHTML={{__html: data.title}} />
      {isLargeScreen ? (
        <Image src={data.image} />
      ) : (
        <Image src={data.phoneImage} />
      )}
      <SignUpText>{data.contentText}</SignUpText>
      <ButtonBox>
        <HomeTransitionButton onClick={handleButton}>
          {data.buttonText}
        </HomeTransitionButton>
      </ButtonBox>
    </BackgroundWithStripe>
  );
}
