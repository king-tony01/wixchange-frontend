import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "/src/css/auth.css";
import { AuthContext } from "./AuthContext";
import Spinner from "../Spinner";
import ErrorModal from "../app/components/ErrorModal";

function Signup() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState({
    type: "tel",
    placeholder: "Enter phone number",
  });
  const [user, setUser] = useState({ password: "", email: "", phone: "" });
  const switchTab = (index) => {
    setActive(index);
    setUser({ password: "", email: "", phone: "" });
    if (index == 1) {
      setTab({ type: "email", placeholder: "Enter email address" });
    } else {
      setTab({ type: "tel", placeholder: "Enter phone number" });
    }
  };
  const updatePassword = (input) => {
    setUser({ ...user, password: input });
  };
  const updatePhone = (input) => {
    console.log(input);
    console.log(user);

    setUser({ ...user, phone: input });
  };
  const updateEmail = (input) => {
    console.log(input);
    setUser({ ...user, email: input });
  };

  const { sendForm, loading, setLoading, info, setInfo } =
    useContext(AuthContext);

  return (
    <section className="auth">
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
      <h1 className="auth-title">Sign Up</h1>
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
            value={tab.type == "tel" ? user.phone : user.email}
            onInput={(e) =>
              tab.type == "tel"
                ? updatePhone(e.target.value)
                : updateEmail(e.target.value)
            }
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
          Already have an account? <Link to={"/login"}>Login now</Link>
        </small>
        <button
          className="action-btn"
          onClick={(e) => sendForm(e, user, "/api/auth/signup")}
        >
          {loading ? <Spinner /> : `Signup`}
        </button>
      </form>
      <div className="company">
        <small>Powered By</small>
        <small>KingTony Technologies</small>
      </div>
    </section>
  );
}

export default Signup;
