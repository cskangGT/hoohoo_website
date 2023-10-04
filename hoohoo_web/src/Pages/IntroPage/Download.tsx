import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style';

const Container = styled.div<DownloadProps>`
    margin-top: 0px;
    display: flex;
    justify-content: flex-start;
    height: 420px;
    border-radius: 40px;
    background: linear-gradient(299deg, rgba(60, 214, 238, 0.44) 0%, ${props => (props.dropb ? '#1e1e1e' : '#93FF3F')} 100%);
    border-radius: 20px;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
    overflow: hidden;
    margin-bottom: 58px;
    @media screen and (max-width: 1100px) {
        width: 80%;
        height: 630px;
    }
    @media screen and (max-width: 730px) {
        height: 700px;
    }
    @media screen and (max-width: 500px) {
      height: ${props => (props.dropb ? '400px' : '530px')};
    }
`;
const ContentBox = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    justify-content: center;
`;
const ImageBox = styled.div`
  padding-top: 30px;
`;

const Image = styled.img<DownloadProps>`
  width: ${props => (props.dropb ? '280px' : '220px')};
  position: absolute;
  left: ${props => (props.dropb ? '50px' : '70px')};
  // transform: rotate(-15deg);
  @media screen and (max-width: 1100px) {
    width: 200px;
    bottom: -6%;
    left: 30%;
  }
  @media screen and (max-width: 700px) {
      left: 15%;
      width: 150px;
      bottom: -20px;
    }
`;
const SecondImage = styled.img<DownloadProps>`
  width: ${props => (props.dropb ? '270px' : '215px')};
  position: absolute;
  height: auto;
  left:200px;
  transform: rotate(15deg);
  @media screen and (max-width: 1100px) {
    width: 200px;
    top: auto;
    left: 44%;
    bottom: -7%;
}
@media screen and (max-width: 700px) {
      left:auto;
      right: 10%;
      width: 150px;
      bottom: -20px;
    }
`;
const RightBox = styled.div`
  margin: 70px 22px 92px 530px;
  width: 100%;
  @media screen and (max-width: 1100px) {
    margin: 35px 16px -10px;
    padding: 24px 21px 380px;
}
@media screen and (max-width: 500px) {
    margin: 35px 0px -10px;
    padding: 10px 21px 380px;
}

`;
const Header = styled.h1`
  color: ${theme.white};
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 1.2;
  margin-bottom: 22px;
  padding: 0px;
  text-align: left;
  @media screen and (max-width: 1100px) {
      margin: 0 10%;
      margin-bottom: 20px;
    text-align:center;
  }
  @media screen and (max-width: 500px) {
      margin: 0;
      font-size: 1.5rem;
    }
`;
const SubHeader = styled.h3`
  color: ${theme.white};
  font-weight: 300;
  font-size: 1.6rem;
  line-height: 1.2;
  margin-bottom: 36px;
  padding: 0px;
  text-align: left;
  @media screen and (max-width: 1100px) {
      margin: 0 10%;
      margin-bottom: 20px;
    text-align:center;
}
@media screen and (max-width: 500px) {
    margin : 10px 10px;
      font-size: 1.3rem;
    }
`;
const BannerBtnContainer = styled.div`
  display:flex;
  box-sizing: inherit;
  width: 100%;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 730px) {
    flex-direction: column;
}
@media screen and (max-width: 500px) {
      flex-direction: row;
    }
`;
const BannerBtn = styled.a`
    text-decoration: none;
    color: ${theme.white};
    margin-right:14px;
    display: flex;
    width: 242px;
    border-radius: 20px;
    flex: 0 0 auto;
    position: relative;
    transition: all 0.3s ease 0s;
    @media screen and (max-width: 730px) {
    margin-top: 7px;
    }
    @media screen and (max-width: 500px) {
      width: 45%;
    }
`;
const Img = styled.img`
  width: 100%;
`;
interface DownloadProps {
  dropb: boolean | undefined;
}
function Download({ dropb }: DownloadProps) {
  const image = dropb ? "Images/preview1.png" : "Images/preview.png";
  return (
    <Container dropb={dropb}>
      <ContentBox>
        <ImageBox>
          <SecondImage src={image} dropb={dropb} />
          <Image src={image} dropb={dropb} />
        </ImageBox>
        <RightBox>
          <Header>
            {dropb ? "Download DropB App" : "Download the EarthMera App"}
          </Header>
          <SubHeader>
            {dropb ? "Record tags for your day!" : "Make a change with one tap in EarthMera!"}
          </SubHeader>
          <BannerBtnContainer>
            <BannerBtn href='/coming_soon'>
              <Img src={'Images/appstore.svg'}></Img>
            </BannerBtn>
            <BannerBtn href='/coming_soon'>
              <Img src={'Images/googleplay.svg'}></Img>
            </BannerBtn>
          </BannerBtnContainer>
        </RightBox>
      </ContentBox>
    </Container>
  )
}
export default Download;