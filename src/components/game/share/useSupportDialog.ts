import { useState } from "react";

const useSupportDialog = () => {
  const [warningModalVisible, setWarningModalVisible] = useState(false);
  const [wrongModalVisible, setWrongModalVisible] = useState(false);
  const [winModalVisible, setWinModalVisible] = useState(false);

  function closeAllModal() {
    setWarningModalVisible(false);
    setWrongModalVisible(false);
    setWinModalVisible(false);
  }

  return {
    warningModalVisible,
    handleCloseWarningModal: () => setWarningModalVisible(false),
    wrongModalVisible,
    handleCloseWrongModal: () => setWrongModalVisible(false),
    winModalVisible,
    handleCloseWinModal: () => setWinModalVisible(false),

    closeAllModal,
    handleOpenWarningModal: () => setWarningModalVisible(true),
    handleOpenWrongModal: () => setWrongModalVisible(true),
    handleOpenWinModal: () => setWinModalVisible(true),
  }
}

export default useSupportDialog;
