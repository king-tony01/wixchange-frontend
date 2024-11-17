import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "/src/css/authmodal.css";
import { CheckoutContext } from "./Checkout";
import { baseUrl } from "../assets/urls";
import Spinner from "../Spinner";
function AuthModal() {
  const { setOpen } = useContext(CheckoutContext);
  let [pinInput, setPinInput] = useState("");
  const [active, setActive] = useState(0);
  const [sending, setSending] = useState(false);
  function updatePinInput(input) {
    if (pinInput.length == 4) return;
    setPinInput((pinInput += input));
    if (pinInput.length > 1) setActive(active + 1);
  }

  function deleteOne() {
    if (pinInput.length == 0) return;
    setPinInput(pinInput.slice(0, -1));
    if (pinInput.length > 1) setActive(active - 1);
  }

  useEffect(() => {
    if (pinInput.length == 4) {
      setSending(true);
      const checkPin = async () => {
        try {
          const response = await fetch(`${baseUrl}/api/pin/check`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ pin: +pinInput }),
          });
          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            setSending(false);
          } else {
            const responseData = await response.json();
            console.log(responseData);
            setSending(false);
          }
        } catch (err) {
          console.log(err.message);
        }
      };
      checkPin();
    }
  }, [pinInput]);

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
        {sending ? (
          <div className="loader">
            <Spinner />
          </div>
        ) : (
          <div className="inputs">
            {[0, 0, 0, 0].map((val, index) => (
              <div className={`input ${index == active ? "active" : ""}`}>
                {pinInput.split("")[index]}
              </div>
            ))}
          </div>
        )}
        <Link>Forgot your PIN?</Link>
        <div className="pads">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((pad, index) => (
            <button
              key={index}
              onClick={(e) => updatePinInput(e.target.textContent)}
            >
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
