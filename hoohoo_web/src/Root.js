import React from "react";
import { Outlet } from "react-router-dom";
import { theme } from "./style";
import Frame from "./Component/Frame";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { CookiesProvider } from 'react-cookie';
function Root() {
  return (
    <CookiesProvider>
      <div style={{ backgroundColor: 'transparent' }}>
        <Frame>
          <Outlet />
        </Frame>
        <ToastContainer />
      </div>
    </CookiesProvider>
  );

}

export default Root;



