import React from "react";
import { Outlet } from "react-router-dom";
// import Router from "./Router"

function Root() {
  return (
    <div>
      hi
      <Outlet />
    </div>
  );

}

export default Root;



