import React from "react";

import ListItem from "./ListItem";
import { HighLightType } from "src/App";

interface ListProps {
  highlights: HighLightType[];
  setHighlights: React.Dispatch<React.SetStateAction<HighLightType[]>>;
}

function List({ highlights, setHighlights }: ListProps) {
  return (
    <div className="list">
      <h1 className="list-name">List</h1>
      <ul>
        {highlights.map((highlight) => (
          <ListItem
            key={highlight.id}
            id={highlight.id}
            name={highlight.name}
            highlights={highlights}
            setHighlights={setHighlights}
          />
        ))}
      </ul>
    </div>
  );
}

export default List;
