import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const url = `https://wixchange-backend.onrender.com`;
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [loggedIn, setLoggedin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendForm = async (event, user) => {
    event.preventDefault();
    if (Object.values(user).some((value) => value == "")) {
      alert("Please provide all details");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/auth/login`, {
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
      } else {
        const resData = await response.json();
        console.log(resData);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn]);*/
  return (
    <AuthContext.Provider value={{ loggedIn, sendForm, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
