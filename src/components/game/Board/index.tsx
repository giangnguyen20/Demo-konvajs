import type { FC } from "react";

import { Fragment } from 'react'; 
import DynamicRect  from './DynamicRect/index.tsx'
import { ContextRect } from "../types"

interface BoardProps {
  board: number[];
  handleMove: (direction: string, context: ContextRect, steps: number) => void
  latestStep: number;
}

const Board:FC<BoardProps> = ({ board, handleMove }) => {
  const squarePerRow = 8;

  return (
    <div>
      {[...Array(squarePerRow)].map((_, rowIndex) => (
          <Fragment key={rowIndex}>
            {
              [...Array(squarePerRow)].map((_, colIndex) => 
                (<>
                  {board[colIndex + squarePerRow * rowIndex] >= 0 && <DynamicRect
                    board={board}
                    handleMove={handleMove}
                    index={colIndex + squarePerRow * rowIndex}
                    colIndex={colIndex}
                    rowIndex={rowIndex}
                    value={board[colIndex + squarePerRow * rowIndex]}
                  />}
                </>))
            }
          </Fragment>
        ))
      }
    </div>
  )
}

export default Board;
