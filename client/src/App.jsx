import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components";

function App() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="md:px-40 p-8 flex justify-center">
          <Outlet />
      </div>
    </div>
  );
}

export default App;
