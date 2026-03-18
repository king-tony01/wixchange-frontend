import React from "react";
import { Link } from "react-router-dom";
import { GiftCard } from "../assets/icons/giftcard";
import { useBackNavigation } from "../hooks/useBackNavigation";
import { useGiftCards } from "../hooks/useGiftCards";

function formatMoney(amount) {
  return Number(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function formatHistoryType(type) {
  if (type === "buy") return "Card Purchased";
  if (type === "sell") return "Card Sold";
  return "Card Listed";
}

function GiftCardsHome() {
  const goBack = useBackNavigation();
  const { ownedCards, history } = useGiftCards();
  return (
    <section className="gift-card-home">
      <header className="gift-card-home-header">
        <button onClick={goBack}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <h3>Gift Cards Services</h3>
      </header>
      <div className="gift-card-home-hero">
        <p className="sub-title">Owned Cards</p>
        <div className="owned-cards">
          {ownedCards.length === 0 ? (
            <small>No owned cards yet. Purchased cards will appear here.</small>
          ) : (
            ownedCards.slice(0, 8).map((card) => (
              <div className="card-prev-home" key={card.id}>
                <img src={card.image} alt={`${card.name} gift card`} />
                <p>{card.name}</p>
                <small>{formatMoney(card.value)}</small>
              </div>
            ))
          )}
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
        <small>{history.length} records</small>
      </div>
      <div className="card-history">
        <ul>
          {history.length === 0 ? (
            <li>
              <div className="left">
                <span className="icon">
                  <img src={GiftCard.giftcard} alt="gift card icon" />
                </span>
                <div>
                  <b>No activity yet</b>
                  <small>Your gift card transactions will show here.</small>
                </div>
              </div>
            </li>
          ) : (
            history.slice(0, 12).map((record) => (
              <li key={record.id}>
                <div className="left">
                  <span className="icon">
                    <img src={GiftCard.giftcard} alt="gift card icon" />
                  </span>
                  <div>
                    <b>
                      {record.type === "buy" ? "-" : "+"}
                      {formatMoney(record.amount)}
                    </b>
                    <small>{formatHistoryType(record.type)}</small>
                  </div>
                </div>
                <div className="right">
                  <small className="status">{record.status}</small>
                  <small>{new Date(record.createdAt).toLocaleString()}</small>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}

export default GiftCardsHome;
