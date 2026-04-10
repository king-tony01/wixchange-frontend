import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBackNavigation } from "../hooks/useBackNavigation";
import { useGiftCards } from "../hooks/useGiftCards";
import ErrorModal from "./components/ErrorModal";
import WiXButton from "./components/WiXButton";
import WiXinput from "./components/WiXinput";
import WiXSelect from "./components/WiXSelect";

function ListNewCard() {
  const goBack = useBackNavigation();
  const navigate = useNavigate();
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
    discountPercent: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [info, setInfo] = useState({
    className: "",
    title: "",
    message: "",
    icon: "",
    active: false,
  });
  const [loading, setLoading] = useState(false);

  const canSubmit =
    agreed &&
    form.name.trim() !== "" &&
    form.category.trim() !== "" &&
    form.cardNumber.trim() !== "" &&
    form.pin.trim() !== "" &&
    form.value.trim() !== "" &&
    Number(form.value) >= 1 &&
    form.price.trim() !== "" &&
    Number(form.price) >= 1;

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!canSubmit || loading) {
      return;
    }

    setInfo((prev) => ({ ...prev, active: false }));

    if (!agreed) {
      setInfo({
        className: "warning",
        title: "Terms Required",
        message: "You must agree to terms and conditions before submitting.",
        icon: "exclamation-triangle",
        active: true,
      });
      return;
    }

    setLoading(true);

    try {
      const result = listCard(form);
      if (!result.ok) {
        setInfo({
          className: "error",
          title: "Listing Failed",
          message: result.message,
          icon: "xmark-circle",
          active: true,
        });
        return;
      }

      setInfo({
        className: "success",
        title: "Listed Successfully",
        message: result.message,
        icon: "check-circle",
        active: true,
      });
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

      const listedCardId = result.listedCardId;
      if (!listedCardId) {
        setInfo({
          className: "warning",
          title: "Listed, But Not Opened",
          message: "Card listed, but failed to open details.",
          icon: "exclamation-triangle",
          active: true,
        });
        return;
      }

      navigate(`/services/gift-card/details/${listedCardId}?readonly=1`, {
        state: { readOnly: true, source: "listing" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="list-new">
      {info.active ? (
        <ErrorModal
          message={info.message}
          title={info.title}
          icon={info.icon}
          className={info.className}
          state={info.active}
          action={setInfo}
        />
      ) : null}
      <header className="card-market-header">
        <button onClick={goBack}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <h3>Buy a Gift Card</h3>
      </header>
      <form onSubmit={(event) => event.preventDefault()}>
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
        <div className="submit-btn">
          <WiXButton
            type="button"
            variant="primary"
            fullWidth
            loading={loading}
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            Submit
          </WiXButton>
        </div>
      </form>
    </section>
  );
}

export default ListNewCard;
