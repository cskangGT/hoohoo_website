import i18next from 'i18next';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {theme} from '../../../style';

const Container = styled.div`
  width: calc(100% - 30px);
  display: flex;
  margin: 0px auto;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  transition: all 0.2s ease 0s;
  padding: 2rem 15px;
  @media screen and (max-width: 600px) {
    margin-top: 0px;
    flex-direction: column;
  }
`;
const ImageBox = styled.div`
  width: 35%;
  padding: 0 30px;
  @media screen and (max-width: 600px) {
    width: 70%;
    padding-bottom: 30px;
  }
`;
const Image = styled.img`
  width: 100%;
`;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 65%;
  justify-content: center;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const HorizonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const Header = styled.h2<{bot?: boolean}>`
  font-size: ${props => (props.bot ? '2rem' : '3rem')};
  line-height: 1.3;
  text-align: center;
  width: 100%;
  color: ${theme.darkGray};
  @media screen and (max-width: 600px) {
    font-size: ${props => (props.bot ? '1rem' : '2rem')};
  }
`;

interface DataProps {
  header: string;
  image: string;
  content: string;
}
const GrowingNumber = styled.span`
  font-size: 6rem;
  font-weight: bold;
`;
function Realtime() {
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const data: DataProps = i18next.t('realtime', {returnObjects: true});

  return (
    <Container>
      <ImageBox>
        <Image src={data.image} />
      </ImageBox>
      <ContentBox>
        <HorizonContainer>
          <Header>{data.header}</Header>
          <GrowingNumber>{count.toLocaleString()}</GrowingNumber>
          <Header bot={true}>{data.content}</Header>
        </HorizonContainer>
      </ContentBox>
    </Container>
  );
}
export default Realtime;
