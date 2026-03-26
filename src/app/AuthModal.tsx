import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/authmodal.css";
import { CheckoutContext } from "./Checkout";
import { baseUrl } from "../assets/urls";
import Spinner from "../Spinner";
function AuthModal() {
  const { setOpen, onAuthorized } = useContext(CheckoutContext);
  const [pinInput, setPinInput] = useState("");
  const [active, setActive] = useState(0);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  function updatePinInput(input) {
    setPinInput((prev) => {
      if (prev.length === 4) return prev;
      const next = `${prev}${input}`;
      if (next.length > 1) setActive(next.length - 1);
      return next;
    });
  }

  function deleteOne() {
    if (pinInput.length === 0) return;
    const next = pinInput.slice(0, -1);
    setPinInput(next);
    setActive(Math.max(0, next.length - 1));
  }

  useEffect(() => {
    if (pinInput.length === 4) {
      setSending(true);
      setError("");
      const checkPin = async () => {
        try {
          const response = await fetch(`${baseUrl}/api/pin/verify`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ pin: +pinInput }),
          });
          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            setSending(false);
            onAuthorized();
          } else {
            const responseData = await response.json();
            console.log(responseData);
            setSending(false);
            setError(responseData.message || "Invalid PIN. Please try again.");
            setPinInput("");
            setActive(0);
          }
        } catch (err) {
          console.log(err.message);
          setSending(false);
          setError("Could not verify PIN. Please check your connection.");
          setPinInput("");
          setActive(0);
        }
      };
      checkPin();
    } else {
      setError("");
    }
  }, [pinInput, onAuthorized]);

  return (
    <section className="auth-modal">
      <div className="auth-modal-wrapper">
        <div className="auth-header">
          <i className="fas fa-lock"></i>
          <p>Authorization</p>
        </div>
        <i
          className="fas fa-close"
          onClick={() => {
            setSending(false);
            setOpen(false);
          }}
        ></i>
        <small className="hint">
          Please enter your authorization PIN to authorize
        </small>
        {error ? (
          <small style={{ color: "#ef4444", textAlign: "center" }}>
            {error}
          </small>
        ) : null}
        {sending ? (
          <div className="loader">
            <Spinner />
          </div>
        ) : (
          <div className="inputs">
            {[0, 0, 0, 0].map((val, index) => (
              <div
                key={index}
                className={`input ${index === active ? "active" : ""}`}
              >
                {pinInput.split("")[index]}
              </div>
            ))}
          </div>
        )}
        <Link to="#" onClick={(e) => e.preventDefault()}>
          Forgot your PIN?
        </Link>
        <div className="pads">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((pad, index) => (
            <button key={index} onClick={() => updatePinInput(pad)}>
              {pad}
            </button>
          ))}
          <button onClick={deleteOne}>
            <i className="fas fa-delete-left"></i>
          </button>
        </div>
      </div>
    </section>
  );
}

export default AuthModal;
