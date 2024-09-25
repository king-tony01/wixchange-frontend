import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ListNewCard() {
  const [back, setBack] = useState(false);
  const navigate = useNavigate();
  const brands = ["Amazon", "Walmart", "Target", "Apple", "Xbox"];

  useEffect(() => {
    if (back) {
      navigate(-1);
    }
  }, [navigate, back]);

  return (
    <section className="list-new">
      <header className="card-market-header">
        <button onClick={() => setBack(true)}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <h3>Buy a Gift Card</h3>
      </header>
      <div className="input-wrapper">
        <p>Brand</p>
        <input type="text" placeholder="Select brand" />
        <div className="brands-con">
          {brands.map((brand, index) => (
            <span key={index}>{brand}</span>
          ))}
        </div>
      </div>
      <div className="input-wrapper">
        <p>Card number</p>
        <input type="text" placeholder="Enter the card number" />
      </div>
      <div className="input-wrapper">
        <p>Card PIN</p>
        <input type="text" placeholder="Enter the card PIN" />
      </div>
      <div className="input-wrapper wrapper-grid">
        <div>
          <p>Card value</p>
          <input type="text" placeholder="Enter card value" />
        </div>
        <div>
          <p>Selling price</p>
          <input type="text" placeholder="What is your price?" />
        </div>
      </div>
      <div className="input-wrapper">
        <p>Discount (optional)</p>
        <input type="text" placeholder="Are you offering a discount?" />
        <small>0%</small>
      </div>
      <div className="agree-section">
        <div className="check-box">
          <input type="checkbox" name="" id="" />
          <span></span>
        </div>
        <small>
          You agree to our <Link>terms and conditions</Link> for listing a gift
          card on WiXchange.
        </small>
      </div>
      <Link className="main-btn">Submit</Link>
    </section>
  );
}

export default ListNewCard;
