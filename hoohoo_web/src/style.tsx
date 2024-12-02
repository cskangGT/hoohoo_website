import styled, {keyframes} from 'styled-components';

export const slideInFromTop = keyframes`
  from {
    transform: translateY(-20%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;
export const BgImage = styled.div<{bgcolor?: string}>`
  /* background: url("Images/bg2.webp") center top / cover no-repeat;
     */
  background-color: ${props => (props.bgcolor ? props.bgcolor : '#FFFEFE')};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
export const theme: any = {
  mainNeon: '#93FF3F',
  subNeon: '#9EFFA9',
  white: '#f1f1f1',
  darkGray: '#1e1e1e',
  whiteGreen: '#E5FFD4',
  darkSky: '#191F28',
  
  darkWhite: '#EBEBEB',
  gray: '#C4C1C1',
  green: '#00bf63',
  blue: '#2D8BBA',
  red: '#EB4949',
  fontLarge: 26,
  fontMedium: 22,
  fontRegular: 18,
  fontSmall: 12,

  weightBold: 700,
  weightMedium: 500,
  weightRegular: 400,

  lineHeightRegular: 27,
  lineHeightMicro: 18,
};
export const LineDivider = styled.div`
  width: 100%;
  height: 2px;
  background-color: white;
`;
export const IP: string = 'app.earthmera.com';
export const APIAddress: string = `https://${IP}/`;
