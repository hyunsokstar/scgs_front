import React, { useState } from 'react';
import Modal from 'react-modal';
import TinyMCEEditor from '../RichEditor/TinyMCEEditor';

Modal.setAppElement('#root'); // 모달이 렌더링되는 컨테이너를 설정합니다.

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Hello, I am a Modal!</h2>

        <TinyMCEEditor apiKey={'mj1ss81rnxfcig1ol8gp6j8oui9jpkp61hw3m901pbt14ei1'} />

        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
  );
}

export default App;