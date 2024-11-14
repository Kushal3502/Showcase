import React from "react";
import { Outlet } from "react-router-dom";

function Project() {
  return (
    <div className=" max-w-4xl mx-auto">
      <Outlet />
    </div>
  );
}

export default Project;
