import React from "react";
import { Link } from "react-router-dom";
import { QuickActionsIcons } from "../assets/icons/quickActions";
function QuickActions() {
  return (
    <div className="quick-actions">
      {["/withdraw", "/fund", "/vtu", "/gift-card", "/bills", "/reward"].map(
        (path, index) => (
          <Link to={path} key={index + 1}>
            {path == "/withdraw"
              ? QuickActionsIcons.withdraw
              : path == "/fund"
              ? QuickActionsIcons.fund
              : path == "/vtu"
              ? QuickActionsIcons.vtu
              : path == "/gift-card"
              ? QuickActionsIcons.giftcard
              : path == "/bills"
              ? QuickActionsIcons.bills
              : QuickActionsIcons.rewards}
          </Link>
        )
      )}
    </div>
  );
}

export default QuickActions;
