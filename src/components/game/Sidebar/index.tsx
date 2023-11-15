import type { FC } from "react";

import { useContext } from 'react'
import { PlayGameContext } from "./play-game.ts";

interface SideBarProps {
  resetTime: number;
  handleResetGame: () => void;
}

const SideBar:FC<SideBarProps> = ({ resetTime, handleResetGame }) => {
  const { game: gameCtx } = useContext(PlayGameContext)

  return (
    <div className="bg-darkLight ml-8 rounded-lg w-80 py-[25px] px-4 text-light flex flex-col justify-between">
      {/* <div>
        <div className="pb-4 mb-4 border-b-2 border-light">
          <p className="text-sm font-bold mb-2 tracking-wide">Mô tả:</p>
          <ul className="list-disc pl-4">
            <li className="text-sm mb-1">Click chuột chọn một khối ngang hoặc đứng để di chuyển</li>
            <li className="text-sm mb-1">Khối đứng chỉ có thể di chuyển theo chiều thẳng đứng của màn hình, khối ngang chỉ có thể di chuyển theo chiều ngang của màn hình</li>
            <li className="text-sm mb-1">Người chơi thắng cuộc khi di chuyển được khối màu đỏ ra khỏi bức tường, với cửa màu đỏ</li>
            <li className="text-sm mb-1">Sau khi hoàn thành game sẽ tự động thông báo thành công.</li>
          </ul>
        </div>
        <p className="text-sm font-bold tracking-wide">Số lượt đã chơi:</p>
        <p className="text-center my-4 text-5xl">{resetTime}</p>
      </div> */}
      <div>
        {gameCtx?.solved && <p className="text-center text-green-200 mb-3"> <small> Team của bạn đã hoàn thành trò chơi này ! </small></p>}
        <button className="w-full tw-error-btn" onClick={handleResetGame} style={{ background: '#ccc', padding: '4px', marginTop: '16px'}}>
          Chơi lại
        </button>
      </div>
    </div>
  )
}

export default SideBar;
