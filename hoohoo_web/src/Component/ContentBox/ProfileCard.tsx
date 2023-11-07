import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../style';
const slideInFromTop = keyframes`
  from {
    transform: translateY(-20%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;
const CardContainer = styled.div`
    position: static;
    display: grid;
    height: auto;
    width: 33%;
    min-height: auto;
    grid-template-rows: repeat(3, min-content) 1fr;
    grid-template-columns: 100%;
    color: ${theme.darkGray};
    place-items: center;
    margin-bottom: 50px;
    animation: ${slideInFromTop} 1.3s ease-out forwards;
    @media screen and (max-width: 700px) {
        margin-bottom: 1.5rem;
    }
`;
const PhotoBox = styled.div`
  overflow: hidden;
  padding: 35px 50px;
  padding-bottom: 50px;
  width: 220px;
  display: flex; 
  justify-content: center;
  @media screen and (max-width: 700px) {
        padding-bottom: 1.2rem;
        padding-top: 1.5rem;
    }
`;
const Image = styled.img`
  width: 220px;
  height: 220px;
  object-fit: cover;
  object-position: 50% 50%;
  border-radius: 50%;
  aspect-ratio: auto 220 / 220;
`;
const Name = styled.span`
padding-bottom: 20px;
  font-size: 22px;
  width: 100%;
  text-align:center;
  @media screen and (max-width: 700px) {
        padding-bottom: 1.2rem;
        font-size: 1.3rem;
    }
`;
const Role = styled.span`
  font-size: 16px;
  width: 100%;
  text-align:center;
  @media screen and (max-width: 700px) {
        padding-bottom: 1.2rem;
        font-size: 1rem;
    }
`;
const ButtonBox = styled.div`
  width: 100%;
  display:flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
  @media screen and (max-width: 700px) {
        /* padding-bottom: 1.2rem; */
        font-size: 0.8rem;
    }
`;
const Btn = styled.a`
  text-decoration: none;
  padding: 10px 12px;
  background-color: transparent;
    border: solid ${theme.darkGray} 1px;
    border-radius: 20px;
    cursor: pointer!important;
  color: ${theme.darkGray};
`;
interface Profile {
  photoPath: string;
  name: string;
  role: string;
  contact: string;
}
interface Item {
  item: Profile
}

function ProfileCard({ item }: Item) {
  const roleHtml = item.role.split('<br />').map((line, index) => (
    // 각 줄을 div 또는 span으로 감싸고, 필요한 경우 <br />를 추가합니다.
    <React.Fragment key={index}>
      {line}
      {index < item.role.split('<br />').length - 1 && <br />}
    </React.Fragment>
  ));
  return (
    <CardContainer>
      <PhotoBox>
        <Image src={item.photoPath} />
      </PhotoBox>
      <Name>
        {item.name}
      </Name>
      <Role>{roleHtml}</Role>
      
    </CardContainer>
  )
}
export default ProfileCard