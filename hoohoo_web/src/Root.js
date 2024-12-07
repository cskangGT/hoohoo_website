import React from 'react';
import {CookiesProvider} from 'react-cookie';
import {Outlet} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Frame from './Component/Frame';
function Root() {
  return (
    <CookiesProvider>
      <div style={{backgroundColor: 'transparent'}}>
        <Frame>
          <Outlet />
        </Frame>
        <ToastContainer />
      </div>
    </CookiesProvider>
  );
}

export default Root;
