import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../css/auth.css";
import { AuthContext } from "./AuthContext";
import Spinner from "../Spinner";
import ErrorModal from "../app/components/ErrorModal";
import WiXinput from "../app/components/WiXinput";
import WiXPasswordInput from "../app/components/WiXPasswordInput";
import { useAuthForm } from "../hooks/useAuthForm";

function Signup() {
  const [visible, setVisible] = useState(false);
  const {
    active,
    tab,
    user,
    complete,
    switchTab,
    updatePassword,
    updatePhone,
    updateEmail,
  } = useAuthForm();

  const { sendForm, loading, info, setInfo } = useContext(AuthContext);

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
            key={item}
            className={index === active ? "active" : ""}
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
