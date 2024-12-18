import i18next from 'i18next';
import moment from 'moment-timezone';
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Wrapper from '../../Component/Wrapper/Wrapper';
import {theme} from '../../style';
import ManageAccModal from '../DeleteAccount/ManageAccModal';
import { androidAppStoreLink, iosAppStoreLink } from './Download';

const targetDate = moment.tz('2024-12-22 00:00', 'America/New_York');
const Container = styled.div`
  text-align: center;
  height: 100%;
`;
const BackgroundContainer = styled.div`
  background: url('Images/countBackground.jpeg') center top / cover no-repeat; // 여기에 배경 이미지 경로를 입력하세요
  background-size: cover;
  background-position: center;

  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;

  flex-direction: column;
`;
const StartingSoonText = styled.h2``;
const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70vh;
  justify-content: center;
  align-items: center;
  row-gap: 1.6rem;
`;
const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 3rem;
  text-transform: uppercase;
  letter-spacing: 0.5rem;
  font-family: 'Fredoka';
  font-weight: 700;
  margin-top: 2rem;
  @media screen and (max-width: 1200px) {
    font-size: 3rem;
  }
  @media screen and (max-width: 1000px) {
    font-size: 2.6rem;
  }
  @media screen and (max-width: 800px) {
    font-size: 2.5rem;
  }
`;
const TimeDisplay = styled.div`
  font-size: 2rem;
  display: flex;
  justify-content: center;
  column-gap: 4rem;
  @media screen and (max-width: 1200px) {
    column-gap: 2.6rem;
  }
  @media screen and (max-width: 1000px) {
    column-gap: 2.4rem;
  }
  @media screen and (max-width: 800px) {
    column-gap: 2.2rem;
  }
`;

const TimeUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TimeText = styled.div`
  display: flex;
  justify-content: center;
`;

const TimeChar = styled.span<{isLast: boolean}>`
  font-size: 2.8rem;
  text-transform: uppercase;
  font-family: 'Fredoka';
  margin-top: 0.5rem;
  color: #ffffff;
  font-weight: 500;
  align-items: center;
  text-align: center;
  ${({isLast}) => !isLast && 'margin-right: 0.5rem;'}
  @media screen and (max-width: 1200px) {
    font-size: 2.6rem;
  }
  @media screen and (max-width: 1000px) {
    font-size: 2.4rem;
  }
  @media screen and (max-width: 800px) {
    font-size: 2.2rem;
  }
`;
// const TimeText = styled.p`
//    font-size: 2.8rem;
//     text-transform: uppercase;
//     letter-spacing: 0.5rem;
//     font-family: 'Fredoka';
//     margin-top: 0.5rem;
//     column-gap: 0.5rem;
//     color: #ffffff;
//     font-weight: 500;
//     align-items: center;
//     text-align: center;
//     width: 100%;
//     margin-bottom: 0.3rem;
//     @media screen and (max-width: 1200px) {
//     font-size: 2.6rem;
//   }
//   @media screen and (max-width: 1000px) {
//     font-size: 2.4rem;
//   }
//   @media screen and (max-width: 800px) {
//     font-size: 2.2rem;
//   }

// `;
const UnitText = styled.p`
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-family: 'Fredoka';
  margin-top: 0rem;
  color: #ffffffd1;
  font-weight: 300;
  @media screen and (max-width: 1200px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 1000px) {
    font-size: 0.9rem;
  }
  @media screen and (max-width: 800px) {
    font-size: 0.8rem;
  }
`;
const SmallText = styled.p`
  font-size: 1rem;
  margin-top: 30px;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-family: 'Fredoka';
  margin-top: 2rem;
  color: #ffffffba;
  font-weight: 400;
  width: 60%;
`;

const LogoText = styled.span`
  padding-left: 10px;
  font-family: Fredoka;
  color: ${theme.white};
  font-size: 1.5rem;
`;
const HeaderLogo = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;
const LogoContainer = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;
const BannerBtnContainer = styled.div`
  display:flex;
  box-sizing: inherit;
  width: 100%;
  gap: 10px;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;
const BannerBtn = styled.a`
    text-decoration: none;
    color: ${theme.white};
    margin-right:14px;
    display: flex;
    width: 200px;
    border-radius: 20px;
    flex: 0 0 auto;
    position: relative;
    transition: all 0.3s ease 0s;
    @media screen and (max-width: 1200px) {
    margin-top: 7px;
    width: 180px;
    }
    @media screen and (max-width: 500px) {
      margin: 0;
      width: 100%;
    }
`;
const Img = styled.img`
  width: 100%;
`;
const Logo = styled.div`
  padding: 10px;
  padding-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  height: 8vh;
  padding-top: 1.5rem;
  @media screen and (max-width: 1000px) {
    justify-content: center;
  }
`;
const Countdown: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const calculateTimeLeft = () => {
    const now = moment.tz('America/New_York');
    const difference = targetDate.diff(now);

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };
  const formatTime = (time: number) => {
    return String(time).padStart(2, '0');
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const renderTimeText = (text: string) => {
    return (
      <TimeText>
        {text.split('').map((char, index) => (
          <TimeChar key={index} isLast={index === text.length - 1}>
            {char}
          </TimeChar>
        ))}
        </TimeText>
      );
    };
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      if (searchParams.get('modal') === 'open') {
        setIsOpen(true);
      } else if (searchParams.get('support') === 'yes') {
        navigate('/support');
      }
    }, [location.search]);
    useEffect(() => {
      const hash = decodeURIComponent(location.hash.replace('#', ''));
      if (hash) {
        // const [pageWithHash, query] = hash.split('?');
    // const page = pageWithHash.split('#')[0]; // 페이지 이름 추출
        // const params = new URLSearchParams(query);
        const [page, query] = hash.split('#?');
        const params = new URLSearchParams(query);
        const link = params.toString();

        

      
        if (link) {

          navigate(`/${page}?${link}`);
        } else {
          navigate(`/${page}`);
        }
      }
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
  
      return () => clearInterval(timer);
    }, []);
    const data = i18next.t('Nav', { returnObjects: true })
    const downloadLang = i18next.t('download', { returnObjects: true })
    
    const logo: any = data["logo"]
    return (
        <BackgroundContainer>
        <Wrapper>
      <Container>
      <Logo>
            <HeaderLogo key="logo" src={logo.image} />
            <LogoText key="earthmera">{logo.text}</LogoText>
        </Logo>
        <BodyContainer>
        <Title>Green Journey Begins in</Title>
        <TimeDisplay>
          <TimeUnit style={{paddingLeft: 5}}>
          {renderTimeText(formatTime(timeLeft.days))}
            <UnitText>{timeLeft.days > 1 ? 'DAYS':'DAY'}</UnitText>
          </TimeUnit>
          <TimeUnit>
          {renderTimeText(formatTime(timeLeft.hours))}
            <UnitText>{timeLeft.hours > 1 ? 'HOURS':'HOUR'}</UnitText>
          </TimeUnit>
          <TimeUnit>
          {renderTimeText(formatTime(timeLeft.minutes))}
            <UnitText>{timeLeft.minutes > 1 ? 'MINUTES':'MINUTE'}</UnitText>
          </TimeUnit>
          <TimeUnit>
          {renderTimeText(formatTime(timeLeft.seconds))}
            <UnitText>{timeLeft.seconds > 1 ? 'SECONDS':'SECOND'}</UnitText>
          </TimeUnit>
        </TimeDisplay>
        <SmallText>Small changes spark big waves earth</SmallText>
        {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0&& timeLeft.seconds === 0&&<BannerBtnContainer>
            <BannerBtn href={iosAppStoreLink}>
              <Img src={downloadLang["storeImage"]["appstore"]}></Img>
            </BannerBtn>
            <BannerBtn href={androidAppStoreLink}>
              <Img src={downloadLang["storeImage"]["googleplay"]}></Img>
            </BannerBtn>
          </BannerBtnContainer>}
        </BodyContainer>
        <LogoContainer>
        
        </LogoContainer>
      </Container>
      </Wrapper>
      <ManageAccModal isOpen={isOpen} setIsOpen={setIsOpen}  />
      </BackgroundContainer>
      
    );
  };
export default Countdown;
