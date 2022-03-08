import React, { useRef } from "react";
import * as S from "./style";
import { HighLightType } from "./Canvas";

type HighLightProps = {
  index: number;
  left: number;
  top: number;
  width: number;
  height: number;
  setHighlights: React.Dispatch<React.SetStateAction<HighLightType[]>>;
  setIsResizing: React.Dispatch<React.SetStateAction<boolean>>;
};

function HightLight({
  index,
  left,
  top,
  width,
  height,
  setHighlights,
  setIsResizing,
}: HighLightProps) {
  // 사이즈 조정
  const resizableRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    const target = e.target as Element;
    console.log(target.className);
    setIsResizing(true);
    // setHighlights((highlights) =>
    //   highlights.map((highlight) =>
    //     highlight.id === index
    //       ? { ...highlight, x: highlight.x + 20, y: highlight.y + 20 }
    //       : highlight,
    //   ),
    // );
    if (resizableRef.current) resizableRef.current.style.width = "20px";
    // window.addEventListener("mouseup", () => setIsResizing(false));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.stopPropagation();
    return null;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(false);
  };
  // 위치 변경

  // return <div className="rectangle" style={{ left, top, width, height }} />;
  return (
    <S.Resizable
      x={left}
      y={top}
      width={width}
      height={height}
      ref={resizableRef}
    >
      <S.Resizers>
        <S.Resizer
          className="top-left"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
        <S.Resizer
          className="top-right"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
        <S.Resizer
          className="bottom-right"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
        <S.Resizer
          className="bottom-left"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      </S.Resizers>
    </S.Resizable>
  );
}

export default HightLight;
