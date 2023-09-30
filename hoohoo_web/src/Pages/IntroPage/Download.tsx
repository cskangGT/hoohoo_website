import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGooglePlay, faAppStore } from '@fortawesome/free-brands-svg-icons';

const Container = styled.div<DownloadProps>`
    margin-top: 0px;
    display: flex;
    justify-content: flex-start;
    width: 1100px;
    height: 420px;
    border-radius: 40px;
    background: linear-gradient(299deg, rgba(60, 214, 238, 0.44) 0%, ${props => (props.dropb ? '#1e1e1e' : '#93FF3F')} 100%);
    border-radius: 20px;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
    overflow: hidden;
    @media screen and (max-width: 1100px) {
        width: 80%;
        height: 630px;
    }
    @media screen and (max-width: 730px) {
        height: 700px;
        }
        margin-bottom: 58px;
`;
const ContentBox = styled.div`

    max-width: 1140px;
    display: flex;
    position: relative;
    width: 100%;
    justify-content: center;
`;
const ImageBox = styled.div`
  padding-top: 30px;
`;
// const Image = styled.img`
//   width: 350px;
//   position: absolute;
//   transform: rotate(-15deg);
//   @media screen and (max-width: 1100px) {
//     width: 250px;
//     bottom: -20%;
//     left: 30%;
// }
// `;
// const SecondImage = styled.img`
// width: 350px;
// position: absolute;
// left:155px;
//   top: 140px;
//   transform: rotate(15deg);
//   @media screen and (max-width: 1100px) {
//     width: 250px;
//     top: auto;
//     left: 44%;
//     bottom: -200px;
// }`;
const Image = styled.img<DownloadProps>`
  width: ${props => (props.dropb ? '280px' : '220px')};
  position: absolute;
  left: ${props => (props.dropb ? '50px' : '70px')};
  // transform: rotate(-15deg);
  @media screen and (max-width: 1100px) {
    width: 250px;
    bottom: -20%;
    left: 30%;
}
`;
const SecondImage = styled.img<DownloadProps>`
width: ${props => (props.dropb ? '270px' : '215px')};
position: absolute;
height: auto;
left:200px;
  transform: rotate(15deg);
  @media screen and (max-width: 1100px) {
    width: 250px;
    top: auto;
    left: 44%;
    bottom: -200px;
}
`;
const RightBox = styled.div`
  margin: 70px 22px 92px 530px;
  @media screen and (max-width: 1100px) {
    margin: 35px 16px -10px;
    padding: 24px 21px 380px;
}

`;
const Header = styled.h1`
  color: ${theme.white};
  font-weight: 700;
  font-size: 36px;
  line-height: 1.2;
  margin-bottom: 22px;
  padding: 0px;
  text-align: left;
  @media screen and (max-width: 1100px) {
      margin: 0 10%;
      margin-bottom: 20px;
    text-align:center;
}
`;
const SubHeader = styled.h3`
  color: ${theme.white};
  font-weight: 300;
  font-size: 28px;
  line-height: 1.2;
  margin-bottom: 36px;
  padding: 0px;
  text-align: left;
  @media screen and (max-width: 1100px) {
      margin: 0 10%;
      margin-bottom: 20px;
    text-align:center;
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

`;
const BannerBtn = styled.a`
    text-decoration: none;
    color: ${theme.white};
    margin-right:14px;
    display: flex;
    width: 242px;
    // padding: 25px 14px 25px 20px;
    border-radius: 20px;
    flex: 0 0 auto;
    // border: 1px solid rgba(255, 255, 255, 0.3);
    position: relative;
    transition: all 0.3s ease 0s;
    // &:hover{
    //     color: ${theme.white};
    //     border-color: ${theme.mainNeon} ;
    // }
    @media screen and (max-width: 730px) {
    margin-top: 7px;
    }
`;
const ButtonTextBox = styled.div`
    font-family: Inter, sans-serif;
    margin-left: 15px;
    color: ${theme.white};
`;
const ButtonText = styled.div`
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 1px;
    line-height: 1.2;
    text-transform: uppercase;
`;
const Rate = styled.div`
display: flex;
align-items: center;
margin-top: 2px;
justify-content: center;
`;
const RateLeft = styled.strong`
  font-size: 24px;
  font-weight: 700;
  
`;
const RateRight = styled.span`
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 1.2px;
  font-weight: 400;
padding-left : 5px;
  font-size: 13px;
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
            {/* <BannerBtn href='#'>
              <FontAwesomeIcon icon={faAppStore} size='2xl' />
              <ButtonTextBox>
                <ButtonText>Apple app store</ButtonText>
                <Rate><RateLeft>4.5</RateLeft><RateRight>(223K ratings)</RateRight></Rate>
              </ButtonTextBox>
            </BannerBtn>
            <BannerBtn href='#'>
              <FontAwesomeIcon icon={faGooglePlay} size='2xl' />
              <ButtonTextBox>
                <ButtonText>Google Play</ButtonText>
                <Rate><RateLeft>4.5</RateLeft><RateRight>(323K downloads)</RateRight></Rate>
              </ButtonTextBox>
            </BannerBtn> */}
          </BannerBtnContainer>
        </RightBox>
      </ContentBox>
    </Container>
  )
}
export default Download;