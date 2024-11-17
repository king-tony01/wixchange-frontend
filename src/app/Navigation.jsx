import React, { useState } from "react";
import { Link } from "react-router-dom";

import "/src/css/navigation.css";
import { TabIcons } from "../assets/icons/tabIcons";

function Navigation() {
  const [active, setActive] = useState(0);

  return (
    <nav>
      {["/", "/wallet", "/services", "/menu"].map((path, index) => (
        <Link to={path} onClick={() => setActive(index)} key={index + 1}>
          {path == "/"
            ? index == active
              ? TabIcons.homeActive
              : TabIcons.home
            : path == "/wallet"
            ? index == active
              ? TabIcons.walletActive
              : TabIcons.wallet
            : path == "/services"
            ? index == active
              ? TabIcons.storeActive
              : TabIcons.store
            : index == active
            ? TabIcons.menuActive
            : TabIcons.menu}
        </Link>
      ))}
    </nav>
  );
}

export default Navigation;
