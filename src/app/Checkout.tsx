import React, { createContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/checkout.css";
import AuthModal from "./AuthModal";
import { useBackNavigation } from "../hooks/useBackNavigation";
import { useGiftCards } from "../hooks/useGiftCards";

export const CheckoutContext = createContext({
  setOpen: () => {},
  onAuthorized: () => {},
});

function formatMoney(amount) {
  return Number(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function Checkout() {
  const [open, setOpen] = useState(false);
  const goBack = useBackNavigation();
  const navigate = useNavigate();
  const { cart, removeFromCart, completeCheckout } = useGiftCards();

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const platformFee = subtotal * 0.01;
  const total = subtotal + platformFee;

  const onAuthorized = () => {
    const result = completeCheckout();
    if (result.ok) {
      setOpen(false);
      navigate("/services/gift-card");
    }
  };

  return (
    <CheckoutContext.Provider value={{ setOpen, onAuthorized }}>
      <section className="checkout">
        <header className="card-market-header">
          <button onClick={goBack}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <h3>Checkout</h3>
        </header>
        <div className="checkout-body">
          <h4>Items</h4>
          {cart.length === 0 ? (
            <div>
              <p style={{ color: "var(--text)", marginBottom: 10 }}>
                Your cart is empty.
              </p>
              <Link to="/services/gift-card/marketplace">
                Go to marketplace
              </Link>
            </div>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  <img src={item.image} alt={`${item.name} gift card`} />
                  <div>
                    <p>{item.name}</p>
                    <div>
                      <b>{formatMoney(item.value)}</b>
                      <small>
                        Selling price: <span>{formatMoney(item.price)}</span>
                      </small>
                      <small>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            background: "none",
                            color: "#ef4444",
                            padding: 0,
                            textDecoration: "underline",
                          }}
                        >
                          Remove
                        </button>
                      </small>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="total-cal">
            <small>Platform fee (1%): {formatMoney(platformFee)}</small>
            <small>Total: {formatMoney(total)}</small>
          </div>
          <button
            className="pay-btn"
            onClick={() => setOpen(true)}
            disabled={cart.length === 0}
          >
            Pay {formatMoney(total)}
          </button>
          <div className="buyer-protection">
            <i className="fas fa-user-shield"></i>
            <div>
              <p>Buyer Protection Active</p>
              <small>Your transaction in this platform is highly secure.</small>
            </div>
          </div>
        </div>
        {open && <AuthModal />}
      </section>
    </CheckoutContext.Provider>
  );
}

export default Checkout;
