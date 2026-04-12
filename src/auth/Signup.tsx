import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/auth.css";
import { useAuthContext } from "./AuthContext";
import Spinner from "../Spinner";
import ErrorModal from "../app/components/ErrorModal";
import WiXinput from "../app/components/WiXinput";
import WiXPasswordInput from "../app/components/WiXPasswordInput";
import { useAuthForm } from "../hooks/useAuthForm";

function Signup() {
  const [visible, setVisible] = useState(false);
  const { user, complete, updatePassword, updateEmail } = useAuthForm();

  const { sendForm, loading, info, setInfo } = useAuthContext();

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
      <small
        className="small-text"
        style={{
          display: "block",
          marginBottom: "14px",
          lineHeight: 1.5,
        }}
      >
        We&apos;ll send a verification code to your email after signup. Verify
        it to activate your account.
      </small>
      <form action="">
        <div className="input-wrapper">
          <WiXinput
            type="email"
            value={user.email}
            onValueChange={updateEmail}
            placeholder="Enter email address"
            id="email"
            name="email"
            autoComplete="email"
          />
        </div>
        <div className="input-wrapper">
          <WiXPasswordInput
            user={user}
            updatePassword={updatePassword}
            visible={visible}
            setVisible={setVisible}
          />
        </div>

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
