import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className=" md:px-28 p-8">
        <TooltipProvider>
          <Outlet />
        </TooltipProvider>
      </div>
    </div>
  );
}

export default App;
