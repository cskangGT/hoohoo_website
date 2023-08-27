import React from "react";
import { Outlet } from "react-router-dom";
import { theme } from "./style";
// import Router from "./Router"
function Root() {
  return (
    <div style={{ backgroundColor: theme.darkGray }}>

      <Outlet />
    </div>
  );

}

export default Root;



