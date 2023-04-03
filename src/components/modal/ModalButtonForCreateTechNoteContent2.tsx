import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import Modal from "react-modal";
import TinyMCEEditor from "../RichEditor/TinyMCEEditor";

// rome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface Props {}

const ModalButtonForCreateTechNoteContent2 = (props: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Box>
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Hello, I am a Modal!</h2>

        <TinyMCEEditor
          apiKey={"mj1ss81rnxfcig1ol8gp6j8oui9jpkp61hw3m901pbt14ei1"}
        />

        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </Box>
  );
};

export default ModalButtonForCreateTechNoteContent2;
