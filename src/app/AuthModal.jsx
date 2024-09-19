import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "/src/css/authmodal.css";
import { CheckoutContext } from "./Checkout";
function AuthModal() {
  const { setOpen } = useContext(CheckoutContext);
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
          <div className="input active"></div>
          <div className="input"></div>
          <div className="input"></div>
          <div className="input"></div>
        </div>
        <Link>Forgot your PIN?</Link>
        <div className="pads">
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>0</button>
          <button>
            <i className="fas fa-delete-left"></i>
          </button>
        </div>
      </div>
    </section>
  );
}

export default AuthModal;
