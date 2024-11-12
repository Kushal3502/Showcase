import React, { useEffect } from "react";
import { Button } from "./components/ui/button";
import { Outlet } from "react-router-dom";
import useAuth from "./context/authContext";

function App() {
  const {githubData} = useAuth()
  useEffect(() => {
    console.log(githubData);
  },[])
  return (
    <div>
      Showcase
      <Outlet />
    </div>
  );
}

export default App;
