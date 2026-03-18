type AuthMode = "tel" | "email";

interface AuthTab {
  type: AuthMode;
  placeholder: string;
}

interface AuthUser {
  password: string;
  email: string;
  phone: string;
}
