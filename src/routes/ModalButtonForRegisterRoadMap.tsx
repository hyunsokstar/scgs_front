import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Divider,
  ModalHeader,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import TableForRoadMapContentListForRoadMapPk from "../components/Table/TableForRoadMapContentListForRoadMapPk";
import TableForCandidateStudyNoteListForRegisterRoadMap from "../components/Table/TableForCandidateStudyNoteListForRegisterRoadMap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForRegisterRoadMapFromCheckedNoteIds } from "../apis/study_note_api";

interface IProps {
  button_text: string;
  roadMapId: number;
}

// 1122
const ModalButtonForRegisterRoadMap = ({ button_text, roadMapId }: IProps) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const [pageNum, setPageNum] = useState(1);
  const [checkedIdsForNoteList, setCheckedIdsForNoteList] = useState<number[]>(
    []
  );

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const buttonHandlerForModalOpen = () => {
    onOpen();
  };

  const mutationForRegisterRoadMapFromCheckedNoteIds = useMutation(
    apiForRegisterRoadMapFromCheckedNoteIds,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data: any) => {
        console.log("data : ", data);
        queryClient.refetchQueries([
          "apiForGetRoadMapContentListForRoadMapIdForRegister",
        ]);
        queryClient.refetchQueries([
          "apiForgetCandidateStudyNoteListForRegisterRoadMap",
        ]);

        toast({
          title: "challenge register 성공",
          description: data.message,
          status: "success",
          duration: 1800,
          isClosable: true,
        });

        setCheckedIdsForNoteList([]);
      },
      onError: (error: any) => {
        console.log("error.response : ", error.response);
        console.log("mutation has an error", error.response.data);

        // 에러 메시지를 토스트로 표시
        toast({
          title: "에러 발생",
          description: error.response.data.message, // 에러 메시지를 사용
          status: "error",
          duration: 1800,
          isClosable: true,
        });
      },
    }
  );

  const registerRoadMapFromSelectedStudyNoteIds = (
    roadMapId: number,
    checkedIdsForNoteList: number[]
  ) => {
    mutationForRegisterRoadMapFromCheckedNoteIds.mutate({
      roadMapId,
      checkedIdsForNoteList,
    });
  };

  // 2244
  return (
    <>
      <Button
        variant="outline"
        colorScheme="blue"
        flex={1}
        onClick={buttonHandlerForModalOpen}
      >
        {button_text} ({roadMapId})
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody>
            <Flex>
              <Divider orientation="vertical" borderColor="gray.300" />
              <Box flex={1} border="1px dashed" borderColor="gray.300" m={1}>
                table for road map register <br />
                <TableForRoadMapContentListForRoadMapPk roadMapId={roadMapId} />
              </Box>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Button
                  leftIcon={<ChevronLeftIcon />}
                  fontSize={"lg"}
                  size={"sm"}
                  onClick={() =>
                    registerRoadMapFromSelectedStudyNoteIds(
                      roadMapId,
                      checkedIdsForNoteList
                    )
                  }
                ></Button>
              </Box>

              <Box flex={1} border="1px dashed" borderColor="gray.300" m={1}>
                <Box>right side for roadmap candidate</Box>
                <br />
                <Box>
                  <TableForCandidateStudyNoteListForRegisterRoadMap
                    checkedIdsForNoteList={checkedIdsForNoteList}
                    setCheckedIdsForNoteList={setCheckedIdsForNoteList}
                    roadMapId={roadMapId}
                  />
                </Box>
              </Box>
              <Divider orientation="vertical" borderColor="gray.300" />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForRegisterRoadMap;
