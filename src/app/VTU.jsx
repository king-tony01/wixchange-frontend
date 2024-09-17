import React from "react";

function VTU({ type }) {
  const firstChar = type.charAt(0).toUpperCase();
  return (
    <div className={`vtu-card ${type}`}>
      <b>{type == "airtime" ? "N" + 800 : 800 + "GB"}</b>
      <small>
        for{" "}
        {(700).toLocaleString("en-NG", { style: "currency", currency: "NGN" })}
      </small>
      <small>{firstChar + type.slice(1)}</small>
    </div>
  );
}

export default VTU;
