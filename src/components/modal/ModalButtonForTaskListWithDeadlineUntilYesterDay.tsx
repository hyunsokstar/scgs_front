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
import UncompletedProjectTaskList from "../UncompletedProjectTaskList";
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
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
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
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default ModalButtonForTaskListWithDeadlineUntilYesterDay;
