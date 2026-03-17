import React from "react";
import LinkCard from "../cards/LinkCard";

function Section({ cards }) {
  return (
    <section className="menu-section">
      {cards.map(({ icon, title, subtitle, action }, index) => (
        <LinkCard
          key={index}
          icon={icon}
          title={title}
          subtitle={subtitle}
          action={action}
        />
      ))}
    </section>
  );
}

export default Section;
