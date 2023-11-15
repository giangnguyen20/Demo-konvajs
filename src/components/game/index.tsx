import { Layer, Stage } from "react-konva";
import type { FC } from "react";

import Board from "./Board/index.tsx";
import SideBar from "./Sidebar/index.tsx";
import useSupportDialog from "./share/useSupportDialog.ts";
import SupportDialog from "./share/SupportDialog.tsx";
import useGameLogic from "./useGameLogic.ts";
import Loader from "./share/Loader/index.tsx";

const UnblockMe: FC = () => {
  const supportDialogProps = useSupportDialog();
  const {
    game,
    board,
    steps,
    handleResetGame,
    handleMove,
    resetTime
  } = useGameLogic(
    supportDialogProps.closeAllModal,
    supportDialogProps.handleOpenWinModal,
    supportDialogProps.handleOpenWrongModal
  )

  return (
    <div className="w-screen overflow-hidden flex flex-col items-center bg-dark">
      {
        game
          ? <div>
            <div className="flex pb-5">
              <div className="p-6 rounded-lg bg-light">
                <Stage scaleX={1} scaleY={1} 
                  width={720} height={720}
                >
                  <Layer>
                    <Board
                      key={resetTime}
                      board={board}
                      handleMove={handleMove}
                      latestStep={steps[steps.length - 1]} />
                  </Layer>
                </Stage>
              </div>
              <SideBar
                resetTime={resetTime}
                handleResetGame={supportDialogProps.handleOpenWarningModal} />
              <SupportDialog {...supportDialogProps} handleResetGame={handleResetGame} />
            </div>
          </div>
          : <div className="w-screen h-screen flex items-center justify-center">
            <Loader />
          </div>
      }
    </div>
  )
}

export default UnblockMe;
