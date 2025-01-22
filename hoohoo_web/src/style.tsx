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
export const theme: {
  mainNeon: string;
  subNeon: string;
  white: string;
  darkGray: string;
  whiteGreen: string;
  darkSky: string;
  darkWhite: string;
  gray: string;
  green: string;
  blue: string;
  red: string;
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
  };
  weightBold: number;
  weightMedium: number;
  weightRegular: number;
  lineHeightRegular: number;
  lineHeightMicro: number;
} = {
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
  fontSize: {
    // 설명 보이게 하기 위해 추가
    xs: '0.75rem' /** 12px */,
    sm: '0.875rem' /** 14px */,
    md: '1rem' /** 16px */,
    lg: '1.125rem' /** 18px */,
    xl: '1.25rem' /** 20px */,
    '2xl': '1.5rem' /** 24px */,
    '3xl': '1.875rem' /** 30px */,
    '4xl': '2.25rem' /** 36px */,
    '5xl': '3rem' /** 48px */,
    '6xl': '3.75rem' /** 60px */,
  },

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
