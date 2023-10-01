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
import { useQuery, QueryClient } from "@tanstack/react-query"; // QueryClient를 import 합니다.
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

  const queryClient = new QueryClient(); // QueryClient를 생성합니다.

  // task list 에서 체크한 목록들 가져 오기
  const { isLoading, data: dataForTaskListForCheckedPks } =
    useQuery<typeForTaskListForChecked>(
      ["getTaskListForCheckedPks", checkedRowPks],
      apiForGetTaskListForCheckedPks,
      {
        enabled: false, // 초기에 비활성화
      }
    );

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    if (checkedRowPks.length === 0) {
      // 배열의 길이가 0이면 toast 메시지를 출력하고 모달을 닫습니다.
      toast({
        title: "체크된 항목이 없습니다.",
        status: "warning",
        duration: 2000, // 메시지가 보여지는 시간 (2초)
        isClosable: true, // 닫기 버튼을 표시합니다.
      });
      return;
    }

    // 모달이 열릴 때 enabled를 true로 변경하여 API 요청을 활성화합니다.
    // queryClient.setQueryData(["getTaskListForCheckedPks", checkedRowPks], true);

    setIsOpen(true);
  };

  // useEffect(() => {
  // }, []);

  // 인라인 스타일 객체 정의
  const dashedBorderStyle = {
    border: "1px dashed black", // 점선 테두리 설정
    height: "100%", // 영역 높이 100%로 설정
  };

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
            Modal For Transform Checked Tasks To SupplementTask
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex border={"1px solid red"} height={"100%"}>
              {/* 1 영역 */}
              <Box flex={1} style={dashedBorderStyle}>
                <ContainerForCheckedTaskForIntergration
                  checkedRowPks={checkedRowPks}
                  dataForTaskListForCheckedPks={dataForTaskListForCheckedPks}
                  setCheckedRowPks={setCheckedRowPks}
                  setIsOpen={setIsOpen}
                />
              </Box>
              <Divider orientation="vertical" mx={2} />
              {/* 2영역 */}
              <Box flex={1} style={dashedBorderStyle}>
                <ContainerForTargetTask
                  checkedRowPks={checkedRowPks}
                  setCheckedRowPks={setCheckedRowPks}
                />
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
