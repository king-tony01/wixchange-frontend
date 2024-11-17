import React from "react";
import { Link } from "react-router-dom";

function LinkCard({ title, subtitle, icon }) {
  return (
    <Link className="link-card">
      <div className="link-card-left">
        {icon}
        <div className="link-card-left-inner">
          <p>{title}</p>
          <small>{subtitle}</small>
        </div>
      </div>
      <i className="fas fa-chevron-right"></i>
    </Link>
  );
}

export default LinkCard;
