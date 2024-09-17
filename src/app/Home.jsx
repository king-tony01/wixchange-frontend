import React from "react";
import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <main className="home">
      <Outlet />
      <Navigation />
    </main>
  );
}

export default Home;
