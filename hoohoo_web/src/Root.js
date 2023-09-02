import React from "react";
import { Outlet } from "react-router-dom";
import { theme } from "./style";
// import Router from "./Router"
function Root() {
  return (
    <div style={{ backgroundColor: '#ffffff' }}>

      <Outlet />
    </div>
  );

}

export default Root;



