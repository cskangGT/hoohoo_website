import i18next from 'i18next';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import LinedHeader from '../../../Component/ContentBox/LinedHeader';
import {theme} from '../../../style';
import {ContentBox} from './Strength';

const ItemBox = styled.div`
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  grid-template-rows: 1fr 1fr 1fr;
  grid-column-gap: 20px;
  display: grid;
  @media screen and (max-width: 800px) {
    height: auto;
    grid-template-columns: auto;
    grid-column-gap: 20px;
  }
  @media screen and (max-width: 800px) {
    padding: 0 20px;
  }
`;

const EachBox = styled.div`
  padding: 35px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${theme.white};
  @media screen and (max-width: 800px) {
    width: 100%;
    padding: 20px;
    height: auto;
    margin-bottom: 30px;
    flex-direction: column;
  }
`;
const TitleContainer = styled.div`
  width: 40%;
  @media screen and (max-width: 800px) {
    width: 100%;
    align-items: center;
  }
`;
const ActName = styled.h3`
  font-size: 3rem;
  font-family: 'Fredoka';
  font-weight: 600;
  line-height: 1;
  margin-top: 30px;
  color: ${theme.mainNeon};
  margin-bottom: 30px;
  text-align: left;
  width: 100%;
  @media screen and (max-width: 800px) {
    text-align: center;
  }
`;
const ActDesc = styled.span`
  text-align: left;
  font-size: 1.5rem;
  width: 40%;
  @media screen and (max-width: 800px) {
    text-align: center;
    width: 100%;
  }
`;
type DataProps = {
  title: string;
  content: string;
};
export default function Mindset() {
  const data: any = i18next.t('mindset', {returnObjects: true});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <ContentBox>
      <LinedHeader
        data={{header: data.header}}
        color={theme.white}
        style={{
          fontSize: isMobile ? '3rem' : '4rem',
          width: '100%',
          textAlign: 'center',
        }}
      />
      <ItemBox>
        {data.items.map((item: DataProps, index: number) => (
          <EachBox key={item.title + index}>
            <TitleContainer>
              <ActName>{item.title}</ActName>
            </TitleContainer>
            <ActDesc dangerouslySetInnerHTML={{__html: item.content}} />
          </EachBox>
        ))}
      </ItemBox>
    </ContentBox>
  );
}
