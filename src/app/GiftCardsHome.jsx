import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cardIcon from "/src/assets/gift-card.png";
function GiftCardsHome() {
  const [back, setBack] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (back) {
      navigate(-1);
    }
  }, [navigate, back]);
  return (
    <section className="gift-card-home">
      <header className="gift-card-home-header">
        <button onClick={() => setBack(true)}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <h3>Gift Cards Services</h3>
      </header>
      <div className="gift-card-home-hero">
        <p className="sub-title">Owned Cards</p>
        <div className="owned-cards">
          <div className="card-prev-home">
            <img src="" alt="" />
            <p>Lorem ipsum dolor sit.</p>
            <small>$25.00</small>
          </div>
        </div>
      </div>
      <div className="action-buttons">
        <Link to={`/services/gift-card/marketplace`}>Buy a Gift Card</Link>
        <Link to={`/services/gift-card/marketplace/list-new`}>
          List a New Gift Card
        </Link>
      </div>
      <div className="history-header">
        <p>History</p>
        <Link>See All</Link>
      </div>
      <div className="card-history">
        <ul>
          <li>
            <div className="left">
              <span className="icon">
                <img src={cardIcon} alt="" />
              </span>
              <div>
                <b>-N2,000</b>
                <small>Card Sold</small>
              </div>
            </div>
            <div className="right">
              <small className="status">Pending</small>
              <small>
                {new Date().toDateString()} {new Date().getHours()}:
                {new Date().getMinutes()} AM
              </small>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default GiftCardsHome;
