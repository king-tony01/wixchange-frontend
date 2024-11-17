import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../assets/urls";
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const PK = "ps_pk_test_EjH78aAljllbl9Pr0hXX3QxRzHHKJW";
  const billsAPI =
    "https://sandbox.payscribe.ng/api/v1//bouquets/?service=dstv";
  const [loggedIn, setLoggedin] = useState(
    JSON.parse(localStorage.getItem("wix_user"))
  );
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [info, setInfo] = useState({
    className: "",
    title: "",
    message: "",
    icon: "",
    active: false,
  });
  const navigate = useNavigate();

  const sendForm = async (event, user, endpoint) => {
    event.preventDefault();
    if (
      (user.password == "" && user.email == "") ||
      (user.password == "" && user.phone == "")
    ) {
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.stat) {
          localStorage.setItem("wix_user", JSON.stringify({ ...data.user }));
          setUserData(data.user);
          setLoggedin(true);
          navigate("/");
        }
      } else {
        const resData = await response.json();
        if (response.status == 404) {
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
      setLoading(false); // Ensure loading is false in case of an error
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

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn, navigate]);
  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        sendForm,
        loading,
        setLoading,
        PK,
        billsAPI,
        info,
        setInfo,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
