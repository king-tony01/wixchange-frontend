import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../assets/urls";

export const HomeContext = createContext();

function HomeProvider({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("wix_user"));
  const [vtuList, setVtuList] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    async function dashboard() {
      try {
        const response = await fetch(
          `${baseUrl}/api/user/${user.id}/overview`,
          {
            mode: "cors",
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUserInfo(data.data.userInfo);
          setTransactions(data.data.transactions);
        } else if (response.status == 403) {
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
              operator: operator, // Send one operator per request
            }),
            mode: "cors",
            credentials: "omit",
          });

          const data = await response.json();
          results.push(data);
        }

        console.log("Combined Results:", results);
      } catch (err) {
        console.error("Error fetching data plans:", err);
      }
    }

    fetchVTUServices();
  }, []);

  return (
    <HomeContext.Provider value={{ userInfo, vtuList, transactions }}>
      {children}
    </HomeContext.Provider>
  );
}

export default HomeProvider;
