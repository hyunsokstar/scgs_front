import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { typeForTaskListForChecked } from "../../types/project_progress/project_progress_type";
import { apiForGetTaskListForCheckedPks } from "../../apis/project_progress_api";
import TableForTaskListForChecked from "../Table/TableForTaskListForChecked";
import ContainerForTargetTask from "../Container/ContainerForTargetTask";
import ContainerForCheckedTaskForIntergration from "../Container/ContainerForCheckedTaskForIntergration";

interface IProps {
  button_text: string;
  checkedRowPks: number[];
  setCheckedRowPks: React.Dispatch<React.SetStateAction<number[]>>;
}

const ModalButtonForTransformCheckedTasksToSupplementTask = ({
  button_text,
  checkedRowPks,
  setCheckedRowPks,
}: IProps) => {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const {
    isLoading,
    data: dataForTaskListForCheckedPks,
    refetch: refatchForTaskListForCheckedPks,
  } = useQuery<typeForTaskListForChecked>(
    ["getTaskListForCheckedPks", checkedRowPks],
    apiForGetTaskListForCheckedPks,
    {
      enabled: true,
    }
  );

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    if (dataForTaskListForCheckedPks?.ProjectProgressList.length === 0) {
      toast({
        status: "warning",
        title: "Please select at least one item",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      setIsOpen(true);
    }
  };

  // 인라인 스타일 객체 정의
  const dashedBorderStyle = {
    border: "1px dashed black", // 점선 테두리 설정
    height: "100%", // 영역 높이 100%로 설정
  };

  useEffect(() => {
    if (dataForTaskListForCheckedPks?.ProjectProgressList.length === 0) {
      setIsOpen(false);
    }
  }, [dataForTaskListForCheckedPks]);

  return (
    <Box>
      <Button
        size="xs"
        bg={"lightblue"}
        _hover={{ backgroundColor: "lightblue" }}
        variant="outline"
        onClick={onOpen}
      >
        {button_text}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent height={"100%"}>
          <ModalHeader>
            Modal ForTransform Checked Tasks To SupplementTask
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex border={"1px solid red"} height={"100%"}>
              <Box flex={1} style={dashedBorderStyle}>
                <ContainerForCheckedTaskForIntergration
                  checkedRowPks={checkedRowPks}
                  setCheckedRowPks={setCheckedRowPks}
                  setIsOpen={setIsOpen}
                />
              </Box>
              <Divider orientation="vertical" mx={2} />
              {/* 타겟 task를 검색한뒤 조회 할수 있게할 table 
              외부 컴퍼넌트화 한다면 이름은 TableForSearchResultForTargetTask */}
              <Box flex={1} style={dashedBorderStyle}>
                <ContainerForTargetTask />
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>{/* 여기에 모달 하단 옵션을 추가하세요 */}</ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalButtonForTransformCheckedTasksToSupplementTask;
