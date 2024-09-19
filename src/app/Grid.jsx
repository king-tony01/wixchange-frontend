import React from "react";
import Card from "./Card";
import VTU from "./VTU";
import "/src/css/list.css";
function Grid({ list, type }) {
  return (
    <section className="grid">
      {type == "cards"
        ? list.map((card, index) => <Card card={card} key={index + 1} />)
        : list.map((vtu, index) => <VTU type={"airtime"} key={index + 1} />)}
    </section>
  );
}

export default Grid;
