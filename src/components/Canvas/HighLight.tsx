import React, { useRef, useState } from "react";
import * as S from "./style";
import { HighLightType } from "../../App";

type HighLightProps = {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
  clientTop: number;
  clientLeft: number;
  highlights: HighLightType[];
  setHighlights: React.Dispatch<React.SetStateAction<HighLightType[]>>;
  setIsResizing: React.Dispatch<React.SetStateAction<boolean>>;
};

function HightLight({
  id,
  left,
  top,
  width,
  height,
  clientTop,
  clientLeft,
  highlights,
  setHighlights,
  setIsResizing,
}: HighLightProps) {
  // 사이즈 조정
  const resizableRef = useRef<HTMLDivElement>(null);
  const [resizable, setResizable] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const resizableElement = resizableRef.current as HTMLDivElement;
    const target = e.target as HTMLDivElement;
    const minimum_size = 20;

    const original_width = resizableElement.getBoundingClientRect().width;
    const original_height = resizableElement.getBoundingClientRect().height;

    const original_x = resizableElement.getBoundingClientRect().left;
    const original_y = resizableElement.getBoundingClientRect().top;

    const original_mouse_x = e.pageX;
    const original_mouse_y = e.pageY;

    const resize = (e: MouseEvent) => {
      if (target.classList.contains("top-left")) {
        console.log("top-left");
        const width = original_width - (e.pageX - original_mouse_x);
        const height = original_height - (e.pageY - original_mouse_y);
        if (width > minimum_size) {
          resizableElement.style.width = `${width}px`;
          resizableElement.style.left = `${
            original_x + (e.pageX - clientLeft - original_mouse_x)
          }px`;
        }
        if (height > minimum_size) {
          resizableElement.style.height = `${height}px`;
          resizableElement.style.top = `${
            original_y + (e.pageY - clientTop - original_mouse_y)
          }px`;
        }
      } else if (target.classList.contains("top-right")) {
        console.log("top-right");
        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height - (e.pageY - original_mouse_y);
        if (width > minimum_size) {
          resizableElement.style.width = `${width}px`;
        }
        if (height > minimum_size) {
          resizableElement.style.height = `${height}px`;
          resizableElement.style.top = `${
            original_y + (e.pageY - clientTop - original_mouse_y)
          }px`;
        }
      } else if (target.classList.contains("bottom-right")) {
        console.log("bottom-right");
        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height + (e.pageY - original_mouse_y);
        if (width > minimum_size) {
          resizableElement.style.width = `${width}px`;
        }
        if (height > minimum_size) {
          resizableElement.style.height = `${height}px`;
        }
      } else if (target.classList.contains("bottom-left")) {
        console.log("bottom-left");
        const height = original_height + (e.pageY - original_mouse_y);
        const width = original_width - (e.pageX - original_mouse_x);
        if (height > minimum_size) {
          resizableElement.style.height = `${height}px`;
        }
        if (width > minimum_size) {
          resizableElement.style.width = `${width}px`;
          resizableElement.style.left = `${
            original_x + (e.pageX - clientLeft - original_mouse_x)
          }px`;
        }
      }
    };
    const stopResize = () => {
      window.removeEventListener("mousemove", resize);
      setHighlights(
        highlights.map((highlight) =>
          highlight.id === id
            ? {
                ...highlight,
                x: resizableElement.getBoundingClientRect().left - clientLeft,
                y: resizableElement.getBoundingClientRect().top - clientTop,
                width: resizableElement.getBoundingClientRect().width,
                height: resizableElement.getBoundingClientRect().height,
              }
            : highlight,
        ),
      );
      setResizable(false);
      setIsResizing(false);
    };

    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.persist();
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();

    setResizable(true);
    setIsResizing(true);
  };

  return (
    <S.Resizable
      x={left}
      y={top}
      width={width}
      height={height}
      ref={resizableRef}
      onClick={handleDoubleClick}
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
