import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../css/hometab.css";
import "../css/cards.css";
import "../css/services.css";
import "../css/giftcards.css";
import "../css/menu.css";
import WalletCard from "./WalletCard";
import QuickActions from "./QuickActions";
import Grid from "./Grid";
import { cards } from "../../test";
import { TopBarIcons } from "../assets/icons/topBarIcons";
import LoadingPage from "./components/LoadingPage";
import { HomeContext } from "../contexts/HomeContext";
function HomeTab() {
  const { userInfo } = useContext(HomeContext);

  if (!userInfo) {
    return <LoadingPage />;
  }

  const { firstName, email, phone } = userInfo;

  return (
    <section className="hometab">
      <header className="home-header">
        <div className="header-left">
          <i className="fas fa-user-circle"></i>
          <div>
            <small>Good day! 👋</small>
            <p>
              {userInfo ? (
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
        <div className="header-right">
          <Link to="#" onClick={(e) => e.preventDefault()}>
            {TopBarIcons.search}
          </Link>
          <Link to="#" onClick={(e) => e.preventDefault()}>
            {TopBarIcons.cart}
          </Link>
          <Link to="#" onClick={(e) => e.preventDefault()}>
            {TopBarIcons.bell}
            <span className="notice">2</span>
          </Link>
        </div>
      </header>
      <WalletCard balance={parseInt(userInfo.accountBalance)} />
      <QuickActions />
      <h3>Top Selling Cards</h3>
      <Grid list={cards[0].data.slice(0, 3)} type={"cards"} />
      <h3>Quick Top-up</h3>
      <Grid list={[1, 2, 3]} type={"vtu"} />
    </section>
  );
}

export default HomeTab;
