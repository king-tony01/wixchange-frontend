import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useBackNavigation } from "../hooks/useBackNavigation";
import { useGiftCards } from "../hooks/useGiftCards";
import WiXinput from "./components/WiXinput";
import WiXSelect from "./components/WiXSelect";

function ListNewCard() {
  const goBack = useBackNavigation();
  const { listCard } = useGiftCards();
  const brands = [
    {
      label: "Amazon",
      value: "Amazon",
      description: "Gift cards, digital codes, and store credit.",
      icon: "bag-shopping",
    },
    {
      label: "Walmart",
      value: "Walmart",
      description: "Retail credit and physical store vouchers.",
      icon: "cart-shopping",
    },
    {
      label: "Target",
      value: "Target",
      description: "Popular retail gift cards and vouchers.",
      icon: "bullseye",
    },
    {
      label: "Apple",
      value: "Apple",
      description: "App Store, iTunes, and Apple credit.",
      icon: "apple-whole",
    },
    {
      label: "Xbox",
      value: "Xbox",
      description: "Gaming credit and redeemable store cards.",
      icon: "gamepad",
    },
    {
      label: "Steam",
      value: "Steam",
      description: "PC gaming wallet top-ups and gift cards.",
      icon: "steam",
    },
  ];
  const categories = [
    {
      label: "Digital",
      value: "Digital",
      description: "Gift codes, vouchers, and instant delivery cards.",
      icon: "bolt",
    },
    {
      label: "Gaming",
      value: "Gaming",
      description: "Console, PC, and platform game cards.",
      icon: "gamepad",
    },
    {
      label: "Entertainment",
      value: "Entertainment",
      description: "Streaming, media, and subscription cards.",
      icon: "film",
    },
    {
      label: "Retail",
      value: "Retail",
      description: "Store credit for shopping and essentials.",
      icon: "shopping-bag",
    },
  ];
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
      discountPercent: "",
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
          <WiXSelect
            value={form.name}
            onValueChange={(value) => updateField("name", value)}
            options={brands}
            placeholder="Select brand"
            icon="tag"
            searchable
            containerClassName="gift-select brand-select"
            triggerClassName="gift-select-trigger"
            menuClassName="gift-select-menu"
            optionClassName="gift-select-option"
          />
        </div>

        <div className="input-wrapper">
          <p>Category</p>
          <WiXSelect
            value={form.category}
            onValueChange={(value) => updateField("category", value)}
            options={categories}
            placeholder="Select category"
            icon="layer-group"
            searchable={false}
            containerClassName="gift-select"
            triggerClassName="gift-select-trigger"
            menuClassName="gift-select-menu"
            optionClassName="gift-select-option"
          />
        </div>

        <div className="input-wrapper">
          <p>Card number</p>
          <WiXinput
            type="text"
            placeholder="Enter the card number"
            value={form.cardNumber}
            onValueChange={(value) => updateField("cardNumber", value)}
            icon="credit-card"
            validate={(value) => value.trim().length > 0}
          />
        </div>
        <div className="input-wrapper">
          <p>Card PIN</p>
          <WiXinput
            type="password"
            placeholder="Enter the card PIN"
            value={form.pin}
            onValueChange={(value) => updateField("pin", value)}
            icon="key"
            validate={(value) => value.trim().length > 0}
          />
        </div>
        <div className="input-wrapper wrapper-grid">
          <div>
            <p>Card value</p>
            <WiXinput
              type="number"
              min="1"
              placeholder="Enter card value"
              value={form.value}
              onValueChange={(value) => updateField("value", value)}
              icon="hashtag"
              validate={(value) => Number(value) >= 1}
            />
          </div>
          <div>
            <p>Selling price</p>
            <WiXinput
              type="number"
              min="1"
              placeholder="What is your price?"
              value={form.price}
              onValueChange={(value) => updateField("price", value)}
              icon="money-bill"
              validate={(value) => Number(value) >= 1}
            />
          </div>
        </div>
        <div className="input-wrapper">
          <p>Discount (optional)</p>
          <WiXinput
            type="number"
            min="0"
            max="100"
            placeholder="Are you offering a discount percentage?"
            value={form.discountPercent}
            onValueChange={(value) => updateField("discountPercent", value)}
            icon="percent"
            required={false}
            validate={(value) =>
              value === "" || (Number(value) >= 0 && Number(value) <= 100)
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
