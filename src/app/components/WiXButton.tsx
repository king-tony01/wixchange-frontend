import React from "react";
import Spinner from "../../Spinner";
import "../../css/buttons.css";

type WiXButtonVariant = "primary" | "secondary" | "ghost";

interface WiXButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: WiXButtonVariant;
  fullWidth?: boolean;
  loading?: boolean;
}

function WiXButton({
  variant = "primary",
  fullWidth = false,
  loading = false,
  disabled,
  className = "",
  children,
  ...rest
}: WiXButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...rest}
      disabled={isDisabled}
      className={`wix-button wix-button--${variant} ${fullWidth ? "wix-button--full" : ""} ${isDisabled ? "is-disabled" : ""} ${className}`.trim()}
    >
      {loading ? (
        <Spinner size={24} />
      ) : (
        <span className="wix-button-label">{children}</span>
      )}
    </button>
  );
}

export default WiXButton;
