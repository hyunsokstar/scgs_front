import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  study_note_pk: string | undefined;
  button_text: string;
  exist_page_numbers: numbers[];
}

const ButtonsForSelectPageForNoteSlide = ({
  study_note_pk,
  button_text,
  exist_page_numbers,
}: Props) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (pageNumber: number) => {
    navigate(`/study-note/${study_note_pk}/${pageNumber}/slide`);
    setIsModalOpen(false);
  };

  const renderButtons = () => {
    const buttons = [];
    const rows = 5;
    const buttonsPerRow = 10;

    for (let row = 0; row < rows; row++) {
      const buttonGroup = [];

      for (
        let i = row * buttonsPerRow + 1;
        i <= (row + 1) * buttonsPerRow;
        i++
      ) {
        if (i > 50) {
          break; // Break the loop if the button number exceeds 50
        }

        buttonGroup.push(
          <Button
            variant={"outline"}
            size={"sm"}
            key={i}
            onClick={() => handleClick(i)}
            m={1}
            borderWidth={exist_page_numbers && exist_page_numbers.includes(i) ? "2px" : "1px"}
            borderColor={exist_page_numbers && exist_page_numbers.includes(i) ? "green" : "gray"}
            _hover={{ bgColor: "blue.100" }}
          >
            {i}
          </Button>
        );
      }

      buttons.push(
        <Box key={row} display="flex" justifyContent="space-around">
          {buttonGroup}
        </Box>
      );
    }

    return buttons;
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box>
      <Button variant={"outline"} size={"xs"} onClick={handleOpenModal}>
        {button_text}
      </Button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select a Page</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{renderButtons()}</ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ButtonsForSelectPageForNoteSlide;
