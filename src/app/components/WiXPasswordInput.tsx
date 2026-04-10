import WiXinput from "./WiXinput";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

function WiXPasswordInput({ user, updatePassword, visible, setVisible }) {
  return (
    <WiXinput
      type={visible ? "text" : "password"}
      value={user.password}
      onValueChange={updatePassword}
      placeholder="Set password"
      id="password"
      name="password"
      autoComplete="new-password"
      errorMessage="Password must contain at least an uppercase, a lowercase, a special character, a digit, and be at least 8 characters long!"
      trailingIconClassName={visible ? "fas fa-eye" : "fas fa-eye-slash"}
      onTrailingIconClick={() => setVisible(!visible)}
      tooltipClassName="password"
      validate={(value) => PASSWORD_REGEX.test(value)}
    />
  );
}

export default WiXPasswordInput;
