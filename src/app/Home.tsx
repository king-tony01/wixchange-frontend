import React from "react";
import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";
import HomeProvider from "../contexts/HomeContext";

function Home() {
  return (
    <HomeProvider>
      <main className="home">
        <Outlet />
        <Navigation />
      </main>
    </HomeProvider>
  );
}

export default Home;
