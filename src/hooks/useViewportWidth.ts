import { useEffect, useState } from "react";

function getScreenWidth() {
  if (typeof window === "undefined") {
    return 0;
  }

  return window.innerWidth;
}

export function useViewportWidth() {
  const [screenWidth, setScreenWidth] = useState(getScreenWidth);

  useEffect(() => {
    const updateWidth = () => {
      setScreenWidth(getScreenWidth());
    };

    window.addEventListener("resize", updateWidth);
    document.addEventListener("fullscreenchange", updateWidth);
    document.addEventListener("webkitfullscreenchange", updateWidth);
    document.addEventListener("mozfullscreenchange", updateWidth);
    document.addEventListener("MSFullscreenChange", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
      document.removeEventListener("fullscreenchange", updateWidth);
      document.removeEventListener("webkitfullscreenchange", updateWidth);
      document.removeEventListener("mozfullscreenchange", updateWidth);
      document.removeEventListener("MSFullscreenChange", updateWidth);
    };
  }, []);

  return screenWidth;
}
