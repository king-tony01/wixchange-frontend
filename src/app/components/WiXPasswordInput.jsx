import React, { useEffect, useState } from "react";
import { isStrongPassword } from "../../../utils/helpers";

function WiXPasswordInput({ user, updatePassword, visible, setVisible }) {
  const [touched, setTouched] = useState(false);
  const [active, setActive] = useState(false);

  const isValid = isStrongPassword(user.password);
  const shouldShowError = touched && (!user.password || !isValid);

  return (
    <div className={`input ${shouldShowError ? "incorrect" : ""}`}>
      <i className="fas fa-key"></i>
      <input
        type={visible ? "text" : "password"}
        name=""
        id="password"
        placeholder="Set password"
        value={user.password}
        onBlur={() => {
          setActive(false);
          setTouched(true);
        }}
        onFocus={() => {
          setActive(true);
        }}
        onInput={(e) => {
          updatePassword(e.target.value);
        }}
      />
      <i
        className={visible ? "fas fa-eye" : "fas fa-eye-slash"}
        onClick={() => setVisible(!visible)}
      ></i>
      {active && shouldShowError ? (
        <div className="tooltip password">
          <i className="fas fa-close"></i>{" "}
          <small>
            Password must contain at least an uppercase, a lowercase, a special
            character, a digit, and at least 8 characters long!
          </small>
        </div>
      ) : null}
    </div>
  );
}

export default WiXPasswordInput;
