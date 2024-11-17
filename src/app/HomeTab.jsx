import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "/src/css/hometab.css";
import "/src/css/cards.css";
import "/src/css/services.css";
import "/src/css/giftcards.css";
import "/src/css/menu.css";
import WalletCard from "./WalletCard";
import QuickActions from "./QuickActions";
import CardsList from "./CardsList";
import Grid from "./Grid";
import { cards } from "../../test";
import { TopBarIcons } from "../assets/icons/topBarIcons";
import { AuthContext } from "../auth/AuthContext";
import { baseUrl, TEST_API_TOKEN, vtuUrl } from "../assets/urls";
import LoadingPage from "./components/LoadingPage";
function HomeTab() {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("wix_user"));
  const [vtuList, setVtuList] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

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

  if (!userInfo) {
    return <LoadingPage />;
  }

  const { firstName, email, phone } = userInfo;

  return (
    <section className='hometab'>
      <header className='home-header'>
        <div className='header-left'>
          <i className='fas fa-user-circle'></i>
          <div>
            <small>Good day! 👋</small>
            <p>
              {user ? (
                firstName ? (
                  firstName
                ) : email ? (
                  email.split("@")[0]
                ) : (
                  <span>{phone}</span>
                )
              ) : (
                <span>Loading...</span>
              )}
            </p>
          </div>
        </div>
        <div className='header-right'>
          <Link>{TopBarIcons.search}</Link>
          <Link>{TopBarIcons.cart}</Link>
          <Link>
            {TopBarIcons.bell}
            <span className='notice'>2</span>
          </Link>
        </div>
      </header>
      <WalletCard balance={userInfo.accountBalance} />
      <QuickActions />
      <h3>Top Selling Cards</h3>
      <Grid list={cards[0].data.slice(0, 3)} type={"cards"} />
      <h3>Quick Top-up</h3>
      <Grid list={[1, 2, 3]} type={"vtu"} />
    </section>
  );
}

export default HomeTab;
