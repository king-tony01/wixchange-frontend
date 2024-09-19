import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cards } from "../../test";
import SectionList from "./SectionList";
function CardDetails() {
  const [back, setBack] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (back) {
      navigate(-1);
    }
  }, [navigate, back]);
  const more = cards[0];
  more.title = "More from this seller";
  return (
    <section className="card-details">
      <header className="card-market-header">
        <button onClick={() => setBack(true)}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <h3>Card Details</h3>
      </header>
      <div className="details-hero">
        <img src="" alt="" />
        <div>
          <p>Amazon</p>
          <small>
            Card value: <span>$25.00</span>
          </small>
          <small>
            Selling price: <span>$25.00</span>
          </small>
          <small>
            Discount: <span>$10.00 50% OFF</span>
          </small>
        </div>
      </div>
      <div className="details-action">
        <Link to={`/services/gift-card/checkout`}>Buy Now</Link>
        <Link aria-disabled={true}>Add to Cart</Link>
      </div>
      <div className="seller-info">
        <h4>Seller info</h4>
        <div className="seller-card">
          <div className="card-top">
            <img src="" alt="" />
            <div>
              <p>Mark Henry Technologies</p>
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
              <i className="fas fa-phone"></i> +234 123 123 1234
            </small>
            <small>
              <i className="fas fa-envelope"></i> marktechnologies@gmail.com
            </small>
          </div>
        </div>
      </div>
      <div style={{ padding: 15 }}>
        <SectionList list={[more]} />
      </div>
    </section>
  );
}

export default CardDetails;
