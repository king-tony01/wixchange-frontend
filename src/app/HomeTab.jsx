import React from "react";
import { Link } from "react-router-dom";
import search from "/src/assets/search.png";
import cart from "/src/assets/cart.png";
import bell from "/src/assets/bell.png";
import "/src/css/hometab.css";
import "/src/css/cards.css";
import WalletCard from "./WalletCard";
import QuickActions from "./QuickActions";
import CardsList from "./CardsList";
import Grid from "./Grid";
function HomeTab() {
  return (
    <section className="hometab">
      <header>
        <div className="header-left">
          <i className="fas fa-user-circle"></i>
          <div>
            <small>Good day! 👋</small>
            <p>Wisdom</p>
          </div>
        </div>
        <div className="header-right">
          <Link>
            <img src={search} alt="" />
          </Link>
          <Link>
            <img src={cart} alt="" />
          </Link>
          <Link>
            <img src={bell} alt="" />
            <span className="notice">2</span>
          </Link>
        </div>
      </header>
      <WalletCard />
      <QuickActions />
      <h3>Top Selling Cards</h3>
      <Grid list={[1, 2, 3]} type={"cards"} />
      <h3>Quick Top-up</h3>
      <Grid list={[1, 2, 3]} type={"vtu"} />
    </section>
  );
}

export default HomeTab;
