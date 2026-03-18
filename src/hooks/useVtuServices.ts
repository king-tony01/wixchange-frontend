import { useEffect, useState } from "react";
import { TEST_API_TOKEN, vtuUrl } from "../assets/urls";

export function useVtuServices() {
  const [vtuList, setVtuList] = useState([]);

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
              operator,
            }),
            mode: "cors",
            credentials: "omit",
          });

          const data = await response.json();
          results.push(data);
        }

        setVtuList(results);
      } catch (err) {
        console.error("Error fetching data plans:", err);
      }
    }

    fetchVTUServices();
  }, []);

  return vtuList;
}
