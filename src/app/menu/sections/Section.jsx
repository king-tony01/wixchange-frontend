import React from "react";
import LinkCard from "../cards/LinkCard";

function Section({ cards }) {
  return (
    <section className="menu-section">
      {cards.map(({ icon, title, subtitle }, index) => (
        <LinkCard icon={icon} title={title} subtitle={subtitle} />
      ))}
    </section>
  );
}

export default Section;
