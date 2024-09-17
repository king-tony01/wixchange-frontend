import React from "react";
import { Link } from "react-router-dom";

function Card() {
  return (
    <Link>
      <div className="card">
        <img
          src={
            "https://www.mygiftcardsupply.com/wp-content/uploads/2022/01/amazon-gift-card.png"
          }
          alt=""
        />
        <p>Amazon Gift Card</p>
        <b>$25.00</b>
        <div>
          <small>At $20.00</small>
          <small className="discount">20% OFF</small>
        </div>
      </div>
    </Link>
  );
}

export default Card;
