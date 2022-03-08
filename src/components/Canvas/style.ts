import styled, { css } from "styled-components";

type size = { x: number; y: number; width: number; height: number };

export const Resizable = styled.div<size>`
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
  ${({ x, y, width, height }) => css`
    left: ${x}px;
    top: ${y}px;
    width: ${width}px;
    height: ${height}px;
  `}
`;

export const Resizers = styled.div`
  width: 100%;
  height: 100%;
  border: 3px solid #4386f4;
  position: relative;
`;

export const Resizer = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: white;
  border: 3px solid #4286f4;
  position: absolute;

  &.top-left {
    top: -5px;
    left: -5px;
    cursor: nw-resize;
  }

  &.top-right {
    top: -5px;
    right: -5px;
    cursor: ne-resize;
  }

  &.bottom-right {
    bottom: -5px;
    right: -5px;
    cursor: se-resize;
  }

  &.bottom-left {
    bottom: -5px;
    left: -5px;
    cursor: sw-resize;
  }
`;
