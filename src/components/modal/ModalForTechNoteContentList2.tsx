import React, { useState } from "react";
import Modal from "react-modal";

interface Props {}

const ModalForTechNoteContentList2 = (props: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Hello, I am a Modal!</h2>

        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
  );
};

export default ModalForTechNoteContentList2;
