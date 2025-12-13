import React, { useEffect, useState } from "react";
import { isValidEmail, isValidPhone } from "../../../utils/helpers";

function WiXinput({ tab, user, updatePhone, updateEmail }) {
  const [touched, setTouched] = useState(false);
  const [active, setActive] = useState(false);

  const isValid =
    tab.type === "tel" ? isValidPhone(user.phone) : isValidEmail(user.email);
  const currentValue = tab.type === "tel" ? user.phone : user.email;
  const shouldShowError = touched && (!currentValue || !isValid);

  return (
    <div className={`input ${shouldShowError ? "incorrect" : ""}`}>
      <i className={`fas fa-${tab.type === "tel" ? "phone" : "envelope"}`}></i>
      <input
        type={tab.type}
        name=""
        id="phone"
        placeholder={tab.placeholder}
        value={currentValue}
        onBlur={() => {
          setActive(false);
          setTouched(true);
        }}
        onFocus={() => {
          setActive(true);
        }}
        onInput={(e) =>
          tab.type === "tel"
            ? updatePhone(e.target.value)
            : updateEmail(e.target.value)
        }
      />
      {active && shouldShowError ? (
        <div className="tooltip">
          <i className="fas fa-close"></i>{" "}
          <small>{tab.type === "tel" ? "Phone" : "Email"} is invalid!</small>
        </div>
      ) : null}
    </div>
  );
}

export default WiXinput;
