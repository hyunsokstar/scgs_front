import { useState } from "react";
import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";

import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  useDisclosure,
  Textarea,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  apiForCreateErrorReportForNote,
  apiForGetErrorReportListForPageForStudyNote,
} from "../../apis/study_note_api";
import { ErrorReportForStudyNoteData } from "../../types/study_note_type";
import TableForErrorReportListForStudyNote from "../Table/TableForErrorReportListForStudyNote";

interface IProps {
  button_text: string;
  button_size: string;
  button_width?: string;
  modal_title: string;
  modal_size: string;
  study_note_pk: string | undefined;
  currentPage: number | undefined;
}

const ModalButtonForRegisterErrorReportForNote = ({
  modal_title,
  modal_size,
  button_text,
  button_size,
  button_width,
  study_note_pk,
  currentPage,
}: IProps) => {
  const toast = useToast();
  const queryClient = new QueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, reset } = useForm();

  const {
    isLoading: isLoadingForGetErrorReportListForStudyNote,
    data: dataForErrorReportList,
    refetch: refetchForGetErrorReportListForStudyNote,
  } = useQuery<any[]>(
    ["apiForGetErrorReportListForPageForStudyNote", study_note_pk, currentPage],
    apiForGetErrorReportListForPageForStudyNote,
    {
      enabled: true,
      // cacheTime: 0, // 캐싱 비활성화
    }
  );

  console.log("dataForErrorReportList : ", dataForErrorReportList);
  

  const mutationForCreateErrorReportForNote = useMutation(
    apiForCreateErrorReportForNote,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        reset();
        // refetchFor();
        refetchForGetErrorReportListForStudyNote();
        // queryClient.refetchQueries(["apiForGetErrorReportListForStudyNote"]);

        toast({
          title: "error report 추가",
          description: "error report 을 추가하였습니다.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        // onClose();
      },
      onError: (error: any) => {
        console.log("error.response : ", error.response);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  const onSubmit = (data: any) => {
    // 입력된 데이터 처리
    console.log(data);
    if(data.content ===""){
      alert("에러 내용을 입력해 주세요 !!")
      return;
    }
    
    mutationForCreateErrorReportForNote.mutate({
      study_note_pk: study_note_pk,
      page: currentPage,
      content: data.content,
    });
    // onClose();
  };

  return (
    <>
      <Button
        aria-label="Confirm"
        variant="outline"
        colorScheme="green"
        rounded="md"
        size={button_size}
        width={button_width}
        onClick={onOpen}
      >
        {button_text}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={modal_size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal_title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableForErrorReportListForStudyNote
              errorReportList={
                dataForErrorReportList &&
                dataForErrorReportList
              }
              refetchForGetErrorReportListForStudyNote={
                refetchForGetErrorReportListForStudyNote
              }
            />
            <br />

            <form onSubmit={handleSubmit(onSubmit)}>
              <Textarea
                {...register("content")} // content 입력 필드를 useForm의 register와 연결
                placeholder="Enter content"
                resize="none"
                mb={4}
              />
              {/* 추가적인 입력 필드가 필요한 경우 여기에 추가 */}
              <Box display={"flex"} justifyContent={"center"} gap={2}>
                <Button type="submit" colorScheme="blue" mr={3} flex={1}>
                  Submit
                </Button>
                <Button flex={1} onClick={onClose}>
                  Cancel
                </Button>
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForRegisterErrorReportForNote;
