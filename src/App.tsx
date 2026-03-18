import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import bigScreen from "./assets/big-screen.png";
import AuthProvider from "./auth/AuthContext";
import { useViewportWidth } from "./hooks/useViewportWidth";
import GiftCardProvider from "./contexts/GiftCardContext";
function App() {
  const screen = useViewportWidth();
  if (screen > 500) {
    return (
      <div className="big-screen">
        <img src={bigScreen} alt="" />
        <h1>Available only on Mobile!</h1>
      </div>
    );
  }
  return (
    <AuthProvider>
      <GiftCardProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet></Outlet>
        </Suspense>
      </GiftCardProvider>
    </AuthProvider>
  );
}

export default App;
