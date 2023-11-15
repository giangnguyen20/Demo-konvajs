import { useEffect, useRef, useState } from "react";
import { Game } from "./Game.model.ts";
import { ContextRect } from "./types"

const squarePerRow: number = 8;

const useGameLogic = (
  closeAllModal: () => void,
  handleOpenWinModal: () => void,
  handleOpenWrongModal: () => void,
) => {
  const [sessionId, setSessionId] = useState<number>();
  const rootBoard = useRef<number[]>([]);
  const [game, setGame] = useState<Game>();
  const [board, setBoard] = useState<number[]>([]);
  const [steps, setSteps] = useState<number[]>([]);
  const [resetTime, setResetTime] = useState<number>();

  useEffect(() => {
    const resetCount = localStorage.getItem('UbResetCount') ? +localStorage.getItem('UbResetCount')! : 0;
    setResetTime(resetCount);
    setTimeout(() => {
      const game = new Game();
      setGame(game);
      setBoard(game.generateBoard());
      rootBoard.current = game.generateBoard();
      setSessionId(game.initSession());
    }, 500);
  }, [])

  function handleMove(direction: string, context: ContextRect,  steps: number) {
    var newBoard = [...board];

    var flagWinner = false;

    const { index, value } = context;

    const lengthOfBlock = value > 2 ? Math.floor(value/2) : 2;

    switch (direction) {
      case 'ML':
          const headIndexL = index - steps; //head in left side
          const bodyIndexL = headIndexL + 1; // max block 3, when block has more cell, please refactor
          const tailIndexL = headIndexL + lengthOfBlock - 1; //total length rect = 2

          newBoard[bodyIndexL] = -value;
          newBoard[headIndexL] = value;
          newBoard[tailIndexL] = -value;

          if (steps === 1) {
            newBoard[tailIndexL + 1] = -1;
          } else {
            for(let i = 1; i <= steps; i ++) {
              const needDeleteL = tailIndexL + i;
                newBoard[needDeleteL] = -1
            }
          }
        break;

      case 'MR':
          const headIndexR = index + steps; //head in left side
          const bodyIndexR = headIndexR + 1; // max block 3, when block has more cell, please refactor
          const tailIndexR = headIndexR + lengthOfBlock - 1; //total length rect = 2

          newBoard[headIndexR] = value;
          newBoard[bodyIndexR] = -value;
          newBoard[tailIndexR] =  -value;

          if(tailIndexR === 30 && newBoard[tailIndexR] === -2 ) {
            newBoard[headIndexR] = -1;
            newBoard[tailIndexR] =  -1;

            flagWinner = true;
          }

          if (steps === 1) {
            newBoard[index] = -1;
          } else {
            for(let i = 1; i <= steps; i ++) {
              const needDeleteR = headIndexR - i;
                newBoard[needDeleteR] = -1
            }
          }

        break;

      case 'MU':
          const headIndex = index - steps * squarePerRow;
          const bodyIndex  = headIndex + squarePerRow;
          const tailIndex = headIndex + squarePerRow * (lengthOfBlock - 1) ;

          newBoard[headIndex] = value;
          newBoard[bodyIndex] = -value;

          newBoard[tailIndex] = -value;

          if(steps === 1) {
            newBoard[tailIndex + squarePerRow] = -1
          } else {
            for(let i = 1; i <= steps; i++) {
              const needDelete = tailIndex + squarePerRow*i;
              newBoard[needDelete] = -1
            }
          }
        break;

      case 'MD':
          const headIndexD = index + steps * squarePerRow;
          const bodyIndexD = index + steps * squarePerRow + squarePerRow;

          const tailIndexD  = index + squarePerRow * steps + squarePerRow * (lengthOfBlock - 1);

          newBoard[headIndexD] = value;
          newBoard[bodyIndexD] = -value;
          newBoard[tailIndexD] = -value;

          if (steps === 1) {
            newBoard[index] = -1
          }

          else {
            for(let i = 0; i < steps; i++) {
              newBoard[index + i*squarePerRow] = -1
            }
          }

        break;
    }

    setBoard(newBoard);
  }

  function handleResetGame() {
    closeAllModal();
    localStorage.setItem('UbResetCount', (resetTime + 1).toString());
    setResetTime(resetTime + 1);
    setSteps([]);
    setBoard(game!.generateBoard());
    setSessionId(game!.initSession());
  }

  return {
    game,
    board,
    steps,
    handleResetGame,
    handleMove,
    resetTime
  }
}

export default useGameLogic;
