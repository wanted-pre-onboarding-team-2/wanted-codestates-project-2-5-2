import React, { useState, useRef, useEffect } from "react";
import { v4 } from "uuid";

import HighLight from "./HighLight";
import { HighLightType } from "../../App";

interface CanvasProps {
  highlights: HighLightType[];
  setHighlights: React.Dispatch<React.SetStateAction<HighLightType[]>>;
}

function Canvas({ highlights, setHighlights }: CanvasProps) {
  const blankState = { x: 1, y: 1, width: 1, height: 1 };
  const [drawing, setDrawing] = useState(blankState);
  const [isResizing, setIsResizing] = useState(false);

  const isMouseDown = useRef(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const clientCoordinates = useRef({ top: 0, left: 0 });

  useEffect(() => {
    const canvasOffset = canvasRef.current?.getBoundingClientRect();
    if (canvasOffset) {
      clientCoordinates.current = {
        top: canvasOffset.top,
        left: canvasOffset.left,
      };
    }
  }, []);

  const handleMouseDown = (event: React.MouseEvent) => {
    console.log("[canvas]: mouse down");
    if (!isResizing) {
      isMouseDown.current = true;
      const mouseX = event.clientX - clientCoordinates.current.left;
      const mouseY = event.clientY - clientCoordinates.current.top;
      setDrawing({ x: mouseX, y: mouseY, width: 0, height: 0 });
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    console.log("[canvas]: mouse move");
    if (!isResizing) {
      if (!isMouseDown.current) return;
      const lastMouseX = drawing.x;
      const lastMouseY = drawing.y;
      const mouseX = event.clientX - clientCoordinates.current.left;
      const mouseY = event.clientY - clientCoordinates.current.top;
      const width = mouseX - lastMouseX;
      const height = mouseY - lastMouseY;
      setDrawing({
        x: lastMouseX,
        y: lastMouseY,
        width: width,
        height: height,
      });
    }
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    console.log("[canvas]: mouse up");
    if (!isResizing) {
      isMouseDown.current = false;
      const lastMouseX = drawing.x;
      const lastMouseY = drawing.y;
      const mouseX = event.clientX - clientCoordinates.current.left;
      const mouseY = event.clientY - clientCoordinates.current.top;

      const memo = window.prompt("아이템 이름을 입력해 주세요!!🔥");
      if (memo) {
        const highlight: HighLightType = {
          id: v4(),
          x: lastMouseX,
          y: lastMouseY,
          width: mouseX - lastMouseX,
          height: mouseY - lastMouseY,
          name: memo,
        };

        setHighlights([...highlights, highlight]);
        setDrawing(blankState);
      }
    }
  };

  return (
    <div
      className="canvas"
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div
        className="drawing"
        style={{
          left: drawing.x,
          top: drawing.y,
          width: drawing.width,
          height: drawing.height,
        }}
      />
      {highlights.map((highlight) => (
        <HighLight
          key={highlight.id}
          id={highlight.id}
          left={highlight.x}
          top={highlight.y}
          width={highlight.width}
          height={highlight.height}
          clientTop={clientCoordinates.current.top}
          clientLeft={clientCoordinates.current.left}
          highlights={highlights}
          setHighlights={setHighlights}
          setIsResizing={setIsResizing}
        />
      ))}
    </div>
  );
}

export default Canvas;
