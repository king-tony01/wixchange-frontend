import { useEffect, useState } from "react";
import { baseUrl } from "../assets/urls";

export function useDashboardData(onUnauthorized: () => void) {
  const [userInfo, setUserInfo] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function dashboard() {
      try {
        const response = await fetch(`${baseUrl}/api/user/overview`, {
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data.data.userInfo);
          setTransactions(data.data.transactions);
          return;
        }

        if (response.status === 403 || response.status === 401) {
          onUnauthorized();
          return;
        }

        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }

    dashboard();
  }, [onUnauthorized]);

  return { userInfo, transactions };
}
