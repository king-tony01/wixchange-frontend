import React, { useEffect, useState } from "react";
import { isValidEmail, isValidPhone } from "../../../utils/helpers";

function WiXinput({ tab, user, updatePhone, updateEmail }) {
  const [correct, setCorrect] = useState(false);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const isComplete =
      (tab.type === "tel" && isValidPhone(user.phone)) ||
      (tab.type === "email" && isValidEmail(user.email));
    setCorrect(isComplete);
  }, [user, tab.type]);
  return (
    <div className={`input ${!correct ? "incorrect" : ""}`}>
      <i className={`fas fa-${tab.type == "tel" ? "phone" : "envelope"}`}></i>
      <input
        type={tab.type}
        name=""
        id="phone"
        placeholder={tab.placeholder}
        value={tab.type == "tel" ? user.phone : user.email}
        onBlur={() => {
          setCorrect(true);
          setActive(false);
        }}
        onFocus={() => {
          setCorrect(
            tab.type == "tel"
              ? isValidPhone(user.phone)
              : isValidEmail(user.email)
          );
          setActive(true);
        }}
        onInput={(e) =>
          tab.type == "tel"
            ? updatePhone(e.target.value)
            : updateEmail(e.target.value)
        }
      />
      {active && !correct ? (
        <div className="tooltip">
          <i className="fas fa-close"></i>{" "}
          <small>{tab.type == "tel" ? "Phone" : "Email"} is invalid!</small>
        </div>
      ) : null}
    </div>
  );
}

export default WiXinput;
