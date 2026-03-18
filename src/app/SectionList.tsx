import React from "react";
import Grid from "./Grid";
import "../css/sectionlist.css";
function SectionList({ list }) {
  return (
    <div className="section-list">
      {list.map((section, index) => (
        <div className="section" key={section.title ?? index}>
          <h4>{section.title}</h4>
          <Grid type={"cards"} list={section.data} />
        </div>
      ))}
    </div>
  );
}

export default SectionList;
