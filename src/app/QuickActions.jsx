import React from "react";
import { Link } from "react-router-dom";
import fund from "/src/assets/fund.png";
import withdraw from "/src/assets/withdraw.png";
import vtu from "/src/assets/vtu.png";
import giftCard from "/src/assets/gift-card.png";
import bill from "/src/assets/bill.png";
import reward from "/src/assets/reward.png";
function QuickActions() {
  return (
    <div className="quick-actions">
      {["/withdraw", "/fund", "/vtu", "/gift-card", "/bills", "/reward"].map(
        (path, index) => (
          <Link to={path} key={index + 1}>
            <img
              src={
                path == "/withdraw"
                  ? withdraw
                  : path == "/fund"
                  ? fund
                  : path == "/vtu"
                  ? vtu
                  : path == "/gift-card"
                  ? giftCard
                  : path == "/bills"
                  ? bill
                  : reward
              }
              alt=""
            />
          </Link>
        )
      )}
    </div>
  );
}

export default QuickActions;
