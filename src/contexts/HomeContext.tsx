import { createContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboardData } from "../hooks/useDashboardData.ts";
import { useVtuServices } from "../hooks/useVtuServices.ts";

export const HomeContext = createContext({
  userInfo: null,
  vtuList: [],
  transactions: [],
});

function HomeProvider({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("wix_token");
  const redirectToLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const { userInfo, transactions } = useDashboardData(token, redirectToLogin);
  const vtuList = useVtuServices();

  return (
    <HomeContext.Provider value={{ userInfo, vtuList, transactions }}>
      {children}
    </HomeContext.Provider>
  );
}

export default HomeProvider;
