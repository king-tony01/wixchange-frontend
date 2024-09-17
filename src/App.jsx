import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet></Outlet>
    </Suspense>
  );
}

export default App;
