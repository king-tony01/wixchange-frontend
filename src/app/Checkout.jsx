import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "/src/css/checkout.css";
import AuthModal from "./AuthModal";
export const CheckoutContext = createContext();
function Checkout() {
  const [back, setBack] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (back) {
      navigate(-1);
    }
  }, [navigate, back]);
  return (
    <CheckoutContext.Provider value={{ setOpen }}>
      <section className="checkout">
        <header className="card-market-header">
          <button onClick={() => setBack(true)}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <h3>Checkout</h3>
        </header>
        <div className="checkout-body">
          <h4>Items</h4>
          <ul>
            <li>
              <img src="" alt="" />
              <div>
                <p>Amazon</p>
                <div>
                  <b>$25.00</b>
                  <small>
                    Selling price: <span>$20.00</span>
                  </small>
                </div>
              </div>
            </li>
          </ul>
          <div className="total-cal">
            <small>Platform fee: 1%</small>
            <small>Total: $20.2 + 1% fee</small>
          </div>
          <button className="pay-btn" onClick={() => setOpen(true)}>
            Pay $20.20
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
