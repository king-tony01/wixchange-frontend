import React, { useEffect, useState } from "react";
import { isStrongPassword } from "../../../utils/helpers";

function WiXPasswordInput({ user, updatePassword, visible, setVisible }) {
  const [correct, setCorrect] = useState(false);
  const [active, setActive] = useState(false);
  useEffect(() => {
    setCorrect(isStrongPassword(user.password));
  }, [user]);
  return (
    <div className={`input ${!correct ? "incorrect" : ""}`}>
      <i className="fas fa-key"></i>
      <input
        type={visible ? "text" : "password"}
        name=""
        id="password"
        placeholder="Set password"
        value={user.password}
        onBlur={() => {
          setCorrect(true);
          setActive(false);
        }}
        onFocus={() => {
          setCorrect(isStrongPassword(user.password));
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
      {active && !correct ? (
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
