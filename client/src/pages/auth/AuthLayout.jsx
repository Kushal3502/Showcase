import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className=" min-h-screen flex justify-center items-center px-2">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
