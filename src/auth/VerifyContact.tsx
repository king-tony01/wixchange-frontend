import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../assets/urls";
import {
  useAuthContext,
  PENDING_VERIFICATION_STORAGE_KEY,
} from "./AuthContext";
import Spinner from "../Spinner";
import ErrorModal from "../app/components/ErrorModal";
import WiXinput from "../app/components/WiXinput";

interface PendingVerificationState {
  email?: string;
  phone?: string;
  verificationChannel?: "email" | "phone";
  userId?: string;
  username?: string;
  target?: string;
}

function readPendingVerification(
  state: PendingVerificationState | null,
): PendingVerificationState | null {
  if (state && (state.email || state.phone || state.target)) {
    return state;
  }

  const stored = sessionStorage.getItem(PENDING_VERIFICATION_STORAGE_KEY);

  if (!stored) {
    return null;
  }

  try {
    const parsed = JSON.parse(stored) as PendingVerificationState;
    if (parsed.email || parsed.phone || parsed.target) {
      return parsed;
    }
  } catch {
    return null;
  }

  return null;
}

function VerifyContact() {
  const navigate = useNavigate();
  const location = useLocation();
  const { completeAuthentication } = useAuthContext();
  const [pendingVerification, setPendingVerification] =
    useState<PendingVerificationState | null>(() =>
      readPendingVerification(
        location.state as PendingVerificationState | null,
      ),
    );
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [info, setInfo] = useState({
    className: "",
    title: "",
    message: "",
    icon: "",
    active: false,
  });

  useEffect(() => {
    const resolved = readPendingVerification(
      location.state as PendingVerificationState | null,
    );
    if (resolved) {
      setPendingVerification(resolved);
    }
  }, [location.state]);

  //   useEffect(() => {
  //     if (!pendingVerification) {
  //       navigate("/signup", { replace: true });
  //     }
  //   }, [navigate, pendingVerification]);

  const displayTarget = useMemo(() => {
    if (!pendingVerification) {
      return "your email";
    }

    return (
      pendingVerification.target ||
      pendingVerification.email ||
      pendingVerification.phone ||
      "your email"
    );
  }, [pendingVerification]);

  const handleVerify = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!pendingVerification || code.trim().length !== 6) {
      setInfo({
        className: "warning",
        title: "Invalid Code",
        message: "Enter the 6-digit verification code first.",
        icon: "exclamation-triangle",
        active: true,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/auth/verify-contact`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: pendingVerification.email || undefined,
          phone: pendingVerification.phone || undefined,
          code: code.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.stat) {
        setLoading(false);
        setInfo({
          className: "error",
          title: "Verification Failed",
          message: data.message || "Could not verify your account.",
          icon: "xmark-circle",
          active: true,
        });
        return;
      }

      sessionStorage.removeItem(PENDING_VERIFICATION_STORAGE_KEY);
      completeAuthentication(data.user);
      setLoading(false);
      setSuccessMessage(
        "Your account is verified. Redirecting to your dashboard...",
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error("Verification error:", error);
      setInfo({
        className: "error",
        title: "Error",
        message: "Something went wrong. Please try again.",
        icon: "xmark-circle",
        active: true,
      });
    }
  };

  const handleResend = async () => {
    if (!pendingVerification) {
      return;
    }

    setResendLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/auth/resend-verification`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: pendingVerification.email || undefined,
          phone: pendingVerification.phone || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.stat) {
        setResendLoading(false);
        setInfo({
          className: "error",
          title: "Could not resend code",
          message: data.message || "Please try again.",
          icon: "xmark-circle",
          active: true,
        });
        return;
      }

      setResendLoading(false);
      setSuccessMessage("A fresh verification code has been sent.");
    } catch (error) {
      setResendLoading(false);
      console.error("Resend verification error:", error);
      setInfo({
        className: "error",
        title: "Error",
        message: "Something went wrong. Please try again.",
        icon: "xmark-circle",
        active: true,
      });
    }
  };

  return (
    <section className="auth" style={{ display: "grid", gap: 16 }}>
      {info.active ? (
        <ErrorModal
          message={info.message}
          title={info.title}
          icon={info.icon}
          className={info.className}
          state={info.active}
          action={setInfo}
        />
      ) : null}

      <div>
        <small
          className="small-text"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 12,
            color: "var(--primary)",
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "var(--primary)",
              display: "inline-block",
            }}
          />
          Verification step
        </small>

        <h1 className="auth-title" style={{ marginBottom: 8 }}>
          Verify your account
        </h1>

        <p className="small-text" style={{ lineHeight: 1.6, marginBottom: 18 }}>
          We sent a 6-digit code to <strong>{displayTarget}</strong>. Enter it
          below to activate your account.
        </p>

        <div
          style={{
            display: "grid",
            gap: 10,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              padding: "12px 14px",
              borderRadius: 14,
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            <div>
              <small
                className="small-text"
                style={{ display: "block", opacity: 0.8 }}
              >
                Verification target
              </small>
              <small style={{ color: "var(--light-white)", fontWeight: 600 }}>
                {displayTarget}
              </small>
            </div>
            <small
              style={{
                color: "var(--primary)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0.8,
              }}
            >
              {pendingVerification?.verificationChannel || "email"}
            </small>
          </div>

          <div
            style={{
              display: "grid",
              gap: 8,
              color: "var(--text)",
              fontSize: 13,
              lineHeight: 1.55,
            }}
          >
            <small>1. Check your inbox for the latest 6-digit code.</small>
            <small>2. Enter the code below to verify your account.</small>
            <small>3. Resend a fresh code if the old one expires.</small>
          </div>
        </div>

        <form onSubmit={handleVerify}>
          <div className="input-wrapper">
            <WiXinput
              type="text"
              value={code}
              onValueChange={(value) =>
                setCode(value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="Enter 6-digit code"
              id="verification-code"
              name="verification-code"
              autoComplete="one-time-code"
              inputMode="numeric"
              maxLength={6}
              icon="shield"
              errorMessage="Enter the 6-digit code sent to your email."
              validate={(value) => /^\d{6}$/.test(value)}
            />
          </div>

          {successMessage ? (
            <small
              className="small-text"
              style={{
                display: "block",
                marginTop: 8,
                color: "var(--primary)",
                lineHeight: 1.5,
              }}
            >
              {successMessage}
            </small>
          ) : null}

          <button
            className="action-btn"
            type="submit"
            disabled={loading || code.trim().length !== 6}
          >
            {loading ? <Spinner /> : "Verify account"}
          </button>

          <button
            type="button"
            className="action-btn"
            onClick={handleResend}
            disabled={resendLoading}
            style={{
              marginTop: 0,
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.14)",
            }}
          >
            {resendLoading ? <Spinner /> : "Resend code"}
          </button>
        </form>

        <small
          className="small-text"
          style={{ display: "block", marginTop: 12 }}
        >
          If you used a different email, go back to signup and restart the
          process.
        </small>
      </div>
    </section>
  );
}

export default VerifyContact;
