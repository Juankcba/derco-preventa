import { Modal, Text, Input, Row, useModal } from "@nextui-org/react";
import React, { FC, useContext } from "react";
import { UiContext } from "../../context/ui";

const ModalFilters: FC = () => {
  const { isModalOpen, setVisible } = useContext(UiContext);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  return (
    <Modal
      scroll
      fullScreen
      closeButton
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={isModalOpen}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Welcome to
          <Text b size={18}>
            NextUI
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default ModalFilters;
