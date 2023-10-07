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
  useToast,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ContainerForTaskIntergrationForSelectedOne from "../Container/ContainerForTaskIntergrationForSelectedOne";
import ContainerForSelectedTaskForTaskIntergration from "../Container/ContainerForSelectedTaskForTaskIntergration";
import { apiForTransformCheckedTasksToSupplementTaskForSelected } from "../../apis/project_progress_api";

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
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [checkedRows, setCheckedRows] = useState<number[]>([]); // 체크된 항목의 번호를 저장하는 상태

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const mutationForTransformCheckedTasksToSupplementTaskForSelected =
    useMutation(apiForTransformCheckedTasksToSupplementTaskForSelected, {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        queryClient.refetchQueries([
          "apiForGetTaskListForSelectedOneForTaskIntergration",
        ]);
        queryClient.refetchQueries(["getTaskListForCheckedPks"]);
        queryClient.refetchQueries(["getOneProjectTask"]);

        // todo
        // react에서 http://127.0.0.1:3000/project_admin/{selectedTargetPk} 로 페이지 이동

        // const targetUrl = `/project_admin/${selectedTaskPk}`;

        // 해당 URL로 페이지 이동
        // navigate(targetUrl);

        toast({
          title: "transform checked tasks success!",
          description: data.message,
          status: "success",
        });
      },
      onError: (error: any) => {
        console.log("error.message : ", error.message);

        toast({
          title: "Error!",
          description: error.response.data.message || "An error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });

  const convertTaskButtonHandler = () => {
    if (checkedRows.length === 0) {
      // 만약 checkedRows가 비어 있다면
      toast({
        title: "선택한 항목이 없습니다.", // Toast 제목
        description: "하나 이상의 항목을 선택하세요.", // Toast 내용
        status: "warning", // Toast 스타일 (warning은 주황색)
        duration: 5000, // Toast가 표시될 시간 (밀리초)
        isClosable: true, // 닫기 버튼 표시 여부
      });
      return; // 함수 종료
    }

    // 선택한 항목이 있는 경우에 대한 처리
    console.log("checkedRows: ", checkedRows);
    console.log("selectedTaskPk: ", selectedTaskPk);

    mutationForTransformCheckedTasksToSupplementTaskForSelected.mutate({
      checkedRowPks: checkedRows,
      selectedTargetPk: selectedTaskPk,
    });
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
                {/* 왼쪽 영역 컨테이너(task list (선택한 업무 이외) 를 위한 컨테이너 ) */}
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
                  onClick={convertTaskButtonHandler}
                >
                  Convert
                </Button>

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
