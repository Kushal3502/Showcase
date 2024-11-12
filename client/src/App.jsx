import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components";

function App() {
  return (
    <div className=" min-h-screen">
      <Navbar />
      <div className=" md:px-40 px-8">
      <Outlet />

      </div>
    </div>
  );
}

export default App;
