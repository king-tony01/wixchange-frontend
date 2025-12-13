import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl, vtuUrl, TEST_API_TOKEN } from "../assets/urls";

export const HomeContext = createContext();

function HomeProvider({ children }) {
  const navigate = useNavigate();
  const [vtuList, setVtuList] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("wix_token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
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
          console.log(data);
          setUserInfo(data.data.userInfo);
          setTransactions(data.data.transactions);
        } else if (response.status === 403 || response.status === 401) {
          navigate("/login");
        } else {
          const data = await response.json();
          console.log(data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    dashboard();
  }, [token, navigate, baseUrl]);

  useEffect(() => {
    async function fetchVTUServices() {
      const operators = ["MTN", "Airtel", "9mobile", "Glo"];
      const results = [];

      try {
        for (const operator of operators) {
          const response = await fetch(`${vtuUrl}fetch_data_plans`, {
            method: "POST",
            headers: {
              "Api-Token": TEST_API_TOKEN,
              "Request-Id": Date.now().toString(),
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              operator: operator,
            }),
            mode: "cors",
            credentials: "omit",
          });

          const data = await response.json();
          results.push(data);
          setVtuList(results);
        }

        console.log("Combined Results:", results);
      } catch (err) {
        console.error("Error fetching data plans:", err);
      }
    }

    fetchVTUServices();
  }, [vtuUrl, TEST_API_TOKEN]);

  return (
    <HomeContext.Provider value={{ userInfo, vtuList, transactions }}>
      {children}
    </HomeContext.Provider>
  );
}

export default HomeProvider;
