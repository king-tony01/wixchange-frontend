import React from "react";
import Grid from "./Grid";
import "/src/css/sectionlist.css";
function SectionList({ list }) {
  return (
    <div className="section-list">
      {list.map((section, index) => (
        <div className="section">
          <h4>{section.title}</h4>
          <Grid type={"cards"} key={index + 1} list={section.data} />
        </div>
      ))}
    </div>
  );
}

export default SectionList;
