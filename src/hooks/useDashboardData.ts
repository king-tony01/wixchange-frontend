import { useEffect, useState } from "react";
import { baseUrl } from "../assets/urls";

export function useDashboardData(
  token: string | null,
  onUnauthorized: () => void,
) {
  const [userInfo, setUserInfo] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!token) {
      onUnauthorized();
      return;
    }

    async function dashboard() {
      try {
        const response = await fetch(`${baseUrl}/api/user/overview`, {
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
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
  }, [token, onUnauthorized]);

  return { userInfo, transactions };
}
