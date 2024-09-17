import React, { useState } from "react";

function WalletCard() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="wallet-card">
      <div>
        <small>Available balance</small>{" "}
        <i
          className={`fas fa-eye${visible ? "-slash" : ""}`}
          onClick={() => setVisible(!visible)}
        ></i>
      </div>
      <b>
        {visible
          ? (10000).toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })
          : "********"}
      </b>
    </div>
  );
}

export default WalletCard;
