import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
const CardContainer = styled.div`
    position: static;
    display: grid;
    height: auto;
    width: 25%;
    margin: 50px 20px;
    min-height: auto;
    background-color: ${theme.white};
    border-top-right-radius: 60px;
  border-bottom-left-radius: 60px;
    grid-template-rows: repeat(3, min-content) 1fr;
    grid-template-columns: 100%;
    color: ${theme.darkGray};
    place-items: center;
    margin-bottom: 50px;
    @media screen and (max-width: 700px) {
        margin-bottom: 1.5rem;
        width: 100%;
        margin: 50px 0;
    }
`;
const PhotoBox = styled.div`
  overflow: hidden;
  padding: 30px 0px;
  width: 100%;
  border-top-right-radius: 40px;
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
  border-top-right-radius: 60px;
`;
const Header = styled.span`
padding : 0 10px;
padding-bottom: 30px;
  font-size: 22px;
  width: 100% - 20px;
  
  text-align:center;
  @media screen and (max-width: 700px) {
        padding-bottom: 1.2rem;
        font-size: 1.3rem;
    }
`;
const Contents = styled.span`
  font-size: 16px;
  padding : 0 10px;
  padding-bottom: 30px;
  
  width: 100% - 20px;
  text-align:center;
  @media screen and (max-width: 700px) {
        padding-bottom: 1.2rem;
        font-size: 1rem;
    }
`;
interface Profile {
    photoPath: string;
    header: string;
    contents: string;
}
interface Item {
    item: Profile
}
function ImpactCard({ item }: Item) {
    return (
        <CardContainer>
            <PhotoBox>
                <Image src={item.photoPath} />
            </PhotoBox>
            <Header>
                {item.header}
            </Header>
            <Contents>
                {item.contents}
            </Contents>

        </CardContainer>
    )
}
export default ImpactCard