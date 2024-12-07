import i18next from 'i18next';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { theme } from '../../../../style';
import { getUserCount } from '../../../../api/userCount';
const Background = styled.div<{backgroundImage: string}>`
  width: 100%;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
  flex-direction: column;
  display: flex;
  height: auto;
  justify-content: center;
  border-radius: 20px;
  align-items: center;
  overflow: hidden;
  z-index: 1;
  padding-top: 75px;
  padding-bottom: 100px;
  margin-bottom: 100px;
  @media screen and (max-width: 850px) {
    margin-top: 90px;
  }
  @media screen and (max-width: 400px) {
    border-radius: 0px;
  }
`;
const Header = styled.h1`
  width: calc(100% -20px);
  font-size: 3rem;
  z-index: 2;
  color: ${theme.white};
  font-family: Fredoka;
  font-weight: 600;
  padding: 0px 10px;
  text-align: center;
  @media screen and (max-width: 1200px) {
    font-size: 2.5rem;
  }
  @media screen and (max-width: 1000px) {
    font-size: 2.3rem;
  }
  @media screen and (max-width: 800px) {
    font-size: 2.1rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.8rem;
  }
  @media screen and (max-width: 400px) {
    font-size: 1.8rem;
  }
`;
const ContentText = styled.p`
  color: ${theme.white};
  width: calc(100% - 20px);
  font-size: 2rem;
  padding: 0px 10px;
  z-index: 2;
  line-height: 1.5;
  text-align: center;
  @media screen and (max-width: 1200px) {
    font-size: 1.8rem;
  }
  @media screen and (max-width: 1000px) {
    font-size: 1.6rem;
  }
  @media screen and (max-width: 800px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.4rem;
    width: 80%;
  }
  @media screen and (max-width: 400px) {
    font-size: 1.4rem;
  }
`;
const IconRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 2;
  column-gap: 20px;
  @media screen and (max-width: 600px) {
    column-gap: 10px;
  }
  @media screen and (max-width: 400px) {
    column-gap: 10px;
  }
`;
const IconImage = styled.img`
  width: 50px;
  height: 50px;
  z-index: 2;
  @media screen and (max-width: 600px) {
    width: 40px;
    height: 40px;
  }
  @media screen and (max-width: 400px) {
    width: 30px;
    height: 30px;
  }
`;
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
  position: absolute;
  z-index: 0;
  top: 0px;
  left: 0px;
`;
const CountText = styled.p`
  color: ${theme.white};
  width: calc(100% - 20px);
  font-size: 3rem;
  padding: 0px 10px;
  z-index: 2;
  margin: 0px;
  line-height: 1.5;
  font-family: Fredoka;
  @media screen and (max-width: 1200px) {
    font-size: 2.5rem;
  }
  @media screen and (max-width: 1000px) {
    font-size: 2.3rem;
  }
  @media screen and (max-width: 800px) {
    font-size: 2.1rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 2rem;
  }
  @media screen and (max-width: 400px) {
    font-size: 2rem;
  }
`;
function formatCount (num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function ValueUserCount() {
    const [userCount, setUserCount] = useState<number>(1231415);
    const data: any = i18next.t('ValueUserCount', {returnObjects: true});
    useEffect(()=> {
        const fetchUserCount = async () => {
            const response = await getUserCount();
            if (response.result) {
                setUserCount(response?.data?.userCount);
            }
        }
        fetchUserCount();
    }, [])
  return (
    <Background backgroundImage={data.bgImage}>
      <Overlay></Overlay>
        <Header>
            {data.title}
        </Header>
        <IconRow>
            <IconImage src={data.userIcon} />
            <CountText>{formatCount(userCount)}</CountText>
        </IconRow>
        <ContentText>
            {data.content}
        </ContentText>
    </Background>
  )
}

export default ValueUserCount