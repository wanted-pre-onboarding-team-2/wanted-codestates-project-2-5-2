import React, { useState } from "react";
import "./styles.css";

import Canvas from "./components/Canvas";
import List from "./components/List/List";

export type HighLightType = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  name?: string;
};

function App() {
  const [highlights, setHighlights] = useState<HighLightType[]>([]);

  return (
    <div className="container">
      <List highlights={highlights} setHighlights={setHighlights} />
      <Canvas highlights={highlights} setHighlights={setHighlights} />
    </div>
  );
}

export default App;
