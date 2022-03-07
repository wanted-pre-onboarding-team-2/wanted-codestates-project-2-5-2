import React from "react";

import { HighLightType } from "./Canvas";

type HighLightProps = {
  index: number;
  left: number;
  top: number;
  width: number;
  height: number;
  setHighlights: React.Dispatch<React.SetStateAction<HighLightType[]>>;
};

function HightLight({ index, left, top, width, height }: HighLightProps) {
  // 사이즈 조정

  // 위치 변경

  return <div className="rectangle" style={{ left, top, width, height }} />;
}

export default HightLight;
