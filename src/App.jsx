import React, { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const [screen, setScreen] = useState(window.innerWidth);
  console.log(screen);
  const updateWidth = () => {
    setScreen(window.innerWidth);
  };
  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      updateWidth();
    };

    // Handle fullscreen change
    const handleFullscreenChange = () => {
      updateWidth();
    };
    // Add event listeners
    window.addEventListener("resize", handleResize);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange); // For Safari and old Chrome
    document.addEventListener("mozfullscreenchange", handleFullscreenChange); // For Firefox
    document.addEventListener("MSFullscreenChange", handleFullscreenChange); // For IE/Edge

    // Clean up event listeners
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);
  if (screen > 500) {
    return <div>Please use a mobile phone</div>;
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet></Outlet>
    </Suspense>
  );
}

export default App;
