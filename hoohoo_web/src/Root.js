import React from "react";
import { Outlet } from "react-router-dom";
import { theme } from "./style";
// import Router from "./Router"
import Frame from "./Component/Frame";
import { CookiesProvider } from 'react-cookie';
function Root() {
  return (
    <CookiesProvider>
      <div style={{ backgroundColor: '#ffffff' }}>
        <Frame>
          <Outlet />
        </Frame>
      </div>
    </CookiesProvider>
  );

}

export default Root;



