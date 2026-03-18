import { useMemo, useState } from "react";
import {
  isStrongPassword,
  isValidEmail,
  isValidPhone,
} from "../../utils/helpers";

const EMPTY_USER: AuthUser = {
  password: "",
  email: "",
  phone: "",
};

export function useAuthForm() {
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState<AuthTab>({
    type: "tel",
    placeholder: "Enter phone number",
  });
  const [user, setUser] = useState<AuthUser>(EMPTY_USER);

  const switchTab = (index: number) => {
    setActive(index);
    setUser(EMPTY_USER);

    if (index === 1) {
      setTab({ type: "email", placeholder: "Enter email address" });
      return;
    }

    setTab({ type: "tel", placeholder: "Enter phone number" });
  };

  const updatePassword = (input: string) => {
    setUser((prev) => ({ ...prev, password: input }));
  };

  const updatePhone = (input: string) => {
    setUser((prev) => ({ ...prev, phone: input }));
  };

  const updateEmail = (input: string) => {
    setUser((prev) => ({ ...prev, email: input }));
  };

  const complete = useMemo(() => {
    if (tab.type === "tel") {
      return isValidPhone(user.phone) && isStrongPassword(user.password);
    }

    return isValidEmail(user.email) && isStrongPassword(user.password);
  }, [tab.type, user.phone, user.email, user.password]);

  return {
    active,
    tab,
    user,
    complete,
    switchTab,
    updatePassword,
    updatePhone,
    updateEmail,
  };
}
