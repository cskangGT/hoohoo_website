import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
const CardContainer = styled.div`
    position: static;
    display: grid;
    height: auto;
    width: 33%;
    min-height: auto;
    grid-template-rows: repeat(3, min-content) 1fr;
    grid-template-columns: 100%;
    color: ${theme.white};
    place-items: center;
    margin-bottom: 50px;
    @media screen and (max-width: 700px) {
        margin-bottom: 1.5rem;
    }
`;
const PhotoBox = styled.div`
  overflow: hidden;
  padding: 35px 50px;
  padding-bottom: 80px;
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
padding-bottom: 30px;
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
  padding-bottom: 30px;
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
    border: solid ${theme.mainNeon} 1px;
    border-radius: 20px;
    cursor: pointer!important;
  color: ${theme.mainNeon};
`;
interface Profile {
  photoPath: string;
  name: string;
  role: string;
}
interface Item {
  item: Profile
}

function ProfileCard({ item }: Item) {
  return (
    <CardContainer>
      <PhotoBox>
        <Image src={item.photoPath} />
      </PhotoBox>
      <Name>
        {item.name}
      </Name>
      <Role>
        {item.role}
      </Role>
      <ButtonBox>
        <Btn href='#'>Get in Touch</Btn>
      </ButtonBox>
    </CardContainer>
  )
}
export default ProfileCard