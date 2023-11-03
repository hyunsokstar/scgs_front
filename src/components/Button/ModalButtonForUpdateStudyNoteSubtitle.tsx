import React, { useState } from "react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { apiForUpdateStudyNoteSubtitle } from "../../apis/study_note_api";

interface IProps {
  modal_title: string;
  button_text: string;
  pk: number | string;
  title: string;
  ref_url1: string;
  ref_url2: string;
  content: string;
  youtube_url: string;
}

const ModalButtonForUpdateStudyNoteSubtitle = (props: IProps) => {
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const toast = useToast();

  const mutationForUpdateStudyNoteContent = useMutation(
    apiForUpdateStudyNoteSubtitle,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        queryClient.refetchQueries(["apiForGetStuyNoteContentList"]);

        toast({
          title: "subtitle update success !",
          status: "success",
        });
        onClose();
      },
      onError: (error: any) => {
        console.log("error.message : ", error.message);

        toast({
          title: "Error!",
          description: error.message || "An error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  const onSubmit = (data: any) => {
    // 폼 데이터 처리 로직 추가
    console.log(data);

    mutationForUpdateStudyNoteContent.mutate(data)

    onClose();
    reset();
  };

  return (
    <>
      <Button variant="outline" onClick={onOpen}>
        {props.button_text}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.modal_title}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl>
                <Input
                  type="hidden"
                  {...register("pk")}
                  defaultValue={props.pk}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter the title"
                  {...register("title", { required: true })}
                  defaultValue={props.title}
                  isInvalid={errors.title != null}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Reference URL 1</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter the reference URL 1"
                  {...register("ref_url1", { required: true })}
                  defaultValue={props.ref_url1}
                  isInvalid={errors.ref_url1 != null}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Reference URL 2</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter the reference URL 2"
                  {...register("ref_url2", { required: true })}
                  defaultValue={props.ref_url2}
                  isInvalid={errors.ref_url2 != null}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Content</FormLabel>
                <Textarea
                  placeholder="Enter the content"
                  {...register("content", { required: true })}
                  defaultValue={props.content}
                  isInvalid={errors.content != null}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>YouTube URL (optional)</FormLabel>
                <Textarea
                  placeholder="Enter the YouTube URL"
                  {...register("youtube_url", { required: false })}
                  defaultValue={props.youtube_url}
                  isInvalid={errors.youtube_url != null}
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

export default ModalButtonForUpdateStudyNoteSubtitle;
