import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ContainerForTaskIntergrationForSelectedOne from "../Container/ContainerForTaskIntergrationForSelectedOne";
import ContainerForSelectedTaskForTaskIntergration from "../Container/ContainerForSelectedTaskForTaskIntergration";

interface ModalButtonProps {
  button_text: string;
  modal_title_text: string;
  selectedTaskPk: any;
}

// 1122
const ModalButtonForTaskIntegrationForSeletedOne: React.FC<
  ModalButtonProps
> = ({ button_text, modal_title_text, selectedTaskPk }) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [checkedRows, setCheckedRows] = useState<number[]>([]); // 체크된 항목의 번호를 저장하는 상태

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        borderColor="blue"
        _hover={{ backgroundColor: "your-hover-color" }}
        onClick={onOpen}
      >
        {button_text}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal_title_text}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* 가로를 2등분 */}
            <Box display="flex" gap={2}>
              <Box flex="5" border="1px dashed">
                {/* 컨테이너(task list (선택한 업무 이외) 를 위한 컨테이너 ) */}
                <ContainerForTaskIntergrationForSelectedOne
                  selectedTaskPk={selectedTaskPk}
                  checkedRows={checkedRows}
                  setCheckedRows={setCheckedRows}
                />
              </Box>
              <Box
                flex="1"
                border="1px dashed"
                display={"flex"}
                flexDirection={"column"}
                gap={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Button
                  variant="outline"
                  size="sm"
                  borderColor="gray.500" // 단정한 색상 선택
                  _hover={{ backgroundColor: "gray.100" }} // 호버 시 배경색 변경
                  width={"90%"}
                >
                  Convert
                </Button>

                {/* Revert 버튼 */}
                <Button
                  variant="outline"
                  size="sm"
                  borderColor="gray.500" // 단정한 색상 선택
                  _hover={{ backgroundColor: "gray.100" }} // 호버 시 배경색 변경
                  width={"90%"}
                >
                  Revert
                </Button>
              </Box>
              <Box flex="5" border="1px dashed">
                right side
                <ContainerForSelectedTaskForTaskIntergration
                  selectedTaskPk={selectedTaskPk}
                />
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForTaskIntegrationForSeletedOne;
