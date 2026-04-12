import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../assets/urls";

export const PENDING_VERIFICATION_STORAGE_KEY = "wix_pending_verification";

interface AuthInfoState {
  className: string;
  title: string;
  message: string;
  icon: string;
  active: boolean;
}

interface AuthFormUser {
  email?: string;
  phone?: string;
  password: string;
}

interface PendingVerificationState {
  email?: string;
  phone?: string;
  verificationChannel?: "email" | "phone";
  userId?: string;
  username?: string;
  target?: string;
}

interface AuthContextValue {
  loggedIn: boolean;
  authChecking: boolean;
  sendForm: (
    event: React.MouseEvent<HTMLElement>,
    user: AuthFormUser,
    endpoint: string,
  ) => Promise<void>;
  completeAuthentication: (userData: any) => void;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  PK: string;
  billsAPI: string;
  info: AuthInfoState;
  setInfo: Dispatch<SetStateAction<AuthInfoState>>;
  userData: any;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}

function AuthProvider({ children }: { children: ReactNode }) {
  const PK = "ps_pk_test_EjH78aAljllbl9Pr0hXX3QxRzHHKJW";
  const billsAPI =
    "https://sandbox.payscribe.ng/api/v1//bouquets/?service=dstv";
  const [loggedIn, setLoggedin] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [info, setInfo] = useState({
    className: "",
    title: "",
    message: "",
    icon: "",
    active: false,
  });
  const navigate = useNavigate();
  const location = useLocation();

  const savePendingVerification = (data: PendingVerificationState): void => {
    sessionStorage.setItem(
      PENDING_VERIFICATION_STORAGE_KEY,
      JSON.stringify(data),
    );
  };

  const clearPendingVerification = (): void => {
    sessionStorage.removeItem(PENDING_VERIFICATION_STORAGE_KEY);
  };

  const completeAuthentication = (userData: any): void => {
    setUserData(userData);
    setLoggedin(true);
    clearPendingVerification();
  };

  // Check if user is logged in by attempting to access a protected route
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/user/overview`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.user || data);
          setLoggedin(true);
        } else {
          setLoggedin(false);
        }
      } catch (err) {
        setLoggedin(false);
      } finally {
        setAuthChecking(false);
      }
    };

    checkAuthStatus();
  }, []);

  const sendForm = async (
    event: React.MouseEvent<HTMLElement>,
    user: AuthFormUser,
    endpoint: string,
  ) => {
    event.preventDefault();
    if (user.password === "" || (user.email === "" && user.phone === "")) {
      setInfo({
        className: "warning",
        title: "Incomplete Input!",
        message: "Please provide and fill all fields.",
        icon: "exclamation-triangle",
        active: true,
      });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        mode: "cors",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (endpoint.includes("/signup") && data.stat && data.user) {
          const pendingVerification: PendingVerificationState = {
            email: data.user.email || user.email,
            phone: data.user.phone || user.phone,
            verificationChannel: data.user.verificationChannel,
            userId: data.user.id,
            username: data.user.username,
            target:
              data.user.email || data.user.phone || user.email || user.phone,
          };

          savePendingVerification(pendingVerification);
          setLoggedin(false);
          setUserData(null);
          setLoading(false);
          navigate("/verify-contact", {
            state: pendingVerification,
          });
          return;
        }

        if (data.stat && data.user) {
          // Token is now stored in HttpOnly cookie automatically
          completeAuthentication(data.user);
          setLoading(false);
          navigate("/");
        } else {
          setLoading(false);
          setInfo({
            className: "error",
            title: "Authentication Failed!",
            message: "Please try again.",
            icon: "xmark-circle",
            active: true,
          });
        }
      } else {
        const resData = await response.json();
        if (response.status === 403 && resData?.user) {
          const pendingVerification: PendingVerificationState = {
            email: resData.user.email || user.email,
            phone: resData.user.phone || user.phone,
            verificationChannel: resData.user.verificationChannel,
            userId: resData.user.id,
            username: resData.user.username,
            target:
              resData.user.email ||
              resData.user.phone ||
              user.email ||
              user.phone,
          };

          savePendingVerification(pendingVerification);
          setLoading(false);
          navigate("/verify-contact", {
            state: pendingVerification,
          });
          return;
        }

        if (response.status === 404) {
          setInfo({
            className: "error",
            title: "Invalid Credentials!",
            message: resData.message,
            icon: "xmark-circle",
            active: true,
          });
        }
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.error("An error occurred:", err);
      setInfo({
        className: "error",
        title: "Error",
        message: "Something went wrong. Please try again.",
        icon: "xmark-circle",
        active: true,
      });
    }
  };

  const logout = async () => {
    try {
      await fetch(`${baseUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoggedin(false);
      setUserData(null);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (authChecking) {
      return;
    }

    const isPublicRoute =
      location.pathname === "/login" ||
      location.pathname === "/signup" ||
      location.pathname === "/verify-contact";

    if (!loggedIn && !isPublicRoute) {
      navigate("/login");
    }
  }, [authChecking, loggedIn, location.pathname, navigate]);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        authChecking,
        sendForm,
        completeAuthentication,
        loading,
        setLoading,
        PK,
        billsAPI,
        info,
        setInfo,
        userData,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
