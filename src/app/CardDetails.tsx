import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import SectionList from "./SectionList";
import { useBackNavigation } from "../hooks/useBackNavigation";
import { useGiftCards } from "../hooks/useGiftCards";

function formatMoney(amount) {
  return Number(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function CardDetails() {
  const goBack = useBackNavigation();
  const navigate = useNavigate();
  const location = useLocation();
  const { cardId } = useParams();
  const { getCardById, marketCards, addToCart, startCheckout, cart } =
    useGiftCards();
  const card = getCardById(cardId);
  const searchParams = new URLSearchParams(location.search);
  const readOnlyMode =
    location.state?.readOnly === true || searchParams.get("readonly") === "1";

  if (!card) {
    return (
      <section className="card-details">
        <header className="card-market-header">
          <button onClick={goBack}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <h3>Card Details</h3>
        </header>
        <div style={{ padding: 15 }}>
          <p style={{ color: "var(--light-white)", marginBottom: 8 }}>
            This gift card is no longer available.
          </p>
          <Link to="/services/gift-card/marketplace">Back to marketplace</Link>
        </div>
      </section>
    );
  }

  const relatedCards = marketCards
    .filter((item) => item.id !== card.id && item.name === card.name)
    .slice(0, 4);

  const relatedSection =
    relatedCards.length > 0
      ? [
          {
            title: "More from this seller",
            data: relatedCards,
          },
        ]
      : [];

  const discountPercent =
    card.price > 0 ? Math.round((card.discount / card.price) * 100) : 0;

  const handleAddToCart = () => {
    addToCart(card.id);
  };

  const handleBuyNow = () => {
    const response = startCheckout(card.id);
    if (response.ok) {
      navigate("/services/gift-card/checkout");
    }
  };

  const isInCart = cart.some((item) => item.id === card.id);

  return (
    <section className="card-details">
      <header className="card-market-header">
        <button onClick={goBack}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <h3>Card Details</h3>
      </header>
      <div className="details-hero">
        <img src={card.image} alt={`${card.name} gift card`} />
        <div>
          <p>{card.name}</p>
          <small>
            Card value: <span>{formatMoney(card.value)}</span>
          </small>
          <small>
            Selling price: <span>{formatMoney(card.price)}</span>
          </small>
          <small>
            Discount:{" "}
            <span>
              {formatMoney(card.discount)} {discountPercent}% OFF
            </span>
          </small>
        </div>
      </div>
      {!readOnlyMode ? (
        <div className="details-action">
          <Link
            to="/services/gift-card/checkout"
            onClick={(e) => {
              e.preventDefault();
              handleBuyNow();
            }}
          >
            Buy Now
          </Link>
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
            aria-disabled={isInCart}
          >
            {isInCart ? "Added" : "Add to Cart"}
          </Link>
        </div>
      ) : null}
      <div className="seller-info">
        <h4>Seller info</h4>
        <div className="seller-card">
          <div className="card-top">
            <img src={card.image} alt={`${card.sellerName} avatar`} />
            <div>
              <p>{card.sellerName}</p>
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
          </div>
          <div className="card-bottom">
            <small>
              <i className="fas fa-phone"></i> {card.sellerPhone}
            </small>
            <small>
              <i className="fas fa-envelope"></i> {card.sellerEmail}
            </small>
          </div>
        </div>
      </div>
      {relatedSection.length > 0 ? (
        <div style={{ padding: 15 }}>
          <SectionList list={relatedSection} />
        </div>
      ) : null}
    </section>
  );
}

export default CardDetails;
