import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "/src/css/auth.css";
import { AuthContext } from "./AuthContext";
import Spinner from "../Spinner";
import ErrorModal from "../app/components/ErrorModal";
import { TEST_API_TOKEN, vtuUrl } from "../assets/urls";
import {
  isValidPhone,
  isStrongPassword,
  isValidEmail,
} from "../../utils/helpers";
import WiXinput from "../app/components/WiXinput";
import WiXPasswordInput from "../app/components/WiXPasswordInput";

function Login() {
  const [active, setActive] = useState(0);
  const [error, setError] = useState(null);
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
    setUser({ ...user, phone: input });
  };
  const updateEmail = (input) => {
    setUser({ ...user, email: input });
  };
  const { sendForm, loading, setLoading, info, setInfo } =
    useContext(AuthContext);

  useEffect(() => {
    async function getNumberOperator() {
      try {
        const response = await fetch(`${vtuUrl}fetch_data_plans`, {
          method: "POST",
          headers: {
            "Api-Token": TEST_API_TOKEN,
            "Request-Id": Date.now().toString(),
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            operator: "MTN",
          }),
          mode: "cors",
          credentials: "omit",
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    /* setComplete(
      (user.email !== "" && user.password !== "") ||
        (user.phone !== "" && user.password !== "")
    );*/

    getNumberOperator();
  }, []);

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
          Don't have an account? <Link to={"/signup"}>Create one now</Link>
        </small>
        <button
          className={`action-btn ${loading || !complete ? "disabled" : ""}`}
          onClick={(e) => sendForm(e, user, "/api/auth/login")}
          disabled={loading || !complete}
        >
          {loading ? <Spinner /> : ` Login`}
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
