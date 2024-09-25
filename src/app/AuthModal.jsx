import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "/src/css/authmodal.css";
const url = `https://wixchange-backend.onrender.com`;
import { CheckoutContext } from "./Checkout";
function AuthModal() {
  const { setOpen } = useContext(CheckoutContext);
  let [pinInput, setPinInput] = useState("");
  const [active, setActive] = useState(0);
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
      const checkPin = async () => {
        try {
          const response = await fetch(`${url}/api/pin/check`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ pin: +pinInput }),
          });
          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
          } else {
            const responseData = await response.json();
            console.log(responseData);
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
        <i className="fas fa-close" onClick={() => setOpen(false)}></i>
        <small className="hint">
          Please enter your authorization PIN to authorize
        </small>
        <div className="inputs">
          {[0, 0, 0, 0].map((val, index) => (
            <div className={`input ${index == active ? "active" : ""}`}>
              {pinInput.split("")[index]}
            </div>
          ))}
        </div>
        <Link>Forgot your PIN?</Link>
        <div className="pads">
          <button onClick={(e) => updatePinInput(e.target.textContent)}>
            1
          </button>
          <button onClick={(e) => updatePinInput(e.target.textContent)}>
            2
          </button>
          <button onClick={(e) => updatePinInput(e.target.textContent)}>
            3
          </button>
          <button onClick={(e) => updatePinInput(e.target.textContent)}>
            4
          </button>
          <button onClick={(e) => updatePinInput(e.target.textContent)}>
            5
          </button>
          <button onClick={(e) => updatePinInput(e.target.textContent)}>
            6
          </button>
          <button onClick={(e) => updatePinInput(e.target.textContent)}>
            7
          </button>
          <button onClick={(e) => updatePinInput(e.target.textContent)}>
            8
          </button>
          <button onClick={(e) => updatePinInput(e.target.textContent)}>
            9
          </button>
          <button onClick={(e) => updatePinInput(e.target.textContent)}>
            0
          </button>
          <button onClick={deleteOne}>
            <i className="fas fa-delete-left"></i>
          </button>
        </div>
      </div>
    </section>
  );
}

export default AuthModal;
