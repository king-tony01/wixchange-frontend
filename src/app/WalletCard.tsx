import React, { useState } from "react";
import { WiXcoin } from "../assets/icons/wixcoin";

function WalletCard({ balance }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className='wallet-card'>
      <div>
        <small>Available balance</small>{" "}
        <i
          className={`fas fa-eye${visible ? "-slash" : ""}`}
          onClick={() => setVisible(!visible)}
        ></i>
      </div>
      <b>
        {visible
          ? balance.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })
          : "********"}
      </b>
      <div className='wix-points'>
        {<WiXcoin />} <span>0</span>
      </div>
    </div>
  );
}

export default WalletCard;
