import React, { useState, useRef, useEffect } from "react";

import HighLight from "./HighLight";

export type HighLightType = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

function Canvas() {
  const blankState = { x: 1, y: 1, width: 1, height: 1 };
  const [drawing, setDrawing] = useState(blankState);
  const [highlights, setHighlights] = useState<HighLightType[]>([]);
  const [isResizing, setIsResizing] = useState(false);
  const nextId = useRef(0);

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
    if (!isResizing) {
      isMouseDown.current = true;
      const mouseX = event.clientX - clientCoordinates.current.left;
      const mouseY = event.clientY - clientCoordinates.current.top;
      setDrawing({ x: mouseX, y: mouseY, width: 0, height: 0 });
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isResizing) {
      if (!isMouseDown.current) return;
      const lastMouseX = drawing.x;
      const lastMouseY = drawing.y;
      const mouseX = event.clientX - clientCoordinates.current.left;
      const mouseY = event.clientY - clientCoordinates.current.top;
      const width = mouseX - lastMouseX;
      const height = mouseY - lastMouseY;
      // console.log(mouseX, mouseY, width, height);
      setDrawing({
        x: lastMouseX,
        y: lastMouseY,
        width: width,
        height: height,
      });
      // console.log(drawing);
    }
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    if (!isResizing) {
      isMouseDown.current = false;
      const lastMouseX = drawing.x;
      const lastMouseY = drawing.y;
      const mouseX = event.clientX - clientCoordinates.current.left;
      const mouseY = event.clientY - clientCoordinates.current.top;
      const highlight: HighLightType = {
        id: nextId.current++,
        x: lastMouseX,
        y: lastMouseY,
        width: mouseX - lastMouseX,
        height: mouseY - lastMouseY,
      };
      setHighlights([...highlights, highlight]);
      setDrawing(blankState);
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
          index={highlight.id}
          left={highlight.x}
          top={highlight.y}
          width={highlight.width}
          height={highlight.height}
          setHighlights={setHighlights}
          setIsResizing={setIsResizing}
        />
      ))}
    </div>
  );
}

export default Canvas;
