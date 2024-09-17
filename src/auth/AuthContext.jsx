import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

function AuthProvider({ childred }) {
  const [loggedIn, setLoggedin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn) {
    }
  }, []);
  return <AuthContext.Provider>{childred}</AuthContext.Provider>;
}
