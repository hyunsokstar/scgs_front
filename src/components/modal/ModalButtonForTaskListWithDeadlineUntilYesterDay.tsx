import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ChakraProvider,
  extendTheme,
  ColorModeScript,
} from "@chakra-ui/react";
import TaskListUntilYesterday from "../TaskListUntilYesterday";

const colors = {
  grayPastel: "#AEB5C0", // 회색과 어울리는 연한 파스텔톤 색상 설정
};

const theme = extendTheme({
  colors,
});

interface ModalButtonProps {
  buttonText: string;
}

const ModalButtonForTaskListWithDeadlineUntilYesterDay: React.FC<
  ModalButtonProps
> = ({ buttonText }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Box>
      <Box>
        <Button
          variant="outline"
          size={"xs"}
          colorScheme="blue"
          color="blue.500"
          _hover={{ bg: "grayPastel" }}
          onClick={handleOpenModal}
          mt={-1}
        >
          {buttonText}
        </Button>

        <Modal isOpen={isOpen} onClose={handleCloseModal} size={"7xl"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>어제까지의 미완료 task list 출력</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <TaskListUntilYesterday
                basic_due_date_option={"until-yesterday"}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                variant="outline"
                colorScheme="black"
                _hover={{ bg: "grayPastel" }}
                mr={3}
                onClick={handleCloseModal}
              >
                Close
              </Button>
              <Button colorScheme="teal">Save</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default ModalButtonForTaskListWithDeadlineUntilYesterDay;
