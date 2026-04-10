import React, { useMemo, useState } from "react";
import {
  isStrongPassword,
  isValidEmail,
  isValidPhone,
} from "../../../utils/helpers";

type WiXInputType =
  | "text"
  | "email"
  | "tel"
  | "password"
  | "number"
  | "search"
  | "url";

interface WiXinputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange" | "placeholder"
> {
  type?: WiXInputType;
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  icon?: string;
  validate?: (value: string) => boolean;
  errorMessage?: string;
  trailingIconClassName?: string;
  onTrailingIconClick?: () => void;
  containerClassName?: string;
  inputClassName?: string;
  tooltipClassName?: string;
}

const DEFAULT_ICONS: Record<WiXInputType, string> = {
  text: "pen",
  email: "envelope",
  tel: "phone",
  password: "key",
  number: "hashtag",
  search: "search",
  url: "link",
};

function WiXinput({
  type = "text",
  value,
  onValueChange,
  placeholder,
  icon,
  validate,
  errorMessage,
  trailingIconClassName,
  onTrailingIconClick,
  containerClassName = "",
  inputClassName = "",
  tooltipClassName = "",
  id,
  name,
  className,
  required,
  onBlur,
  onFocus,
  ...rest
}: WiXinputProps) {
  const [touched, setTouched] = useState(false);
  const [active, setActive] = useState(false);

  const isValid = useMemo(() => {
    if (validate) {
      return validate(value);
    }

    if (type === "email") {
      return isValidEmail(value);
    }

    if (type === "tel") {
      return isValidPhone(value);
    }

    if (type === "password") {
      return isStrongPassword(value);
    }

    return value.trim().length > 0;
  }, [type, validate, value]);

  const shouldShowError =
    touched && (required !== false ? !value || !isValid : !isValid);
  const resolvedIcon = icon || DEFAULT_ICONS[type] || "pen";
  const resolvedErrorMessage =
    errorMessage ||
    (type === "tel"
      ? "Phone is invalid!"
      : type === "email"
        ? "Email is invalid!"
        : type === "password"
          ? "Password is invalid!"
          : "This field is invalid!");

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    setActive(false);
    setTouched(true);
    onBlur?.(event);
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
    setActive(true);
    onFocus?.(event);
  };

  return (
    <div
      className={`input ${shouldShowError ? "incorrect" : ""} ${containerClassName}`.trim()}
    >
      <i className={`fas fa-${resolvedIcon}`}></i>
      <input
        {...rest}
        id={id || name || type}
        name={name || id || type}
        type={type}
        placeholder={placeholder}
        value={value}
        className={`${className || ""} ${inputClassName}`.trim()}
        aria-invalid={shouldShowError}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={(event) => onValueChange(event.target.value)}
      />
      {trailingIconClassName ? (
        <i
          className={trailingIconClassName}
          onClick={onTrailingIconClick}
          style={{ cursor: onTrailingIconClick ? "pointer" : "default" }}
        ></i>
      ) : null}
      {active && shouldShowError ? (
        <div className={`tooltip ${tooltipClassName}`.trim()}>
          <i className="fas fa-close"></i> <small>{resolvedErrorMessage}</small>
        </div>
      ) : null}
    </div>
  );
}

export default WiXinput;
