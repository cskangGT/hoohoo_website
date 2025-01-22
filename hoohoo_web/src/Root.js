import React from 'react';
import {CookiesProvider} from 'react-cookie';
import {Outlet} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Frame from './Component/Frame';
import {LanguageProvider} from './Component/hooks/LanguageContext';
function Root() {
  return (
    <LanguageProvider>
      <CookiesProvider>
        {/* <div style={{backgroundColor: 'transparent'}}> */}
        <Frame>
          <Outlet />
        </Frame>
        <ToastContainer />
        {/* </div> */}
      </CookiesProvider>
    </LanguageProvider>
  );
}

export default Root;
