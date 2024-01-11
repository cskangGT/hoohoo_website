import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
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
const IconButton = styled.a`
  text-align: center;
  width: 40px;
  height: 40px;
  &:hover {
    opacity: 0.7;
  }
`;
interface Profile {
  photoPath: string;
  name: string;
  role: string;
  contact: string;
  url: string;
}
type IbuttonProps = {
  icon: any;
  url?: string;
  style?: {};
}
interface Item {
  item: Profile
}

function Ibutton({ icon, url, style }: IbuttonProps) {
  return (
    <IconButton href={url} style={style} target="_blank">
      <FontAwesomeIcon icon={icon} size='xl' style={{ color: '#0077B5', paddingTop: 7 }} />
    </IconButton>
  )
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
      <Ibutton icon={faLinkedin} url={item.url} />
    </CardContainer>
  )
}
export default ProfileCard