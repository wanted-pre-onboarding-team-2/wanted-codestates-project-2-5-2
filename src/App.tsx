import React, { useState } from "react";
import "./styles.css";

import Canvas from "./components/Canvas";
import List from "./components/List/List";
import { useLocalStorage } from './hooks/useLocalStorage';

export type HighLightType = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
};

function App() {
  const [highlights, setHighlights] = useLocalStorage('highlight', []);

  return (
    <div className="container">
      <List highlights={highlights} setHighlights={setHighlights} />
      <Canvas highlights={highlights} setHighlights={setHighlights} />
    </div>
  );
}

export default App;
