import styled, {keyframes} from 'styled-components';

export const __DEV__ = window.location.hostname === 'web.earthmera.com';

export const APIAddress: string = __DEV__
  ? `https://dev.earthmera.com/`
  : `https://app.zigu.my/`;

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
  black: string;
  whiteGreen: string;
  darkSky: string;
  darkWhite: string;
  gray: string;
  inActiveGray: string;
  green: string;
  blue: string;
  red: string;
  spacing: {
    xs: string /** 4px */;
    sm: string /** 8px */;
    rg: string /** 12px */;
    md: string /** 16px */;
    xm: string /** 20px */;
    lg: string /** 24px */;
    xl: string /** 32px */;
    '2xl': string /** 40px */;
    '3xl': string /** 48px */;
    '4xl': string /** 56px */;
  };
  fontSize: {
    xs: string;
    sm: string;
    rg: string;
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
  black: '#000000',
  darkWhite: '#EBEBEB',
  gray: '#C4C1C1',
  inActiveGray: '#6e6d7a',
  green: '#00bf63',
  blue: '#2D8BBA',
  red: '#FF535A',
  fontSize: {
    xs: '0.625rem' /** 10px */,
    sm: '0.75rem' /** 12px */,
    rg: '0.875rem' /** 14px */,
    md: '1rem' /** 16px */,
    lg: '1.125rem' /** 18px */,
    xl: '1.25rem' /** 20px */,
    '2xl': '1.5rem' /** 24px */,
    '3xl': '1.875rem' /** 30px */,
    '4xl': '2.25rem' /** 36px */,
    '5xl': '3rem' /** 48px */,
    '6xl': '3.75rem' /** 60px */,
  },
  spacing: {
    /** 4px */
    xs: '4px',
    /** 8px */
    sm: '8px',
    /** 12px */
    rg: '12px',
    /** 16px */
    md: '16px',
    /** 20px */
    xm: '20px',
    /** 24px */
    lg: '24px',
    /** 32px */
    xl: '32px',
    /** 40px */
    '2xl': '40px',
    /** 48px */
    '3xl': '48px',
    /** 56px */
    '4xl': '56px',
  },
  weightBold: 700,
  weightMedium: 500,
  weightRegular: 400,

  lineHeightRegular: 27,
  lineHeightMicro: 18,
};

export const defaultProfileImage = `https://d186i0w5f8obzu.cloudfront.net/profile/default/default_profile_image.jpeg`;

export const LineDivider = styled.div`
  width: 100%;
  height: 2px;
  background-color: white;
`;
