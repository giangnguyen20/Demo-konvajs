import type { FC } from "react";

import { useRef } from 'react'; 
import { Rect } from "react-konva";
import { ContextRect } from "../../types"

interface BoardProps {
  index: number;
  board: number[];
  value: number;
  colIndex: number;
  rowIndex: number;
  handleMove: (direction: string, context: ContextRect,  steps: number) => void
}

const targetBlock: number = 2;
const numberCells: number  = 5;
const wallCells: number  = 1;
const doorCells: number = 0;
const boardLength: number = 8;
const minBlockLength: number = 2;
const SIDEWIDTH: number = 90;

function getBlockColor(value: number) {
  if (value === wallCells) {
    return '#a8a29e';
  } else if (value > 3) {
    return '#38d399';
  } else if (value === targetBlock || value === doorCells) {
    return '#ff7675';
  }else {
    return 'transparent';
  }
}

const DynamicRect:FC<BoardProps> = ({ index, colIndex, rowIndex, board, value, handleMove }) => {
  const rectRef = useRef<any>();
  const canMoveDown = (): boolean => {
    return board[index + boardLength] !== 1;
  };


  const canMoveUp = (): boolean => {
    return  board[index - boardLength] !== 1;
  };

  const canMoveRight = (): boolean => {
    return board[index + 1] !== 1;
  };


  const canMoveLeft = (): boolean => {
    return  board[index -1] !== 1;
  };
  
  const calMinY = (defaultMin: number): number => {
      if (rowIndex === 2) {
      let val = board[colIndex + boardLength * 1]
      if(val !== -1) {
        return rowIndex * SIDEWIDTH;
      }
    }

    for (let row = rowIndex - 1; row > 0 ; row--) {
      let val = board[colIndex + boardLength * row]
      if(val !== -1) {
        return (row + 1) * SIDEWIDTH;
      }
    }
    return defaultMin;
  }

  const calMinX = (defaultMin: number): number => {
    if (colIndex === 2) {
      let val = board[1 + boardLength * rowIndex]
      if(val !== -1) {
        return colIndex * SIDEWIDTH;
      }
    }

    for (let col = colIndex - 1; col > 0 ; col--) {
      let val = board[col + boardLength * rowIndex]

      if(val !== -1) {
        return (col + 1) * SIDEWIDTH;
      }
    }
    
    return defaultMin;
  }

  const calMaxX = (defaultMax: number): number => {
    for (let col = colIndex + 2; col < boardLength - 1 ; col ++) {
      let val = board[col + boardLength * rowIndex + (lengthBlock() - minBlockLength)]
      if(val !== -1) {
        return (col - 2) * SIDEWIDTH;
      }
    }
    return defaultMax;
  }
  
  const calMaxY = (defaultMax: number): number => {
    for (let row = rowIndex + 2; row < boardLength - 1; row ++) {
      let val = board[colIndex + boardLength * row + boardLength * (lengthBlock() - minBlockLength)]

      if(val !== -1) {
        return (row - 2) * SIDEWIDTH;
      }
    }
    return defaultMax;
  }


  const lengthBlock = () => {
    return value > 2 ? Math.floor(value/2) : 2;
  }
  return (
      <Rect
        key={index}
        ref={rectRef}
        x={colIndex * SIDEWIDTH}
        y={rowIndex * SIDEWIDTH}
        value={value}
        strokeWidth={2}
        stroke="#292524"
        fill={getBlockColor(value)}
        width={value > 1 && value % 2 === 0  ? SIDEWIDTH * lengthBlock() : SIDEWIDTH}
        height={value > 1 && value % 2 !== 0 ?  SIDEWIDTH * lengthBlock() : SIDEWIDTH}
        draggable={value > 1}
        onDragEnd={(e) => {
          const currentX = colIndex * SIDEWIDTH 
          const currentY = rowIndex * SIDEWIDTH

          const diffX = e.target.x()
          const diffY = e.target.y()

          let stepX = Math.round((diffX - currentX)/SIDEWIDTH); 
          let stepY = Math.round((diffY - currentY)/SIDEWIDTH);

          const x = value % 2 === 0 && stepX !== 0 
            ? currentX + stepX * SIDEWIDTH
            : currentX;

          const y = value % 2 !== 0 && stepY !== 0 
            ? currentY + stepY * SIDEWIDTH
            : currentY;

          e.target.to({
            x: Math.abs(x),
            y: Math.abs(y),
            scaleX: 1,
            scaleY: 1,
            onFinish() {
              if (value % 2 === 0 && diffX < currentX * 100) {
                if(stepX > 0 && canMoveRight()) {
                  handleMove('MR', { colIndex, rowIndex , index, value}, stepX )
                }

                if(stepX < 0 && canMoveLeft()) {
                  handleMove('ML', { colIndex, rowIndex , index, value},  -stepX)
                }
              }

              if (value % 2 !== 0 && diffY < currentY * 100) {
                if(stepY < 0 && canMoveUp()) {
                  handleMove('MU', { colIndex, rowIndex , index, value}, -stepY )
                }

                if(stepY > 0 && canMoveDown()) {
                  handleMove('MD', { colIndex, rowIndex , index, value},  stepY)
                }
              }
              
            }
          })
        }}
      
        dragBoundFunc={function (pos) {     
          const minX = calMinX(SIDEWIDTH);
          const maxX = calMaxX((boardLength - 2) * SIDEWIDTH - SIDEWIDTH);
          const maxY =  calMaxY((boardLength - 2) * SIDEWIDTH - SIDEWIDTH);
          const minY = calMinY(SIDEWIDTH);

          let x = pos.x;
          let y = pos.y;

          if(pos.x <= minX) {
            x = minX;
          }

          if(pos.x >= maxX) {
            x = maxX;
          }

          if(pos.y <= minY) {
            y = minY;
          }

          if(pos.y >= maxY) {
            y = maxY;
          }

          return {
            x: value !== 1 && value % 2 !== 0 ? rectRef.current.absolutePosition().x : x,
            y: value !== 1 && value % 2 === 0 ? rectRef.current.absolutePosition().y : y,
          };
        }} />            
  )
}

export default DynamicRect;
