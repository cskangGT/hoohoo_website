import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';


export const BgImage = styled.div`
    background: url("Images/bg2.webp") center top / cover no-repeat;
    // background-size: cover;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow-x: hidden;
`;
export const theme: any = {
  mainNeon: '#93FF3F',
  subNeon: '#9EFFA9',
  white: '#f1f1f1',
  darkGray: '#1e1e1e',
  whiteGreen: '#E5FFD4',

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

// const FontFaces = createGlobalStyle`
// @font-face {
//   font-family: 'Myfont';
//   src: url(${myFontURL}) format('otf');
//   font-weight: 300;
//   font-style: normal;
// }
// `;
// export default FontFaces;