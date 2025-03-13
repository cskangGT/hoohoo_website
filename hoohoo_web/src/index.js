import {GoogleOAuthProvider} from '@react-oauth/google';
import React from 'react';
import {CookiesProvider} from 'react-cookie';
import ReactDOM from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import {RouterProvider} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createGlobalStyle} from 'styled-components';
import NanumHumanTTfBold from '../public/fonts/NanumHumanBold.ttf';
import NanumHumanTTfLight from '../public/fonts/NanumHumanLight.ttf';
import NanumHumanTTfRegular from '../public/fonts/NanumHumanRegular.ttf';
import RixYeoljeongdoR from '../public/fonts/RixYeoljeongdoRegular.ttf';
import TmoneyRoundWindExtraBold from '../public/fonts/TmoneyRoundWindExtraBold.ttf';
import TmoneyRoundWindRegular from '../public/fonts/TmoneyRoundWindRegular.ttf';
import YanoljaYacheBTtf from '../public/fonts/YanoljaYacheB.ttf';
import YanoljaYacheBWoff from '../public/fonts/YanoljaYacheB.woff';
import YanoljaYacheBWoff2 from '../public/fonts/YanoljaYacheB.woff2';
import YanoljaYacheTtf from '../public/fonts/YanoljaYacheR.ttf';
import YanoljaYacheWoff from '../public/fonts/YanoljaYacheR.woff';
import YanoljaYacheWoff2 from '../public/fonts/YanoljaYacheR.woff2';
import {LanguageProvider} from './components/hooks/LanguageContext';
import './lang/i18n';
import Router from './Router';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Yanolga Yachae';
        
        src: 
        url(${YanoljaYacheTtf}) format('truetype'),
        url(${YanoljaYacheWoff}) format('woff'),
         url(${YanoljaYacheWoff2}) format('woff2'),
         url(${YanoljaYacheBTtf}) format('truetype'),
        url(${YanoljaYacheBWoff}) format('woff'),
         url(${YanoljaYacheBWoff2}) format('woff2'),
         
    }
    @font-face {
      font-family: 'RixYeoljeongdoR';
      src: url(${RixYeoljeongdoR}) format('truetype');
    }
    @font-face {
        font-family: 'Nanum Human';
        src: 
        url(${NanumHumanTTfRegular}) format('truetype'),
        url(${NanumHumanTTfBold}) format('truetype'),

        url(${NanumHumanTTfLight}) format('truetype'),
        
    }
    /* @font-face {
      font-family: 'SCDream';
      src: url(${SCDream}) format('opentype'),
      url(${SCDream2}) format('opentype'),
      url(${SCDream3}) format('opentype'),
      url(${SCDream4}) format('opentype'),
      url(${SCDream5}) format('opentype'),
      url(${SCDream6}) format('opentype'),
      url(${SCDream7}) format('opentype'),
      url(${SCDream8}) format('opentype'),
      url(${SCDream9}) format('opentype'),

      
    } */
      @font-face {
        font-family: 'TmoneyRoundWind';
        src: url(${TmoneyRoundWindRegular}) format('truetype');
        font-weight: 400;  // Regular 웨이트 지정
      }
      
      @font-face {
        font-family: 'TmoneyRoundWind';
        src: url(${TmoneyRoundWindExtraBold}) format('truetype');
        font-weight: 800;  // ExtraBold 웨이트 지정
      }
      
    @font-face {
    font-family: 'yg-jalnan';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
    :root {
      color-scheme: only light;
    }
    body {
      margin: 0;
      font-family:  'Fredoka', 'TmoneyRoundWind', 'Inter', 'Noto Sans', 'Black Han Sans', 'Permanent Marker';
      font-weight: 400;
      overflow-x: hidden;
      word-break: keep-all;
      user-select: auto;
      -webkit-user-select: auto;
      -webkit-text-fill-color: unset;
    }
    html {
      overflow-x: hidden;
      scroll-behavior: smooth;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        color-scheme: light;
      }
      body {
        background-color: #ffffff !important;
        color: #000000 !important;
      }
    }
`;

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <HelmetProvider>
    <CookiesProvider>
      <GoogleOAuthProvider
        clientId={
          '1441892786-rh1h7vnt7ua7tlece7jts1ca6kasi1uh.apps.googleusercontent.com'
        }>
        <GlobalStyle />
        <LanguageProvider>
          <RouterProvider router={Router} />
          <ToastContainer />
        </LanguageProvider>
      </GoogleOAuthProvider>
    </CookiesProvider>
  </HelmetProvider>,
);
