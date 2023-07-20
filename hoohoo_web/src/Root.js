import React from "react";
import { Outlet } from "react-router-dom";
// import Router from "./Router"

function Root() {
  return (
    <div style={{width:'100%', height:'100%'}}>
      
      <Outlet />
    </div>
  );

}

export default Root;



