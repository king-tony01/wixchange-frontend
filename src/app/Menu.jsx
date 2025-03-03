import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { WiXcoin } from "../assets/icons/wixcoin";
import { MenuIcons } from "../assets/icons/menuIcons";
import Section from "./menu/sections/Section";
import { HomeContext } from "../contexts/HomeContext";

function Menu() {
  const { userInfo } = useContext(HomeContext);
  const [visible, setVisible] = useState(false);
  const firstSection = [
    {
      icon: MenuIcons.profile,
      title: "Profile",
      subtitle: "Set pin, increase limit",
    },
    {
      icon: MenuIcons.history,
      title: "Transaction History",
      subtitle: "View all transactions",
    },
    {
      icon: MenuIcons.card,
      title: "Bank Card & Account",
      subtitle: "Add payment option",
    },
    {
      icon: MenuIcons.settings,
      title: "Settings",
      subtitle: "Security, account limit & preferrences",
    },
    {
      icon: MenuIcons.rewards,
      title: "My Rewards",
      subtitle: "Redeem points",
    },
  ];
  const secondSection = [
    {
      icon: MenuIcons.help,
      title: "Customer Care Center",
      subtitle: "",
    },
    {
      icon: MenuIcons.info,
      title: "Terms & Conditions",
      subtitle: "",
    },
    {
      icon: MenuIcons.rate,
      title: "Rate Us!",
      subtitle: "",
    },
    {
      icon: MenuIcons.logout,
      title: "Log out",
      subtitle: "",
    },
  ];

  const { firstName, email, phone } = userInfo;

  return (
    <section className="menu">
      <header className="home-header">
        <div className="header-left">
          <i className="fas fa-user-circle"></i>
          <div>
            <small>Good day! 👋</small>
            <p>
              {" "}
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
        <div className="upgrade-btn-con">
          <small>
            Tier{" "}
            <span
              style={{
                marginLeft: "5px",
                display: "inline-block",
                color: "white",
              }}
            >
              {userInfo.tier}
            </span>
          </small>
          <Link>Upgrade</Link>
        </div>
      </header>
      <div className="menu-body">
        <div className="wallet-card menu-part">
          <div>
            <small>Available balance</small>{" "}
            <i
              className={`fas fa-eye${visible ? "-slash" : ""}`}
              onClick={() => setVisible(!visible)}
            ></i>
          </div>
          <div className="tab-center">
            <b>
              {visible
                ? parseInt(userInfo.accountBalance).toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  })
                : "********"}
            </b>
            <div className="chart">
              <div>
                <i className="fas fa-arrow-down"></i>
                <small>0%</small>
              </div>
              <div>
                <i className="fas fa-arrow-up"></i>
                <small>0%</small>
              </div>
            </div>
          </div>
          <div className="wix-points">
            {<WiXcoin />} <span>0</span>
          </div>
        </div>
        <Section cards={firstSection} />
        <Section cards={secondSection} />
      </div>
    </section>
  );
}

export default Menu;
