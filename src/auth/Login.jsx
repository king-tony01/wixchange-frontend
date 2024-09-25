import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "/src/css/auth.css";
import { AuthContext } from "./AuthContext";

function Login() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState({
    type: "tel",
    placeholder: "Enter phone number",
  });
  const [user, setUser] = useState({ password: "", credential: "" });
  const switchTab = (index) => {
    setActive(index);
    setUser({ password: "", credential: "" });
    if (index == 1) {
      setTab({ type: "email", placeholder: "Enter email address" });
    } else {
      setTab({ type: "tel", placeholder: "Enter phone number" });
    }
  };
  const updatePassword = (input) => {
    setUser({ ...user, password: input });
  };
  const updateCredential = (input) => {
    setUser({ ...user, credential: input });
  };

  const { sendForm, loading, setLoading } = useContext(AuthContext);

  return (
    <section className="auth">
      <h1 className="auth-title">Login</h1>
      <div className="tabs">
        {["Phone", "Email"].map((item, index) => (
          <button
            className={index == active ? "active" : ""}
            onClick={() => switchTab(index)}
          >
            {item}
          </button>
        ))}
      </div>
      <form action="">
        <div className="input">
          <i
            className={`fas fa-${tab.type == "tel" ? "phone" : "envelope"}`}
          ></i>
          <input
            type={tab.type}
            name=""
            id="phone"
            placeholder={tab.placeholder}
            value={user.credential}
            onInput={(e) => updateCredential(e.target.value)}
          />
        </div>
        <div className="input">
          <i className="fas fa-key"></i>
          <input
            type={visible ? "text" : "password"}
            name=""
            id="password"
            placeholder="Set password"
            value={user.password}
            onInput={(e) => updatePassword(e.target.value)}
          />
          <i
            className={visible ? "fas fa-eye" : "fas fa-eye-slash"}
            onClick={() => setVisible(!visible)}
          ></i>
        </div>
        <small className="small-text">
          Don't have an account? <Link to={"/signup"}>Create one now</Link>
        </small>
        <button className="action-btn" onClick={(e) => sendForm(e, user)}>
          {loading ? <span className="spinner"></span> : ` Login`}
        </button>
      </form>
      <div className="company">
        <small>Powered By</small>
        <small>KingTony Technologies</small>
      </div>
    </section>
  );
}

export default Login;
