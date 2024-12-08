import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';
import YanoljaYacheBTtf from '../public/fonts/YanoljaYacheB.ttf';
import YanoljaYacheBWoff from '../public/fonts/YanoljaYacheB.woff';
import YanoljaYacheBWoff2 from '../public/fonts/YanoljaYacheB.woff2';
import YanoljaYacheTtf from '../public/fonts/YanoljaYacheR.ttf';
import YanoljaYacheWoff from '../public/fonts/YanoljaYacheR.woff';
import YanoljaYacheWoff2 from '../public/fonts/YanoljaYacheR.woff2';
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
    :root {
      color-scheme: only light;
    }
    body {
      margin: 0;
      font-family: 'Yanolga Yachae','Noto Sans', 'Fredoka', 'Permanent Marker';
      font-weight: 500;
      overflow-x: hidden;
      user-select: none;
      -webkit-user-select: none;
      -webkit-text-fill-color: unset;
    }
    html {
      overflow-x: hidden;
      scroll-behavior: smooth;
    }
`;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={Router} />
  </React.StrictMode>,
);
