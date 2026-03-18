import React from "react";
import { Link } from "react-router-dom";

function Card({ card }) {
  return (
    <Link to={`/services/gift-card/details/${card.id}`}>
      <div className="card">
        <img
          src={
            card.image ||
            "https://www.mygiftcardsupply.com/wp-content/uploads/2022/01/amazon-gift-card.png"
          }
          alt={`${card.name} card`}
        />
        <p>{card.name}</p>
        <b>
          {card.value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </b>
        <div>
          <small>
            At{" "}
            {card.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </small>
          {card.discount > 0 ? (
            <small className="discount">
              {Math.round((card.discount / card.price) * 100)}% OFF
            </small>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export default Card;
