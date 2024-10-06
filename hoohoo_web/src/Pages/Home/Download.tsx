import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
import i18next from 'i18next';
export const iosAppStoreLink = 'https://apps.apple.com/app/earthmera/id6560118091';
export const androidAppStoreLink = 'https://play.google.com/store/apps/details?id=com.earthmera';
const Container = styled.div<DownloadProps>`
    margin-top: 0px;
    display: flex;
    justify-content: flex-start;
    height: ${props => (props.dropb ? 480 : 350)}px;
    width: ${props => (props.dropb ? 'auto' : '80%')};
    border-radius: 40px;
    background: linear-gradient(299deg, rgba(60, 214, 238, 0.44) 0%, ${props => (props.dropb ? '#1e1e1e' : '#93FF3F')} 100%);
    border-radius: 20px;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
    overflow: hidden;
    margin-bottom: 58px;
    @media screen and (max-width: 1200px) {
        width: 80%;
        height: 630px;
    }
    @media screen and (max-width: 730px) {
        height: 700px;
    }
    @media screen and (max-width: 500px) {
      height: auto;
      /* height: ${props => (props.dropb ? '530px' : '530px')}; */
    }
`;
const ContentBox = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    justify-content: center;
    @media screen and (max-width: 1200px) {
      padding:10px;
      flex-direction: column;
    }
`;
const ImageBox = styled.div<DownloadProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: ${props => (props.dropb ? 'auto' : '45%')};
  @media screen and (max-width: 1200px) {
      width: 100%;
    }
`;
const RightBox2 = styled.div`
  width: 55%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media screen and (max-width: 1200px) {
    width: 100%;
}
`;
const Image = styled.img<DownloadProps>`
  width: ${props => (props.dropb ? '280px' : '220px')};
  position:${props => (props.dropb ? 'absolute' : 'relative')};
  left: ${props => (props.dropb ? '50px' : '70px')};
  // transform: rotate(-15deg);
  @media screen and (max-width: 1200px) {
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
const EarthMeraImg = styled.img`
  height: 300px;
`;
const SecondImage = styled.img<DownloadProps>`
  width: ${props => (props.dropb ? '270px' : '215px')};
  position: absolute;
  height: auto;
  left:200px;
  transform: rotate(15deg);
  @media screen and (max-width: 1200px) {
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
  @media screen and (max-width: 1200px) {
    margin: 35px 16px -10px;
    padding: 24px 21px 380px;
}
@media screen and (max-width: 500px) {
    margin: 35px 0px -10px;
    padding: 10px 21px 380px;
}

`;
const Header = styled.h1`
  color: ${theme.darkGray};
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 1.2;
  margin-bottom: 22px;
  padding: 0px;
  text-align: left;
  @media screen and (max-width: 1200px) {
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
  color: ${theme.darkGray};
  font-weight: 300;
  font-size: 1.6rem;
  line-height: 1.2;
  margin-bottom: 36px;
  padding: 0px;
  text-align: left;
  @media screen and (max-width: 1200px) {
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
    width: 242px;
    border-radius: 20px;
    flex: 0 0 auto;
    position: relative;
    transition: all 0.3s ease 0s;
    @media screen and (max-width: 1200px) {
    margin-top: 7px;
    }
    @media screen and (max-width: 500px) {
      margin: 0;
      width: 100%;
    }
`;
const Img = styled.img`
  width: 100%;
`;
interface DownloadProps {
  dropb: boolean | undefined;
}
function Download({ dropb }: DownloadProps) {
  const data: any = i18next.t('download', { returnObjects: true });
  const image = dropb ? data["dropb"]["image"] : data["earthmera"]["image"];
  return (
    <Container dropb={dropb}>
      <ContentBox>
        <ImageBox dropb={dropb}>
          {
            !dropb? <EarthMeraImg src={image} />
            :<>
            <SecondImage src={image} dropb={dropb} />
          <Image src={image} dropb={dropb} />
          </>
          }
          
        </ImageBox>
        {
          dropb? <RightBox>
          <Header>
            {dropb ? data["dropb"]["header"] : data["earthmera"]["header"]}
          </Header>
          <SubHeader>
            {dropb ? data["dropb"]["subheader"] : data["earthmera"]["subheader"]}
          </SubHeader>
          <BannerBtnContainer>
            <BannerBtn href={iosAppStoreLink}>
              <Img src={data["storeImage"]["appstore"]}></Img>
            </BannerBtn>
            <BannerBtn href={androidAppStoreLink}>
              <Img src={data["storeImage"]["googleplay"]}></Img>
            </BannerBtn>
          </BannerBtnContainer>
        </RightBox>: <RightBox2>
        <Header>
            {dropb ? data["dropb"]["header"] : data["earthmera"]["header"]}
          </Header>
          <SubHeader>
            {dropb ? data["dropb"]["subheader"] : data["earthmera"]["subheader"]}
          </SubHeader>
          <BannerBtnContainer>
            <BannerBtn href={iosAppStoreLink}>
              <Img src={data["storeImage"]["appstore"]}></Img>
            </BannerBtn>
            <BannerBtn href={androidAppStoreLink}>
              <Img src={data["storeImage"]["googleplay"]}></Img>
            </BannerBtn>
          </BannerBtnContainer>
        </RightBox2>
        }
        
      </ContentBox>
    </Container>
  )
}
export default Download;