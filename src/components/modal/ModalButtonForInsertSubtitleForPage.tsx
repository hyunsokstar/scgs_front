import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForCreateSubTitleForNote } from "../../apis/study_note_api";
import { describe } from "node:test";

interface IProps {
  button_text: string;
  currentPage: number | string | undefined;
  study_note_pk: number | string | undefined;
}

// 1122
const ModalButtonForInsertSubtitleForPage = ({
  button_text,
  currentPage,
  study_note_pk,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const toast = useToast();

  const mutationForCreateSubTitleForNote = useMutation(
    apiForCreateSubTitleForNote,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        if (data.message) {
          toast({
            status: "warning",
            title: "sutitle is aleready exists !",
            description: data.message,
            duration: 2000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Create Note Content !! ",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
        queryClient.refetchQueries(["apiForGetStuyNoteContentList"]);
        reset();
        onClose();
      },
      onError: (error: any) => {
        console.log("error.response : ", error.response);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  // fix 0616
  const onSubmit = (data: any) => {
    // 폼 데이터 처리 로직 추가
    // console.log(data);
    mutationForCreateSubTitleForNote.mutate(data);
  };

  return (
    <>
      <Button
        variant={"outline"}
        onClick={onOpen}
        border={"1px solid black"}
        _hover={{ bgColor: "yellow.100" }}
      >
        {button_text}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Insert Subtitle</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl>
                <Input
                  type="hidden"
                  {...register("study_note_pk")}
                  value={study_note_pk}
                />
              </FormControl>
              <FormControl display="none">
                <Input
                  type="hidden"
                  {...register("content_option")}
                  value={"subtitle_for_page"}
                />
              </FormControl>

              <FormControl>
                <Input
                  type="hidden"
                  {...register("current_page_number")}
                  value={currentPage}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter the title"
                  {...register("title", { required: true })}
                  isInvalid={errors.title != null}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Reference URL 1</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter the reference URL 1"
                  {...register("ref_url1", { required: true })}
                  isInvalid={errors.ref_url1 != null}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Reference URL 2</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter the reference URL 2"
                  {...register("ref_url2", { required: true })}
                  isInvalid={errors.ref_url2 != null}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Content</FormLabel>
                <Textarea
                  placeholder="Enter the content"
                  {...register("content", { required: true })}
                  isInvalid={errors.content != null}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForInsertSubtitleForPage;
