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

  // useQuery 훅을 컴포넌트 내부에서 호출하도록 변경
  const { isLoading, data } = useQuery<typeForTaskListForChecked>(
    ["getTaskListForCheckedPks", checkedRowPks],
    apiForGetTaskListForCheckedPks,
    {
      enabled: false, // 초기에 비활성화
    }
  );

  const fetchDataForTaskListForCheckedPks = () => {
    // 데이터를 처리하거나 상태를 업데이트할 수 있습니다.
    if (isLoading) {
      // 데이터가 로딩 중일 때 처리
    } else {
      // 데이터가 로딩이 완료된 후 처리
    }
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    // 모달이 열릴 때 fetchDataForTaskListForCheckedPks를 호출하여 API 요청을 보냅니다.
    fetchDataForTaskListForCheckedPks();

    setIsOpen(true);

    // 모달이 열릴 때 enabled를 true로 변경하여 API 요청을 활성화합니다.
    queryClient.setQueryData(
      ["getTaskListForCheckedPks", checkedRowPks],
      true
    );
  };

  // useEffect(() => {
  //   // 여기에 다른 초기화나 효과를 넣을 수 있습니다.
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
                <ContainerForTargetTask checkedRowPks={checkedRowPks} />
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
