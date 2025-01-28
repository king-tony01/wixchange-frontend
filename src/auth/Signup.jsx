import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "/src/css/auth.css";
import { AuthContext } from "./AuthContext";
import Spinner from "../Spinner";
import ErrorModal from "../app/components/ErrorModal";
import {
  isStrongPassword,
  isValidEmail,
  isValidPhone,
} from "../../utils/helpers";
import WiXinput from "../app/components/WiXinput";
import WiXPasswordInput from "../app/components/WiXPasswordInput";

function Signup() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState({
    type: "tel",
    placeholder: "Enter phone number",
  });
  const [user, setUser] = useState({ password: "", email: "", phone: "" });
  const [complete, setComplete] = useState(
    (user.phone !== "" && user.password !== "") ||
      (user.email !== "" && user.password !== "")
  );
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

  // Dynamically calculate the `complete` state whenever the `user` object changes
  useEffect(() => {
    const isComplete =
      (tab.type === "tel" &&
        isValidPhone(user.phone) &&
        isStrongPassword(user.password)) ||
      (tab.type === "email" &&
        isValidEmail(user.email) &&
        isStrongPassword(user.password));
    setComplete(isComplete);
  }, [user, tab.type]);

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
        <WiXinput
          tab={tab}
          user={user}
          updatePhone={updatePhone}
          updateEmail={updateEmail}
        />
        <WiXPasswordInput
          user={user}
          updatePassword={updatePassword}
          visible={visible}
          setVisible={setVisible}
        />
        <small className="small-text">
          Already have an account? <Link to={"/login"}>Login now</Link>
        </small>
        <button
          className={`action-btn ${loading || !complete ? "disabled" : ""}`}
          onClick={(e) => sendForm(e, user, "/api/auth/signup")}
          disabled={loading || !complete}
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
