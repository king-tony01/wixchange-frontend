import React, { useState } from "react";
import { Link } from "react-router-dom";
import home from "/src/assets/home.png";
import homeActive from "/src/assets/home-active.png";
import wallet from "/src/assets/wallet.png";
import walletActive from "/src/assets/wallet-active.png";
import services from "/src/assets/services.png";
import servicesActive from "/src/assets/services-active.png";
import menu from "/src/assets/menu.png";
import menuActive from "/src/assets/menu-active.png";
import "/src/css/navigation.css";

function Navigation() {
  const [active, setActive] = useState(0);

  return (
    <nav>
      {["/", "/wallet", "/services", "/menu"].map((path, index) => (
        <Link to={path} onClick={() => setActive(index)} key={index + 1}>
          <img
            src={
              path == "/"
                ? index == active
                  ? homeActive
                  : home
                : path == "/wallet"
                ? index == active
                  ? walletActive
                  : wallet
                : path == "/services"
                ? index == active
                  ? servicesActive
                  : services
                : index == active
                ? menuActive
                : menu
            }
            alt=""
          />
        </Link>
      ))}
    </nav>
  );
}

export default Navigation;
