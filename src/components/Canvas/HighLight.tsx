import React, { useRef, useState } from "react";
import * as S from "./style";
import { HighLightType } from "./Canvas";

type HighLightProps = {
  index: number;
  left: number;
  top: number;
  width: number;
  height: number;
  clientTop: number;
  clientLeft: number;
  setHighlights: React.Dispatch<React.SetStateAction<HighLightType[]>>;
  setIsResizing: React.Dispatch<React.SetStateAction<boolean>>;
};

function HightLight({
  index,
  left,
  top,
  width,
  height,
  clientTop,
  clientLeft,
  setHighlights,
  setIsResizing,
}: HighLightProps) {
  // 사이즈 조정
  const resizableRef = useRef<HTMLDivElement>(null);
  const [resizable, setResizable] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const minimum_size = 20;
    const original_width = parseFloat(
      getComputedStyle(resizableRef.current as HTMLDivElement, null)
        .getPropertyValue("width")
        .replace("px", ""),
    );
    const original_height = parseFloat(
      getComputedStyle(resizableRef.current as HTMLDivElement, null)
        .getPropertyValue("height")
        .replace("px", ""),
    );
    const original_x = (
      resizableRef.current as HTMLDivElement
    ).getBoundingClientRect().left;
    const original_y = (
      resizableRef.current as HTMLDivElement
    ).getBoundingClientRect().top;
    const original_mouse_x = e.pageX;
    const original_mouse_y = e.pageY;

    const resize = (e: MouseEvent) => {
      // const mouseX = e.pageX - clientLeft;
      // const mouseY = e.pageY - clientTop;

      if (target.classList.contains("top-left")) {
        console.log("top-left");
        const width = original_width - (e.pageX - original_mouse_x);
        const height = original_height - (e.pageY - original_mouse_y);
        if (width > minimum_size) {
          (resizableRef.current as HTMLDivElement).style.width = `${width}px`;
          (resizableRef.current as HTMLDivElement).style.left = `${
            original_x + (e.pageX - 20 - original_mouse_x)
          }px`;
        }
        if (height > minimum_size) {
          (resizableRef.current as HTMLDivElement).style.height = `${height}px`;
          (resizableRef.current as HTMLDivElement).style.top = `${
            original_y + (e.pageY - 20 - original_mouse_y)
          }px`;
        }
      } else if (target.classList.contains("top-right")) {
        console.log("top-right");
        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height - (e.pageY - original_mouse_y);
        if (width > minimum_size) {
          (resizableRef.current as HTMLDivElement).style.width = `${width}px`;
        }
        if (height > minimum_size) {
          (resizableRef.current as HTMLDivElement).style.height = `${height}px`;
          (resizableRef.current as HTMLDivElement).style.top = `${
            original_y + (e.pageY - 20 - original_mouse_y)
          }px`;
        }
      } else if (target.classList.contains("bottom-right")) {
        console.log("bottom-right");
        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height + (e.pageY - original_mouse_y);
        if (width > minimum_size) {
          (resizableRef.current as HTMLDivElement).style.width = `${width}px`;
        }
        if (height > minimum_size) {
          (resizableRef.current as HTMLDivElement).style.height = `${height}px`;
        }
      } else if (target.classList.contains("bottom-left")) {
        console.log("bottom-left");
        const height = original_height + (e.pageY - original_mouse_y);
        const width = original_width - (e.pageX - original_mouse_x);
        if (height > minimum_size) {
          (resizableRef.current as HTMLDivElement).style.height = `${height}px`;
        }
        if (width > minimum_size) {
          (resizableRef.current as HTMLDivElement).style.width = `${width}px`;
          (resizableRef.current as HTMLDivElement).style.left = `${
            original_x + (e.pageX - 20 - original_mouse_x)
          }px`;
        }
      }
    };
    const stopResize = () => {
      window.removeEventListener("mousemove", resize);
      // setHighlights((highlights) =>
      //   highlights.map((highlight) =>
      //     highlight.id === index ? { ...highlight, x: 1, y: 1 } : highlight,
      //   ),
      // );
      setResizable(false);
      setIsResizing(false);
    };

    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    setResizable(true);
    setIsResizing(true);
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
      onDoubleClickCapture={handleDoubleClick}
    >
      {resizable && (
        <S.Resizers>
          <S.Resizer className="top-left" onMouseDown={handleMouseDown} />
          <S.Resizer className="top-right" onMouseDown={handleMouseDown} />
          <S.Resizer className="bottom-right" onMouseDown={handleMouseDown} />
          <S.Resizer className="bottom-left" onMouseDown={handleMouseDown} />
        </S.Resizers>
      )}
    </S.Resizable>
  );
}

export default HightLight;
