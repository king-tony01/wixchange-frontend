import React from "react";

interface SpinnerProps {
  size?: number;
}

function Spinner({ size = 30 }: SpinnerProps) {
  return (
    <div>
      <span
        className="spinner"
        style={{ width: `${size}px`, height: `${size}px` }}
      ></span>
    </div>
  );
}

export default Spinner;
