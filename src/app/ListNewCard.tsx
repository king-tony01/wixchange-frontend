import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useBackNavigation } from "../hooks/useBackNavigation";
import { useGiftCards } from "../hooks/useGiftCards";

function ListNewCard() {
  const goBack = useBackNavigation();
  const { listCard } = useGiftCards();
  const brands = ["Amazon", "Walmart", "Target", "Apple", "Xbox", "Steam"];
  const categories = ["Digital", "Gaming", "Entertainment", "Retail"];
  const [form, setForm] = useState({
    name: "",
    category: "Digital",
    cardNumber: "",
    pin: "",
    value: "",
    price: "",
    discountPercent: "0",
  });
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!agreed) {
      setError("You must agree to terms and conditions before submitting.");
      return;
    }

    const result = listCard(form);
    if (!result.ok) {
      setError(result.message);
      return;
    }

    setMessage(result.message);
    setForm({
      name: "",
      category: "Digital",
      cardNumber: "",
      pin: "",
      value: "",
      price: "",
      discountPercent: "0",
    });
    setAgreed(false);
  };

  return (
    <section className="list-new">
      <header className="card-market-header">
        <button onClick={goBack}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <h3>Buy a Gift Card</h3>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <p>Brand</p>
          <input
            type="text"
            placeholder="Select brand"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
          />
          <div className="brands-con">
            {brands.map((brand) => (
              <span key={brand} onClick={() => updateField("name", brand)}>
                {brand}
              </span>
            ))}
          </div>
        </div>

        <div className="input-wrapper">
          <p>Category</p>
          <select
            value={form.category}
            onChange={(event) => updateField("category", event.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: 10,
              color: "var(--light-white)",
              background: "var(--card-dark)",
              borderRadius: 5,
            }}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="input-wrapper">
          <p>Card number</p>
          <input
            type="text"
            placeholder="Enter the card number"
            value={form.cardNumber}
            onChange={(event) => updateField("cardNumber", event.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <p>Card PIN</p>
          <input
            type="password"
            placeholder="Enter the card PIN"
            value={form.pin}
            onChange={(event) => updateField("pin", event.target.value)}
          />
        </div>
        <div className="input-wrapper wrapper-grid">
          <div>
            <p>Card value</p>
            <input
              type="number"
              min="1"
              placeholder="Enter card value"
              value={form.value}
              onChange={(event) => updateField("value", event.target.value)}
            />
          </div>
          <div>
            <p>Selling price</p>
            <input
              type="number"
              min="1"
              placeholder="What is your price?"
              value={form.price}
              onChange={(event) => updateField("price", event.target.value)}
            />
          </div>
        </div>
        <div className="input-wrapper">
          <p>Discount (optional)</p>
          <input
            type="number"
            min="0"
            max="100"
            placeholder="Are you offering a discount percentage?"
            value={form.discountPercent}
            onChange={(event) =>
              updateField("discountPercent", event.target.value)
            }
          />
          <small>{form.discountPercent || 0}%</small>
        </div>
        <div className="agree-section">
          <div className="check-box">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
            />
            <span style={{ opacity: agreed ? 1 : 0 }}></span>
          </div>
          <small>
            You agree to our{" "}
            <Link to="#" onClick={(e) => e.preventDefault()}>
              terms and conditions
            </Link>{" "}
            for listing a gift card on WiXchange.
          </small>
        </div>
        {error ? (
          <small
            style={{ color: "#ef4444", display: "block", padding: "0 15px" }}
          >
            {error}
          </small>
        ) : null}
        {message ? (
          <small
            style={{ color: "#22c55e", display: "block", padding: "0 15px" }}
          >
            {message}
          </small>
        ) : null}
        <button type="submit" className="main-btn">
          Submit
        </button>
      </form>
    </section>
  );
}

export default ListNewCard;
