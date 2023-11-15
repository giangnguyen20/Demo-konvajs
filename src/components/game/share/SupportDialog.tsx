import type { FC } from "react";

import Modal from "./Modal/index.tsx";
import WinnerModal from "./Modal/WinnerModal.tsx";

interface SupportDialogProps {
  warningModalVisible: boolean;
  handleCloseWarningModal: () => void;
  wrongModalVisible: boolean;
  handleCloseWrongModal: () => void;
  winModalVisible: boolean;
  handleCloseWinModal: () => void;
  handleResetGame: () => void;
  errorMessage?: string;
  warningMessage?: string;
}

const SupportDialog:FC<SupportDialogProps> = ({
  warningModalVisible,
  handleCloseWarningModal,
  wrongModalVisible,
  handleCloseWrongModal,
  winModalVisible,
  handleCloseWinModal,
  handleResetGame,
  errorMessage = 'Đáp án của bạn chưa chính xác, hãy thử lại lần nữa nhé!',
  warningMessage = 'Nếu xác nhận chơi lại từ đầu, bạn sẽ mất toàn bộ các nước đi mà bạn đã thực hiện trước đó và phải bắt đầu lại.',
}) => {
  return (
    <>
      <Modal
        isOpen={warningModalVisible}
        title="Bạn có chắc chắn muốn chơi lại từ đầu?"
        content={warningMessage}
        okLabel="Chơi lại"
        okColor="error"
        handleConfirm={handleResetGame}
        handleClose={handleCloseWarningModal}
      />
      <Modal
        isOpen={wrongModalVisible}
        title="Thông báo"
        content={errorMessage}
        cancelLabel="Đóng"
        handleClose={handleCloseWrongModal}
      />
      <WinnerModal
        isOpen={winModalVisible}
        handleClose={handleCloseWinModal}
        handleResetGame={handleResetGame} />
    </>
  )
}

export default SupportDialog;
